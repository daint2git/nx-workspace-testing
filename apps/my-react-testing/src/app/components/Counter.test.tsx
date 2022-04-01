import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  const setup = ({ defaultCount = 0 }: { defaultCount?: number } = {}) => {
    render(
      <Counter defaultCount={defaultCount} description="This is description" />
    );
  };

  describe('initialized with defaultCount=0 and description="This is description"', () => {
    beforeEach(() => {
      setup();
    });

    it('renders "Default count: 0"', () => {
      expect(screen.getByText(/Default count: 0/i)).toBeInTheDocument();
    });

    it('renders and "Count: 0"', () => {
      expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });

    it('renders "This is description"', () => {
      expect(screen.getByText(/this is description/i)).toBeInTheDocument();
    });

    describe('when - is clicked', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('button', { name: '-' }));
      });

      it('renders "Count: -1', () => {
        expect(screen.getByText('Count: -1')).toBeInTheDocument();
      });
    });

    describe('when + is clicked', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('button', { name: 'Increment' }));
      });

      it('renders "Count: 1"', () => {
        expect(screen.getByText('Count: 1')).toBeInTheDocument();
      });
    });

    describe('when + (async) is clicked', () => {
      beforeEach(async () => {
        userEvent.click(
          screen.getByRole('button', { name: 'Async Increment' })
        );
        await screen.findByText('Count: 1');
      });

      it('renders "Count: 1"', () => {
        expect(screen.getByText('Count: 1')).toBeInTheDocument();
      });
    });
  });

  describe('when the defaultCount=10', () => {
    beforeEach(() => {
      setup({ defaultCount: 10 });
    });

    it('renders and "Count: 10"', () => {
      expect(screen.getByText('Count: 10')).toBeInTheDocument();
    });

    describe('when - is clicked', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('button', { name: '-' }));
      });

      it('renders "Count: 9', () => {
        expect(screen.getByText('Count: 9')).toBeInTheDocument();
      });
    });

    describe('when incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(() => {
        userEvent.type(screen.getByLabelText(/Incrementor/), '{selectall}5');
      });

      describe('when "+" button is clicked', () => {
        beforeEach(() => {
          userEvent.click(screen.getByRole('button', { name: 'Increment' }));
        });

        it('renders "Count: 15"', () => {
          expect(screen.getByText('Count: 15')).toBeInTheDocument();
        });

        it('renders too big and will disappear after 200ms', async () => {
          await waitForElementToBeRemoved(() =>
            screen.queryByText('I am too small')
          );

          expect(screen.queryByText('I am too small')).not.toBeInTheDocument();
        });
      });

      describe('when + (async) is clicked', () => {
        beforeEach(async () => {
          userEvent.click(
            screen.getByRole('button', { name: 'Async Increment' })
          );
          await screen.findByText('Count: 15');
        });

        it('renders "Count: 15"', () => {
          expect(screen.getByText('Count: 15')).toBeInTheDocument();
        });
      });
    });
  });
});
