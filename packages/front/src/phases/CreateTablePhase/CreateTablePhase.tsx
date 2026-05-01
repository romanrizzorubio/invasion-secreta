import { Players, Wrapper } from './CreateTablePhase.styles';
import { Button } from '../../ui/Button/Button';
import { useCreateTable } from '../../hooks/useCreateTable';
import { CreatePlayer } from '../../components/CreatePlayer/CreatePlayer';
import { TablePlayers } from '../../components/TablePlayers/TablePlayers';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { SizeDict } from '../../types/Dicts';

export const CreateTablePhase = () => {
  const {
    currentTable,
    players,
    expert,
    heroes,
    saved,
    changePlayer,
    changeExpert,
    createTable,
    editTable,
  } = useCreateTable();

  return (
    <Wrapper>
      {saved ? (
        <>
          <TablePlayers
            hideName
            players={players}
            expert={expert}
            currentTable={currentTable}
            size={SizeDict.M}
          />
          <Button label="Editar" onClick={editTable} />
        </>
      ) : (
        <>
          <Checkbox label="Experto" checked={expert} size={SizeDict.M} onChange={changeExpert} />
          <Players>
            <CreatePlayer
              name="Jugador 1"
              player={players[0]}
              heroes={heroes}
              onChangePlayer={changePlayer(0)}
            />
            {players.length > 0 && (
              <CreatePlayer
                name="Jugador 2"
                player={players[1]}
                heroes={heroes}
                onChangePlayer={changePlayer(1)}
              />
            )}
            {players.length > 1 && (
              <CreatePlayer
                name="Jugador 3"
                player={players[2]}
                heroes={heroes}
                onChangePlayer={changePlayer(2)}
              />
            )}
            {players.length > 2 && (
              <CreatePlayer
                name="Jugador 4"
                player={players[3]}
                heroes={heroes}
                onChangePlayer={changePlayer(3)}
              />
            )}
          </Players>
          <Button label="Iniciar" onClick={createTable} disabled={players.length === 0} />
        </>
      )}
    </Wrapper>
  );
};
