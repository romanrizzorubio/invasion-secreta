import { Container, Heading, Wrapper } from './TablePage.styles';
import { SuperPhase } from '../../phases/SuperPhase/SuperPhase';
import { PhaseDict } from '../../types/Dicts';
import { SuperChangePhase } from '../../phases/SuperChangePhase/SuperChangePhase';
import { ShipFallPhase } from '../../phases/ShipFallPhase/ShipFallPhase';
import { ShipOpenPhase } from '../../phases/ShipOpenPhase/ShipOpenPhase';
import { OsbornChangePhase } from '../../phases/OsbornChangePhase/OsbornChangePhase';
import { OsbornPhase } from '../../phases/OsbornPhase/OsbornPhase';
import { EnemyPhase } from '../../phases/EnemyPhase/EnemyPhase';
import { Timer } from '../../components/Timer/Timer';
import { WaitingPhase } from '../../phases/WaitingPhase/WaitingPhase';
import { CreateTablePhase } from '../../phases/CreateTablePhase/CreateTablePhase';
import { useMemo } from 'react';
import { SpiderWomanPhase } from '../../phases/SpiderWomanPhase/SpiderWomanPhase';
import { useGameContext } from '../../contexts/GameContext';
import { SetTable } from '../../components/SetTable/SetTable';
import { getTableText } from '../../utils/utils';
import { Watchers } from '../../components/Watchers/Watchers';

const TablePage = () => {
  const {
    data: { phase },
    currentTable,
  } = useGameContext();

  const tableText = useMemo(() => getTableText(currentTable), [currentTable]);

  const showWatchers = useMemo(
    () => [PhaseDict.SUPER, PhaseDict.SHIP_FALL, PhaseDict.ENEMY].some((p) => p === phase),
    [phase],
  );

  return (
    <Wrapper>
      {phase !== PhaseDict.INIT && <Timer />}
      {currentTable < 0 ? (
        <SetTable />
      ) : (
        <>
          {tableText && <Heading>{tableText}</Heading>}
          <Container>
            {showWatchers && <Watchers />}
            {phase === PhaseDict.INIT && <WaitingPhase />}
            {phase === PhaseDict.TABLES && <CreateTablePhase />}
            {phase === PhaseDict.SUPER && <SuperPhase />}
            {phase === PhaseDict.SUPER_DEFEATED && <SuperChangePhase readOnly />}
            {phase === PhaseDict.SUPER_WINER && <SuperChangePhase readOnly hasWin />}
            {phase === PhaseDict.SPIDER_WOMAN_LEAVES && <SpiderWomanPhase readOnly />}
            {phase === PhaseDict.SHIP_FALL && <ShipFallPhase />}
            {phase === PhaseDict.SHIP_OPEN && <ShipOpenPhase readOnly />}
            {phase === PhaseDict.ENEMY && <EnemyPhase />}
            {phase === PhaseDict.OSBORN_REVEAL && <OsbornChangePhase readOnly />}
            {phase === PhaseDict.VERANKE_LOSE && <OsbornPhase />}
            {phase === PhaseDict.VERANKE_WIN && <OsbornPhase hasWin />}
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default TablePage;
