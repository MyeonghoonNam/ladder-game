import { BiRightArrowAlt } from 'react-icons/bi';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.neutral10};
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading3};
  color: ${({ theme }) => theme.colors.brown40};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

export const List = styled.div<{ columnCount: number }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.medium};
  grid-template-columns: repeat(${({ columnCount }) => columnCount}, minmax(200px, 1fr));
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.small};
`;

export const StartPoint = styled.span`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.brown30};
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.neutral50};
  border-radius: ${({ theme }) => theme.radius.small};
  cursor: default;
`;

export const EndPoint = styled(StartPoint)`
  color: ${({ theme }) => theme.colors.brown50};
  cursor: default;
`;

export const RightArrow = styled(BiRightArrowAlt)`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.neutral60};
  cursor: default;
`;
