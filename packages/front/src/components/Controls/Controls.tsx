import { Panel, Wrapper } from './Controls.styles';
import { Button } from '../../ui/Button/Button';
import { HTMLAttributes } from 'react';

export type ControlsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  maxValue?: number;
  onChange: (value: number) => void;
};

export const Controls = ({ maxValue = 10, onChange }: ControlsProps) => {
  return (
    <Wrapper>
      <Panel>
        {maxValue >= 10 && <Button onChange={onChange} value={-10} />}
        {maxValue >= 5 && <Button onChange={onChange} value={-5} />}
        {maxValue >= 3 && <Button onChange={onChange} value={-3} />}
        {maxValue >= 1 && <Button onChange={onChange} value={-1} />}
      </Panel>
      <Panel>
        {maxValue >= 1 && <Button onChange={onChange} value={1} />}
        {maxValue >= 3 && <Button onChange={onChange} value={3} />}
        {maxValue >= 5 && <Button onChange={onChange} value={5} />}
        {maxValue >= 10 && <Button onChange={onChange} value={10} />}
      </Panel>
    </Wrapper>
  );
};
