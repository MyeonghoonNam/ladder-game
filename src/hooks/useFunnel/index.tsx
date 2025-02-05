import { useState, useMemo } from 'react';
import { Funnel } from 'components';
import { type FunnelProps, type NonEmptyArray } from 'models';

export default function useFunnel<Steps extends NonEmptyArray<string>>(
  steps: Steps,
  option?: {
    initialStep: Steps[number];
  }
) {
  const [step, setStep] = useState<Steps[number]>(option?.initialStep ?? steps[0]);

  const FunnelComponent = useMemo(() => {
    const Component = (props: Omit<FunnelProps<Steps>, 'steps' | 'step'>) => {
      return <Funnel<Steps> step={step} steps={steps} {...props} />;
    };

    Component.displayName = 'FunnelComponent';
    Component.Step = Funnel.Step;

    return Component;
  }, [step, steps]);

  return [FunnelComponent, setStep] as const;
}
