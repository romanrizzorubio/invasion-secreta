import { Tables, Wrapper } from './WaitingTablesPhase.styles';
import { Button } from '../../ui/Button/Button';
import { TablePlayers } from '../../components/TablePlayers/TablePlayers';
import { SizeDict } from '../../types/Dicts';
import { useInit } from '../../hooks/useInit';
import { useGameContext } from '../../contexts/GameContext';

export const WaitingTablesPhase = () => {
  const {
    data: { tables },
  } = useGameContext();
  const { startTables } = useInit();

  return (
    <Wrapper>
      <Button
        label="Iniciar"
        onClick={startTables}
        size={SizeDict.L}
        disabled={tables.length === 0}
      />
      <Tables>
        {tables.map((table, index) =>
          table ? (
            <TablePlayers
              key={`table-${index}`}
              players={table.players}
              expert={table.expert}
              currentTable={index}
              size={SizeDict.M}
            />
          ) : undefined,
        )}
      </Tables>
    </Wrapper>
  );
};
