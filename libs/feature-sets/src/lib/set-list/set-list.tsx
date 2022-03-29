import styled from 'styled-components';
import { useAllSetsQuery } from '@nx-workspace-testing/data-access';

/* eslint-disable-next-line */
export interface SetListProps {}

const StyledSetList = styled.div`
  ul {
    list-style: none;
    margin: 0;
    font-family: sans-serif;
    width: 100%;
  }

  li {
    padding: 8px;
  }

  li:nth-child(2n) {
    background-color: #eee;
  }

  span.year {
    display: block;
    width: 20%;
  }
`;

export function SetList(props: SetListProps) {
  const { data, loading, error } = useAllSetsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.allSets) return null;

  return (
    <StyledSetList>
      <ul>
        {data.allSets.map(({ id, name, numParts, year }) => (
          <li key={id}>
            {year} - <strong>{name}</strong> ({numParts} parts)
          </li>
        ))}
      </ul>
    </StyledSetList>
  );
}

export default SetList;
