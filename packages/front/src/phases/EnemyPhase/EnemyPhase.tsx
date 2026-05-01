import { Wrapper } from './EnemyPhase.styles';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useEnemy } from '../../hooks/useEnemy';
import { useVeranke } from '../../hooks/useVeranke';

export type EnemyPhaseProps = {
  readOnly?: boolean;
};

export const EnemyPhase = ({ readOnly = false }: EnemyPhaseProps) => {
  const { enemy, changeEnemy } = useEnemy();
  const { completed, complete, exposed, changeExposed } = useVeranke();

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.ENEMY}
        progress={{ percentage: enemy, label: 'Amenaza' }}
        controls={readOnly ? undefined : { onChange: changeEnemy }}
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
