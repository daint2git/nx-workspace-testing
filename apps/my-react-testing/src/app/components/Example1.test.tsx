import { DataGrid } from '@mui/x-data-grid';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import Example1, { rows } from './Example1';

jest.mock('@mui/x-data-grid', () => ({
  ...jest.requireActual('@mui/x-data-grid'),
  DataGrid: jest.fn(() => <div>Mocked DataGrid</div>),
}));

// use jest.mocked instead of https://github.com/facebook/jest/blob/main/CHANGELOG.md#2744
const mockedDataGrid = mocked(DataGrid);

describe('Example1', () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it('renders MUI DataGrid with columns and rows', () => {
    const onMoneyMockFn = jest.fn();

    render(<Example1 onMoney={onMoneyMockFn} />);

    userEvent.click(screen.getByRole('button', { name: 'Give me 33 dollars' }));

    expect(onMoneyMockFn).toBeCalledTimes(1);
    expect(onMoneyMockFn).toBeCalledWith(33);
  });

  it('renders DataGrid passing the expected props', () => {
    const onMoneyMockFn = jest.fn();

    const { container } = render(<Example1 onMoney={onMoneyMockFn} />);

    expect(mockedDataGrid).toBeCalledTimes(1);

    // console.log('mockedDataGrid.mock.calls', mockedDataGrid.mock.calls);
    // result:
    // mockedDataGrid.mock.calls [
    //   [
    //     {
    //       rows: [Array],
    //       columns: [Array],
    //       pageSize: 5,
    //       rowsPerPageOptions: [Array],
    //       checkboxSelection: true
    //     },
    //     {}
    //   ]
    // ]

    expect(mockedDataGrid).toBeCalledWith(
      {
        rows: rows,
        columns: [
          expect.objectContaining({ field: 'id' }),
          expect.objectContaining({ field: 'firstName' }),
          expect.objectContaining({ field: 'lastName' }),
          expect.objectContaining({ field: 'age' }),
          expect.objectContaining({ field: 'fullName' }),
        ],
        pageSize: 5,
        rowsPerPageOptions: [5],
        checkboxSelection: true,
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });
});
