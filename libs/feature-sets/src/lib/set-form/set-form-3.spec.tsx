import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  AddSetDocument,
  AddSetMutation,
} from '@nx-workspace-testing/data-access';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetForm from './set-form-3';

const getNameEl = () => screen.getByLabelText(/^name:$/i);

const getYearEl = () =>
  screen.getByRole('textbox', {
    name: /year:/i,
  });

const getNumPartsEl = () =>
  screen.getByRole('textbox', {
    name: /number of parts:/i,
  });

const getCreateButtonEl = () =>
  screen.getByRole('button', { name: 'Create new set' });

describe('SetForm3', () => {
  it('should render without error', () => {
    render(
      <MockedProvider addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    const form = screen.getByLabelText('set-form');

    expect(form).toBeInTheDocument();
  });

  it('should display required error when name is invalid', async () => {
    render(
      <MockedProvider addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    userEvent.click(getCreateButtonEl());

    expect(
      await screen.findByText(/The name is required.$/)
    ).toBeInTheDocument();
  });

  it('should display type error when year is invalid', async () => {
    render(
      <MockedProvider addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    userEvent.type(getNameEl(), 'abc');
    await waitFor(() => expect(getNameEl()).toHaveValue('abc'));

    userEvent.type(getYearEl(), 'abc');
    await waitFor(() => expect(getYearEl()).toHaveValue('abc'));

    userEvent.click(getCreateButtonEl());
    await waitFor(() => expect(getCreateButtonEl()).toBeDisabled());

    expect(screen.getByText('The year must be a number.')).toBeInTheDocument();
  });

  it('should display type error when numParts is invalid', async () => {
    render(
      <MockedProvider addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    userEvent.clear(getNumPartsEl());
    userEvent.type(getNumPartsEl(), 'abc');
    await waitFor(() => expect(getNumPartsEl()).toHaveValue('abc'));

    userEvent.click(getCreateButtonEl());
    await waitFor(() => expect(getCreateButtonEl()).toBeDisabled());

    expect(
      screen.getByText('The numParts must be a number.')
    ).toBeInTheDocument();
  });

  it('should reset form after user submit', async () => {
    const formData = {
      name: 'name 1',
      year: 2022,
      numParts: 123,
    };
    const addSetData = {
      id: 1,
      name: 'name 1',
      year: 2022,
      numParts: 123,
    };
    const addSetMutationMockFn = jest.fn(() => ({
      data: {
        addSet: addSetData,
      },
    }));
    const mocks: MockedResponse<AddSetMutation>[] = [
      {
        request: {
          query: AddSetDocument,
          variables: formData,
        },
        result: addSetMutationMockFn,
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SetForm />
      </MockedProvider>
    );

    userEvent.type(getNameEl(), formData.name);
    userEvent.type(getYearEl(), `${formData.year}`);
    userEvent.clear(getNumPartsEl());
    userEvent.type(getNumPartsEl(), `${formData.numParts}`);
    userEvent.click(getCreateButtonEl());

    await waitFor(() => expect(addSetMutationMockFn).toBeCalledTimes(1));

    expect(getNameEl()).toHaveValue('');
    expect(getYearEl()).toHaveValue('');
    expect(getNumPartsEl()).toHaveValue('1000');
  });
});
