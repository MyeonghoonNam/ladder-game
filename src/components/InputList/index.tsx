import { type ChangeEvent } from 'react';

import * as Styled from './styled';

interface InputListProps {
  values: string[];
  placeholder?: string;
  onChange?: (idx: number, e: ChangeEvent<HTMLInputElement>) => void;
}

const InputList = ({ values, placeholder, onChange }: InputListProps) => {
  const handleChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(idx, e);
  };

  return (
    <Styled.Container>
      {values.map((_, idx) => (
        <input
          key={`id_${idx}`}
          type="text"
          placeholder={placeholder ? `${placeholder} ${idx + 1}` : ''}
          value={values[idx]}
          onChange={(e) => handleChange(idx, e)}
        />
      ))}
    </Styled.Container>
  );
};

export default InputList;
