import { type ReactNode, type ReactElement } from 'react';
import { type NonEmptyArray } from 'models';

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number];
  children: Array<React.ReactElement<StepProps<Steps>>> | ReactElement<StepProps<Steps>>;
}

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  onEnter?: () => void;
  children: ReactNode;
}
