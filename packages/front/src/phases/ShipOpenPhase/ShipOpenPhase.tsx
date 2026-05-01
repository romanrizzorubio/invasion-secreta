import { Wrapper } from './ShipOpenPhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { useCallback } from 'react';
import { useAdvance } from '../../hooks/useAdvance';

export type ShipOpenPhaseProps = {
  readOnly?: boolean;
};

export const ShipOpenPhase = ({ readOnly }: ShipOpenPhaseProps) => {
  const { advance } = useAdvance();

  const handleAdvance = useCallback(() => advance(), [advance]);

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.SHIP_OPEN}
        msg="¡La extraña nave se ha abierto! Veis cómo de ella salen todos vuestros amigos y compañeros que creíais caídos en combate. Los caídos eran Skrulls que habían suplantado a los auténticos que vuelven ahora a vuestro lado."
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
