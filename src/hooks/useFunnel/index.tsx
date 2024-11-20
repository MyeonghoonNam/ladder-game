import { useState, useMemo } from 'react';
import { Funnel, Step, type FunnelProps, type StepProps } from 'components';
import { type NonEmptyArray } from 'models';

export default function useFunnel<Steps extends NonEmptyArray<string>>(
  steps: Steps,
  option?: {
    initialStep: Steps[number];
  }
) {
  const [step, setStep] = useState<Steps[number]>(option?.initialStep ?? steps[0]);

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        (props: Omit<FunnelProps<Steps>, 'steps' | 'step'>) => {
          return <Funnel<Steps> step={step} steps={steps} {...props} />;
        },
        {
          Step: (props: StepProps<Steps>) => {
            return <Step {...props} />;
          },
        }
      ),
    [step, steps]
  );

  return [FunnelComponent, setStep] as const;
}
