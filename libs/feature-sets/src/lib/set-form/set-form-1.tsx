import {
  AllSetsDocument,
  AllSetsQuery,
  useAddSetMutation,
} from '@nx-workspace-testing/data-access';
import { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SetFormProps {}

const StyledSetForm = styled.div`
  form {
    font-family: sans-serif;
    border: solid 1px #eee;
    max-width: 240px;
    padding: 24px;
  }

  input {
    display: block;
    margin-bottom: 8px;
    border: 1px solid gray;
  }
`;

function SetForm(props: SetFormProps) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [numParts, setNumParts] = useState(1000);

  const [addSetMutation] = useAddSetMutation({
    variables: { name, year: +year, numParts },
    update(cache, { data }) {
      if (!data?.addSet) return;

      const existing = cache.readQuery<AllSetsQuery>({
        query: AllSetsDocument,
      });

      if (!existing) return;

      cache.writeQuery({
        query: AllSetsDocument,
        data: {
          allSets: existing.allSets?.concat(data.addSet),
        },
      });
    },
    onCompleted() {
      setName('');
      setYear('');
      setNumParts(1000);
    },
  });

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addSetMutation();
  };

  return (
    <StyledSetForm>
      <form aria-label="set-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:{' '}
          <input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="year">
          Year:{' '}
          <input
            id="year"
            name="year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="numParts">
          Number of Parts:{' '}
          <input
            id="numParts"
            name="numParts"
            value={numParts}
            onChange={(event) => setNumParts(+event.target.value)}
          />
        </label>
        <br />
        <button>Create new set</button>
      </form>
    </StyledSetForm>
  );
}

export default SetForm;
