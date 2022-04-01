import Example1 from '@/components/Example1';
import styled from 'styled-components';
import Example2 from './components/Example2';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Example1
        onMoney={(val) => {
          console.log(val);
        }}
      />
      <Example2 />
    </StyledApp>
  );
}

export default App;
