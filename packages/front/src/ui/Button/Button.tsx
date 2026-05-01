import { StyledButton } from './Button.styles';
import { ButtonHTMLAttributes, useCallback, useMemo } from 'react';
import { Size, SizeDict } from '../../types/Dicts';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  onChange?: (value: number) => void;
  onClick?: () => void;
  value?: number;
  label?: string;
  size?: Size;
};

export const Button = ({
  value,
  label,
  size = SizeDict.S,
  disabled = false,
  onChange,
  onClick,
}: ButtonProps) => {
  const handleClick = useCallback(() => {
    onChange && value && onChange(value);
    onClick && onClick();
  }, [value, onChange, onClick]);

  const text = useMemo(() => {
    if (label) {
      return label;
    }

    if (value) {
      if (value > 0) {
        return `+${value}`;
      }

      return value.toString();
    }

    return '';
  }, [label, value]);

  return (
    <StyledButton type="button" disabled={disabled} onClick={handleClick} $size={size}>
      {text}
    </StyledButton>
  );
};
