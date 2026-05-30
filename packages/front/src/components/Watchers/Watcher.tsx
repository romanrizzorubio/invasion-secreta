import { PanelType } from '../../types/Dicts';
import { Panel } from '../Panel/Panel';
import { Wrapper, Heading } from './Watcher.styles';
import { useMemo } from 'react';
import { getTableText } from '../../utils/utils';

export type WatcherProps = {
  type: PanelType;
  onPrevious: () => void;
  onNext: () => void;
  table?: number;
  disabled?: boolean;
  readOnly?: boolean;
};

export const Watcher = ({
  type,
  onPrevious,
  onNext,
  table,
  disabled = false,
  readOnly = false,
}: WatcherProps) => {
  const tableText = useMemo(
    () => (readOnly && table !== undefined ? getTableText(table) : undefined),
    [table, readOnly],
  );

  return (
    <Wrapper>
      <Panel
        type={type}
        disabled={disabled}
        hasBackground={readOnly}
        buttons={
          readOnly
            ? undefined
            : [
                {
                  label: 'Anterior',
                  onClick: onPrevious,
                },
                {
                  label: 'Siguiente',
                  onClick: onNext,
                },
              ]
        }
      />
      {tableText && <Heading>{tableText}</Heading>}
    </Wrapper>
  );
};
