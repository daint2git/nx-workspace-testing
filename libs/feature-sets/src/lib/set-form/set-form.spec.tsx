import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import SetForm from './set-form';
import {
  AddSetMutation,
  AddSetDocument,
} from '@nx-workspace-testing/data-access';

describe('SetForm', () => {
  it('should render without error', () => {
    render(
      <MockedProvider addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    const form = screen.getByLabelText('set-form');

    expect(form).toBeInTheDocument();
  });

  it('should render text after user type', () => {
    render(
      <MockedProvider addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText(/Name/i), 'name 1');
    userEvent.type(screen.getByLabelText(/Year/i), '2022');
    userEvent.clear(screen.getByLabelText(/Number of Parts/i));
    userEvent.type(screen.getByLabelText(/Number of Parts/i), '123');
    // userEvent.click(screen.getByRole('button', { name: 'Create new set' }));

    expect(screen.getByLabelText(/Name/i)).toHaveValue('name 1');
    expect(screen.getByLabelText(/Year/i)).toHaveValue('2022');
    expect(screen.getByLabelText(/Number of Parts/i)).toHaveValue('123');
  });

  it('should reset form after user submit', async () => {
    const addSetMutationMockFn = jest.fn(() => ({
      data: {
        addSet: {
          id: 1,
          name: 'name 1',
          year: 2022,
          numParts: 123,
        },
      },
    }));
    const mocks: MockedResponse<AddSetMutation>[] = [
      {
        request: {
          query: AddSetDocument,
          variables: {
            name: 'name 1',
            year: 2022,
            numParts: 123,
          },
        },
        result: addSetMutationMockFn,
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText(/Name/i), 'name 1');
    userEvent.type(screen.getByLabelText(/Year/i), '2022');
    userEvent.clear(screen.getByLabelText(/Number of Parts/i));
    userEvent.type(screen.getByLabelText(/Number of Parts/i), '123');
    userEvent.click(screen.getByRole('button', { name: 'Create new set' }));
    // userEvent.click(screen.getByText('Create new set'));

    await waitFor(() => expect(addSetMutationMockFn).toHaveBeenCalledTimes(1));

    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Year/i)).toHaveValue('');
    expect(screen.getByLabelText(/Number of Parts/i)).toHaveValue('1000');
  });
});
