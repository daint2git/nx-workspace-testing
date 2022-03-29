import styled from 'styled-components';
import { SetForm, SetList } from '@nx-workspace-testing/feature-sets';

const StyledPage = styled.div`
  h1 {
    font-family: sans-serif;
    text-align: center;
  }

  .flex {
    display: flex;
  }
`;

export function Index() {
  return (
    <StyledPage>
      <h1>My Lego Sets</h1>
      <div className="flex">
        <SetForm />
        <SetList />
      </div>
    </StyledPage>
  );
}

export default Index;
