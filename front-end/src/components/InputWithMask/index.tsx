import React, { ChangeEventHandler } from 'react';
import InputMask from 'react-input-mask';
import { Input, InputProps } from '@chakra-ui/react';

interface InputWithMaskProps {
  mask: string,
  maskChar?: string | null,
  value?: string,
  onChange?: ChangeEventHandler,
}

const InputWithMask: React.FC<InputWithMaskProps & InputProps> = (props) => {

  return (
    <InputMask {...props as InputWithMaskProps}>
      {(inputProps: InputProps) => <Input {...inputProps} type="text" disableUnderline />}
    </InputMask>
  )

}

export default InputWithMask;