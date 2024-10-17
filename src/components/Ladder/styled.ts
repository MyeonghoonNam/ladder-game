import styled from '@emotion/styled';

export const Container = styled.div<{ playerCount: number }>`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: ${(props) => `repeat(${props.playerCount}, 1fr)`};
  column-gap: 10px;

  .ladder {
    border: solid 1px blue;
    grid-row: 2 / 4;
    grid-column: 1 / ${(props) => props.playerCount + 1};
  }

  .controller {
    grid-row: 5 / 6;
    grid-column: 1 / ${(props) => props.playerCount + 1};
    display: flex;
    justify-content: center;
    padding: 10px;
    gap: 10px;
  }
`;
