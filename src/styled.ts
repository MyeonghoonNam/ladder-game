import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
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
  width: 90%;
  max-width: 800px;
  padding: 2rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.background.overlay};
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Header = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.brown40};
  ${({ theme }) => theme.typography.heading1}
`;

export const SubHeader = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral90};
  ${({ theme }) => theme.typography.bodyLarge}
`;

export const Controller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
