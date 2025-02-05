import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral90};
  ${({ theme }) => theme.typography.bodyLarge}
`;

export const Ladder = styled.div<{ playerCount: number }>`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: ${({ playerCount }) => `repeat(${playerCount}, 1fr)`};
  column-gap: ${({ theme }) => theme.spacing.medium};
`;

export const LadderCanvas = styled.canvas<{ playerCount: number }>`
  grid-row: 2 / 7;
  grid-column: 1 / ${({ playerCount }) => playerCount + 1};
  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    // ... 모바일 스타일
  }
`;

export const Input = styled.input<{ readOnly: boolean }>`
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  border: ${({ theme }) => `2px solid ${theme.colors.neutral60}`};
  border-radius: ${({ theme }) => theme.radius.small};
  transition: all ${({ theme }) => theme.animation.duration.fast} ${({ theme }) => theme.animation.easing.easeInOut};

  cursor: ${({ readOnly }) => (readOnly ? 'pointer' : 'text')};

  &:focus {
    border: ${({ theme }) => `2px solid ${theme.colors.brown50}`};
    outline: none;
  }

  ${({ readOnly, theme }) =>
    readOnly && {
      '&:focus': {
        outline: 'none',
        boxShadow: theme.shadows.small,
      },
    }}
`;

export const Controller = styled.div<{ playerCount: number }>`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  gap: ${({ theme }) => theme.spacing.small};
`;
