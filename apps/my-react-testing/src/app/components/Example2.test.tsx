import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Example2 from './Example2';

jest.mock('@mui/material/SwipeableDrawer', () =>
  jest.fn(({ open }: { open: boolean }) => {
    return open ? <div>Mocked SwipeableDrawer</div> : null;
  })
);

describe('Example2', () => {
  it('shows not "Mocked SwipeableDrawer"', () => {
    render(<Example2 />);

    expect(
      screen.queryByText('Mocked SwipeableDrawer')
    ).not.toBeInTheDocument();
  });

  it('clicks "Open Drawer" button shows "Mocked SwipeableDrawer"', async () => {
    render(<Example2 />);

    userEvent.click(screen.getByRole('button', { name: /open drawer/i }));

    expect(screen.getByText('Mocked SwipeableDrawer')).toBeInTheDocument();

    userEvent.keyboard('{escape}');

    // test with actual component

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByText('Mocked SwipeableDrawer')
    // );

    // expect(
    //   screen.queryByText('Mocked SwipeableDrawer')
    // ).not.toBeInTheDocument();
  });
});
