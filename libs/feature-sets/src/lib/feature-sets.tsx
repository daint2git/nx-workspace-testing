import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FeatureSetsProps {}

const StyledFeatureSets = styled.div`
  color: pink;
`;

export function FeatureSets(props: FeatureSetsProps) {
  return (
    <StyledFeatureSets>
      <h1>Welcome to FeatureSets!</h1>
    </StyledFeatureSets>
  );
}

export default FeatureSets;
