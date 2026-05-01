import { Wrapper } from './SuperPhase.styles';
import { PanelTypeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useSuper } from '../../hooks/useSuper';

export type SuperPhaseProps = {
  readOnly?: boolean;
};

export const SuperPhase = ({ readOnly = false }: SuperPhaseProps) => {
  const {
    spiderWomanTotal,
    spiderWomanOwn,
    superLife,
    superPlan,
    changeSpiderWoman,
    changeSuperLife,
    changeSuperPlan,
  } = useSuper();

  const spiderWomanTotalProgress = {
    percentage: spiderWomanTotal,
    label: 'Total',
    invert: true,
  };
  const spiderWomanOwnProgress = spiderWomanOwn
    ? { percentage: spiderWomanOwn, label: 'Propia', invert: true }
    : undefined;

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.SUPER}
        progress={{ percentage: superLife, label: 'Vida' }}
        controls={readOnly ? undefined : { onChange: changeSuperLife }}
      />
      <Panel
        type={PanelTypeDict.SUPER_PLAN}
        progress={{ percentage: superPlan, label: 'Amenaza' }}
        controls={readOnly ? undefined : { onChange: changeSuperPlan }}
      />
      <Panel
        type={PanelTypeDict.SPIDER_WOMAN_LEAVES}
        progress={
          spiderWomanOwnProgress
            ? [spiderWomanTotalProgress, spiderWomanOwnProgress]
            : spiderWomanTotalProgress
        }
        controls={readOnly ? undefined : { maxValue: 5, onChange: changeSpiderWoman }}
      />
    </Wrapper>
  );
};
