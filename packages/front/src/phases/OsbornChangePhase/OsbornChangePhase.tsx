import { Wrapper } from './OsbornChangePhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { useAdvance } from '../../hooks/useAdvance';
import { useEffect, useState, useCallback } from 'react';

export type OsbornChangePhaseProps = {
  readOnly?: boolean;
};

export const OsbornChangePhase = ({ readOnly = false }: OsbornChangePhaseProps) => {
  const { advance } = useAdvance();
  const [disabled, setDisabled] = useState(!readOnly);

  const handleAdvance = useCallback(async () => {
    console.log('Avanzando a OsbornPhase...');
    const result = await advance();
    if (!result) {
      console.error('Error al avanzar de fase');
    }
  }, [advance]);

  useEffect(() => {
    if (readOnly) return;
    const timer = setTimeout(() => {
      setDisabled(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [readOnly]);

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.OSBORN}
        msg="Muestra la carta de Norman Osborn"
        disabled={disabled}
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Avanzar',
                size: SizeDict.L,
                onClick: handleAdvance,
                disabled,
              }
        }
      />
    </Wrapper>
  );
};
