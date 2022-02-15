import React, { ChangeEventHandler } from 'react';
import InputMask from 'react-input-mask';
import { Input } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

interface InputWithMaskProps {
  mask: string;
  maskChar?: string | null;
  value?: string;
  onChange?: ChangeEventHandler;
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<any, object>;
  placeholder?: string;
  defaultValue?: string;
}

const InputWithMask: React.FC<InputWithMaskProps> = props => {
  const { placeholder, mask, defaultValue } = props;
  return (
    <Controller
      {...(props as InputWithMaskProps)}
      defaultValue={defaultValue ?? ''}
      render={({ field: { onChange, value, name } }) => (
        <Input
          as={InputMask}
          mask={mask}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          maskChar={null}
        />
      )}
    />
  );
};

export default InputWithMask;
