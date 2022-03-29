import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSet?: Maybe<Set>;
};


export type MutationAddSetArgs = {
  name?: InputMaybe<Scalars['String']>;
  numParts?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  allSets?: Maybe<Array<Set>>;
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['Int'];
  name: Scalars['String'];
  numParts: Scalars['Int'];
  year: Scalars['Int'];
};

export type AllSetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSetsQuery = { __typename?: 'Query', allSets?: Array<{ __typename?: 'Set', id: number, name: string, year: number, numParts: number }> | null };

export type AddSetMutationVariables = Exact<{
  name: Scalars['String'];
  year: Scalars['Int'];
  numParts: Scalars['Int'];
}>;


export type AddSetMutation = { __typename?: 'Mutation', addSet?: { __typename?: 'Set', id: number, name: string, year: number, numParts: number } | null };


export const AllSetsDocument = gql`
    query allSets {
  allSets {
    id
    name
    year
    numParts
  }
}
    `;

/**
 * __useAllSetsQuery__
 *
 * To run a query within a React component, call `useAllSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSetsQuery(baseOptions?: Apollo.QueryHookOptions<AllSetsQuery, AllSetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSetsQuery, AllSetsQueryVariables>(AllSetsDocument, options);
      }
export function useAllSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSetsQuery, AllSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSetsQuery, AllSetsQueryVariables>(AllSetsDocument, options);
        }
export type AllSetsQueryHookResult = ReturnType<typeof useAllSetsQuery>;
export type AllSetsLazyQueryHookResult = ReturnType<typeof useAllSetsLazyQuery>;
export type AllSetsQueryResult = Apollo.QueryResult<AllSetsQuery, AllSetsQueryVariables>;
export const AddSetDocument = gql`
    mutation addSet($name: String!, $year: Int!, $numParts: Int!) {
  addSet(name: $name, year: $year, numParts: $numParts) {
    id
    name
    year
    numParts
  }
}
    `;
export type AddSetMutationFn = Apollo.MutationFunction<AddSetMutation, AddSetMutationVariables>;

/**
 * __useAddSetMutation__
 *
 * To run a mutation, you first call `useAddSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetMutation, { data, loading, error }] = useAddSetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      year: // value for 'year'
 *      numParts: // value for 'numParts'
 *   },
 * });
 */
export function useAddSetMutation(baseOptions?: Apollo.MutationHookOptions<AddSetMutation, AddSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSetMutation, AddSetMutationVariables>(AddSetDocument, options);
      }
export type AddSetMutationHookResult = ReturnType<typeof useAddSetMutation>;
export type AddSetMutationResult = Apollo.MutationResult<AddSetMutation>;
export type AddSetMutationOptions = Apollo.BaseMutationOptions<AddSetMutation, AddSetMutationVariables>;