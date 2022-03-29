import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  AllSetsDocument,
  AllSetsQuery,
} from '@nx-workspace-testing/data-access';
import { render, screen } from '@testing-library/react';
import SetList from './set-list';

describe('SetList', () => {
  it('should render without error', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SetList />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render sets', async () => {
    const mocks: MockedResponse<AllSetsQuery>[] = [
      {
        request: {
          query: AllSetsDocument,
        },
        result: {
          data: {
            allSets: [
              {
                id: 1,
                name: 'Voltron',
                numParts: 2300,
                year: 2019,
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SetList />
      </MockedProvider>
    );

    await screen.findByText('Voltron');

    expect(screen.getByText('Voltron')).toBeInTheDocument();
  });

  it('should render error', async () => {
    const mocks: MockedResponse<AllSetsQuery>[] = [
      {
        request: {
          query: AllSetsDocument,
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SetList />
      </MockedProvider>
    );

    await screen.findByText('Error: An error occurred');

    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });
});
