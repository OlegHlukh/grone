import styled from 'styled-components';
import { Score } from '../score.tsx';
import { Speed } from '../speed.tsx';

export const Info = () => {
  return (
    <InfoWrapper>
      <Score />
      <Speed />
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
