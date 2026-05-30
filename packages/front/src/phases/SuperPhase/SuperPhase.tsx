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
    spiderWomanTotalValue,
    spiderWomanOwn,
    spiderWomanOwnValue,
    superLife,
    superLifeValue,
    superPlan,
    superPlanValue,
    changeSpiderWoman,
    changeSuperLife,
    changeSuperPlan,
  } = useSuper();

  const spiderWomanTotalProgress = {
    percentage: spiderWomanTotal,
    value: spiderWomanTotalValue,
    label: 'Total',
    invert: true,
  };
  const spiderWomanOwnProgress = spiderWomanOwn !== undefined
    ? { percentage: spiderWomanOwn, value: spiderWomanOwnValue, label: 'Propia', invert: true }
    : undefined;

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.SUPER}
        progress={{ percentage: superLife, value: superLifeValue, label: 'Vida' }}
        controls={readOnly ? undefined : { onChange: changeSuperLife }}
        hasBackground={readOnly}
      />
      <Panel
        type={PanelTypeDict.SUPER_PLAN}
        progress={{ percentage: superPlan, value: superPlanValue, label: 'Amenaza' }}
        controls={readOnly ? undefined : { onChange: changeSuperPlan }}
        hasBackground={readOnly}
      />
      <Panel
        type={PanelTypeDict.SPIDER_WOMAN_LEAVES}
        progress={
          spiderWomanOwnProgress
            ? [spiderWomanTotalProgress, spiderWomanOwnProgress]
            : spiderWomanTotalProgress
        }
        controls={readOnly ? undefined : { maxValue: 5, onChange: changeSpiderWoman }}
        hasBackground={readOnly}
      />
    </Wrapper>
  );
};
