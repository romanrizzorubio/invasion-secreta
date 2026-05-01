import { InputHTMLAttributes, useCallback, useId, FocusEvent, useState, useEffect } from 'react';
import { Size, SizeDict } from '../../types/Dicts';
import { StyledInput, Wrapper } from './Input.styles';
import { Label } from '../Label/Label';

type InputBase = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> & {
  label?: string;
  size?: Size;
};

type InputDate = InputBase & {
  type: 'time';
  onChange?: (value: Date) => void;
};

type InputText = InputBase & {
  type: 'text';
  onChange?: (value: string) => void;
};

type InputNumber = InputBase & {
  type: 'number';
  onChange?: (value: number | undefined) => void;
};

export type InputProps = InputDate | InputText | InputNumber;

export const Input = ({
  id,
  label,
  size = SizeDict.S,
  onChange,
  value,
  type,
  ...props
}: InputProps) => {
  const randomId = useId();
  const currentId = id || randomId;
  const [valueState, setValue] = useState<string>((value as string) || '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      let newValue: string | Date = e.target.value.toString();

      if (type === 'time') {
        const time = new Date();
        const [hours, minutes] = newValue.split(':');
        time.setHours(parseInt(hours));
        time.setMinutes(parseInt(minutes));
        newValue = time;
        onChange && onChange(newValue);
      } else if (type === 'number') {
        const newValue = parseInt(e.target.value);
        if (isNaN(newValue)) {
          onChange && onChange(undefined);
        } else {
          onChange && onChange(newValue);
        }
      } else {
        onChange && onChange(newValue);
      }
    },
    [onChange, type],
  );

  useEffect(() => {
    setValue((value as string) || '');
  }, [value]);

  return (
    <Wrapper>
      {label && <Label htmlFor={currentId} size={size} label={label} />}
      <StyledInput
        {...props}
        id={currentId}
        type={type}
        value={valueState}
        onChange={handleChange}
        onBlur={handleBlur}
        $size={size}
      />
    </Wrapper>
  );
};
