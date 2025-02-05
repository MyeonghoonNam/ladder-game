import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral90};
  ${({ theme }) => theme.typography.bodyLarge}
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.neutral60};
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: default;
  user-select: none;

  ${({ theme }) => theme.typography.heading1}
`;
