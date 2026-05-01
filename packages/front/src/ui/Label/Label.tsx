import { LabelHTMLAttributes } from 'react';
import { Size, SizeDict } from '../../types/Dicts';
import { StyledLabel } from './Label.styles';

export type InputProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: string;
  size?: Size;
};

export const Label = ({ label, size = SizeDict.S, ...props }: InputProps) => {
  return (
    <StyledLabel $size={size} {...props}>
      {label}
    </StyledLabel>
  );
};
