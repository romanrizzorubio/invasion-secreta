import { Wrapper } from './ShipFallPhase.styles';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useShip } from '../../hooks/useShip';
import { useVeranke } from '../../hooks/useVeranke';

export type ShipFallPhaseProps = {
  readOnly?: boolean;
};

export const ShipFallPhase = ({ readOnly }: ShipFallPhaseProps) => {
  const { ship, addShipCounter } = useShip();
  const { completed, complete, exposed, changeExposed } = useVeranke();
  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.SHIP_FALL}
        progress={{ percentage: ship, label: 'Tiempo' }}
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Quitar contador',
                size: SizeDict.M,
                onClick: addShipCounter,
              }
        }
      />
      {!readOnly && !completed && (
        <Panel
          type={PanelTypeDict.VERANKE}
          buttons={{
            label: 'Completar',
            size: SizeDict.M,
            onClick: complete,
          }}
        />
      )}
      {completed && (
        <Panel
          type={PanelTypeDict.EXPOSED}
          progress={{ percentage: exposed, label: 'Amenaza' }}
          controls={
            readOnly
              ? undefined
              : {
                  onChange: changeExposed,
                }
          }
        />
      )}
    </Wrapper>
  );
};
