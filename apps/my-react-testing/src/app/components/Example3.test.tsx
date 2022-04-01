import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Example2 from './Example2';
import Example3 from './Example3';

jest.mock('./Example2');
mocked(Example2).mockImplementation(() => <div>Mocked Example2</div>);

describe('Example3', () => {
  it('shows "Mocked Example2"', () => {
    render(<Example3 />);

    expect(
      screen.queryByText('Hello Drawer Component!')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Mocked Example2')).toBeInTheDocument();
  });
});
