import { InputHTMLAttributes, useCallback, useId, useState, useEffect, ChangeEvent } from 'react';
import { Size, SizeDict } from '../../types/Dicts';
import { StyledInput, Wrapper } from './Checkbox.styles';
import { Label } from '../Label/Label';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  size?: Size;
  onChange?: (value: boolean) => void;
};

export const Checkbox = ({
  id,
  label,
  size = SizeDict.S,
  onChange,
  checked = false,
  ...props
}: CheckboxProps) => {
  const randomId = useId();
  const currentId = id || randomId;
  const [checkedState, setChecked] = useState<boolean>(checked);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      console.log('checkbox', e.target.checked);
      onChange && onChange(e.target.checked);
    },
    [setChecked, onChange],
  );

  useEffect(() => {
    setChecked(checked);
  }, [checked, setChecked]);

  return (
    <Wrapper>
      <StyledInput
        {...props}
        id={currentId}
        type="checkbox"
        checked={checkedState}
        onChange={handleChange}
        $size={size}
      />
      {label && <Label htmlFor={currentId} size={size} label={label} />}
    </Wrapper>
  );
};
