import styled from '@emotion/styled';

export const Container = styled.div<{ playerCount: number }>`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: ${(props) => `repeat(${props.playerCount}, 1fr)`};
  column-gap: 10px;
`;

export const Ladder = styled.canvas<{ playerCount: number }>`
  grid-row: 2 / 7;
  grid-column: 1 / ${(props) => props.playerCount + 1};
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  margin: 0;
  padding: 0;
`;

export const Controller = styled.div<{ playerCount: number }>`
  grid-row: 8 / 9;
  grid-column: 1 / ${(props) => props.playerCount + 1};
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 10px;
`;
