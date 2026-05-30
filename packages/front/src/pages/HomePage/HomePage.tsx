import { Container, Wrapper } from './HomePage.styles';
import { SuperPhase } from '../../phases/SuperPhase/SuperPhase';
import { PhaseDict } from '../../types/Dicts';
import { SuperChangePhase } from '../../phases/SuperChangePhase/SuperChangePhase';
import { ShipFallPhase } from '../../phases/ShipFallPhase/ShipFallPhase';
import { ShipOpenPhase } from '../../phases/ShipOpenPhase/ShipOpenPhase';
import { OsbornChangePhase } from '../../phases/OsbornChangePhase/OsbornChangePhase';
import { OsbornPhase } from '../../phases/OsbornPhase/OsbornPhase';
import { EnemyPhase } from '../../phases/EnemyPhase/EnemyPhase';
import { InitPhase } from '../../phases/InitPhase/InitPhase';
import { Timer } from '../../components/Timer/Timer';
import { WaitingTablesPhase } from '../../phases/WaitingTablesPhase/WaitingTablesPhase';
import { useGameContext } from '../../contexts/GameContext';
import { SpiderWomanPhase } from '../../phases/SpiderWomanPhase/SpiderWomanPhase';
import { Watchers } from '../../components/Watchers/Watchers';
import { useMemo } from 'react';

const HomePage = () => {
  const {
    data,
    data: { phase },
  } = useGameContext();

  console.log('HomePage render, phase:', phase);

  const showWatchers = useMemo(
    () =>
      [
        PhaseDict.SUPER,
        PhaseDict.SHIP_FALL,
        PhaseDict.ENEMY,
        PhaseDict.OSBORN_REVEAL,
      ].some((p) => p === phase),
    [phase],
  );

  return (
    <Wrapper>
      {phase !== PhaseDict.INIT && <Timer />}
      <Container>
        {showWatchers && <Watchers readOnly />}
        {phase === PhaseDict.INIT && <InitPhase />}
        {phase === PhaseDict.TABLES && <WaitingTablesPhase />}
        {phase === PhaseDict.SUPER && <SuperPhase readOnly />}
        {phase === PhaseDict.SUPER_DEFEATED && <SuperChangePhase />}
        {phase === PhaseDict.SUPER_WINER && <SuperChangePhase hasWin />}
        {phase === PhaseDict.SPIDER_WOMAN_LEAVES && <SpiderWomanPhase />}
        {phase === PhaseDict.SHIP_FALL && <ShipFallPhase readOnly />}
        {phase === PhaseDict.SHIP_OPEN && <ShipOpenPhase />}
        {phase === PhaseDict.ENEMY && <EnemyPhase readOnly />}
        {phase === PhaseDict.OSBORN_REVEAL && <OsbornChangePhase />}
        {phase === PhaseDict.VERANKE_LOSE && <OsbornPhase />}
        {phase === PhaseDict.VERANKE_WIN && <OsbornPhase hasWin />}
      </Container>
    </Wrapper>
  );
};

export default HomePage;
