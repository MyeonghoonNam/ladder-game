import { Children, isValidElement } from 'react';
import { type NonEmptyArray, type FunnelProps, type StepProps } from 'models';

export default function Funnel<Steps extends NonEmptyArray<string>>({ step, steps, children }: FunnelProps<Steps>) {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((item) => steps.includes((item.props as Partial<StepProps<Steps>>).name ?? '')) as Array<
    React.ReactElement<StepProps<Steps>>
  >;

  const targetStep = validChildren.find((child) => child.props.name === step);

  return <>{targetStep}</>;
}

Funnel.Step = function Step<Steps extends NonEmptyArray<string>>({ children }: StepProps<Steps>) {
  return <>{children}</>;
};
