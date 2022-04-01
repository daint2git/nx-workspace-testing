import { DefaultRequestBody, rest } from 'msw';
import { setupServer } from 'msw/node';
import { Photo } from '@/models/Photo';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import PhotoList from './PhotoList';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get<DefaultRequestBody, any, Photo[]>('/api/photos', (req, res, ctx) => {
    const name = req.url.searchParams.get('name') || 'Unknown';

    return res(
      ctx.json([
        {
          id: 1,
          thumbnailUrl: '/photo1.png',
          title: name + ': Hello World',
          favourite: false,
        },
      ])
    );
  }),
  rest.post<Photo, any, Photo>('/api/favourite', (req, res, ctx) => {
    const photo = req.body;

    return res(
      ctx.delay(200),
      ctx.json({
        ...photo,
        favourite: !photo.favourite,
      })
    );
  })
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

describe('PhotoList', () => {
  function setup() {
    render(<PhotoList />);
  }

  beforeEach(async () => {
    setup();
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  });

  describe('after application full loads', () => {
    it('renders the photos', () => {
      expect(screen.getByText('Unknown: Hello World')).toBeInTheDocument();
    });
  });

  describe('when changing in "name" textbox', () => {
    const name = 'XxxXxxxxxxxxxxxxxxx';

    beforeEach(async () => {
      userEvent.type(screen.getByLabelText('Your Name:'), name);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('renders the newly loaded data', () => {
      expect(
        screen.queryByText('Unknown: Hello World')
      ).not.toBeInTheDocument();
      expect(screen.getByText(name + ': Hello World')).toBeInTheDocument();
    });
  });

  describe('when clicking in "Refresh" Button and server returns error', () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody, any, { message: string }>(
          '/api/photos',
          (req, res, ctx) => {
            return res(
              ctx.status(500),
              ctx.json({ message: 'Sorry Something happened!' })
            );
          }
        )
      );
      userEvent.click(screen.getByRole('button', { name: 'Refresh' }));
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('renders the error keeping the old data', () => {
      expect(screen.getByText('Sorry Something happened!')).toBeInTheDocument();
    });
  });

  describe('when clicking in "Add to Favourites" changes the button text', () => {
    beforeEach(async () => {
      userEvent.click(
        screen.getByRole('button', { name: 'Add To Favourites' })
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Add To Favourites')
      );
    });

    it('renders "Remove from Favourites"', () => {
      expect(
        screen.getByRole('button', { name: 'Remove from Favourites' })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Add to Favourites' })
      ).not.toBeInTheDocument();
    });
  });
});
