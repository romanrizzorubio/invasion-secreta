import { Wrapper } from './SuperChangePhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { useMemo } from 'react';
import { useAdvance } from '../../hooks/useAdvance';

export type SuperChangePhaseProps = {
  hasWin?: boolean;
  readOnly?: boolean;
};

export const SuperChangePhase = ({ hasWin = false, readOnly = false }: SuperChangePhaseProps) => {
  const { advance } = useAdvance();

  const msg = useMemo(() => {
    return hasWin
      ? 'El Súper Skrull ha logrado sus planes, os ha debilitado lo suficiente como para que su líder haga su aparición triunfal.'
      : 'El Súper Skrull ha perdido la batalla, pero parece que sólo era un peón en esta guerra.';
  }, [hasWin]);

  return (
    <Wrapper>
      <Panel
        type={hasWin ? PanelTypeDict.SUPER_WINER : PanelTypeDict.SUPER_DEFEATED}
        msg={msg}
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Avanzar',
                size: SizeDict.L,
                onClick: advance,
              }
        }
      />
    </Wrapper>
  );
};
