import React from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
const Reward = () => {
  return (
    <Container>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h1>Congratulations!</h1>
      <p>You have claimed your reward.</p>
    </Container>
  );
};

export default Reward;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin: 2rem 0;
  }
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

