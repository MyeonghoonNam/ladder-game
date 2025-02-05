import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.background.primary} 0%,
    ${theme.colors.background.secondary} 100%
  )`};
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 2rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.background.overlay};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Header = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.brown40};
  ${({ theme }) => theme.typography.heading1}
`;

export const Controller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
