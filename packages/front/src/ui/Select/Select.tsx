import {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  useCallback,
  useId,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import { Size, SizeDict } from '../../types/Dicts';
import { StyledSelect, Wrapper } from './Select.styles';
import { Label } from '../Label/Label';

export type SelectOptionProps = OptionHTMLAttributes<HTMLOptionElement>;

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  label?: string;
  options: SelectOptionProps[];
  size?: Size;
  onChange?: (value: string) => void;
};

export const Select = ({
  id,
  label,
  options = [],
  size = SizeDict.S,
  onChange,
  value,
  ...props
}: SelectProps) => {
  const randomId = useId();
  const currentId = id || randomId;
  const [valueState, setValue] = useState<string>(value as string);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      onChange && onChange(e.target.value);
    },
    [setValue, onChange],
  );

  useEffect(() => {
    setValue(value as string);
  }, [value, setValue]);

  return (
    <Wrapper>
      {label && <Label htmlFor={currentId} size={size} label={label} />}
      <StyledSelect
        {...props}
        id={currentId}
        onChange={handleChange}
        $size={size}
        value={valueState}
      >
        <option value="" />
        {options.map((option, index) => (
          <option key={`${currentId}-${index}`} {...option} />
        ))}
      </StyledSelect>
    </Wrapper>
  );
};
