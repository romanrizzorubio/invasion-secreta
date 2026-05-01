import { Wrapper } from './SpiderWomanPhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { useCallback } from 'react';
import { useAdvance } from '../../hooks/useAdvance';

export type SpiderWomanPhaseProps = {
  readOnly?: boolean;
};

export const SpiderWomanPhase = ({ readOnly }: SpiderWomanPhaseProps) => {
  const { advance } = useAdvance();

  const handleAdvance = useCallback(() => advance(), [advance]);

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.VERANKE}
        msg="¡Nadie es quien parece! ¡Estamos rodeados de Skrulls infiltrados! Spiderwoman no sólo no es nuestra amiga sino que es la líder de esta infiltración: Veranke, La Reina Skrull."
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Avanzar',
                size: SizeDict.L,
                onClick: handleAdvance,
              }
        }
      />
    </Wrapper>
  );
};
