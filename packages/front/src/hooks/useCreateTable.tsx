import { useCallback, useEffect, useState } from 'react';
import { heroesService } from '../data/services/heroes';
import { Player } from '../types/Player';
import { Option } from '../types/Option';
import { createTableService } from '../data/services/createTable';
import { useGameContext } from '../contexts/GameContext';
import { resetTableService } from '../data/services/resetTable';

export const useCreateTable = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [expert, setExpert] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heroes, setHeroes] = useState<Option[]>([]);

  const { data: dataLoaded, currentTable } = useGameContext();

  const getHeroes = useCallback(async () => {
    try {
      const data = await heroesService();
      if (data) {
        data.sort((a, b) => a.label.localeCompare(b.label));
        setHeroes(data);
      }
      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [setHeroes]);

  const changePlayer = useCallback(
    (index: number) => (newPlayer: Player) => {
      const newPlayers = [...players];
      newPlayers[index] = newPlayer;
      setPlayers(newPlayers);
    },
    [setPlayers, players],
  );

  const changeExpert = useCallback(
    (value: boolean) => {
      setExpert(value);
    },
    [setExpert],
  );

  const createTable = useCallback(async () => {
    try {
      await createTableService(currentTable, players, expert);
      return true;
    } catch (error) {
      console.error('Error al crear la mesa', error);
      return false;
    }
  }, [currentTable, players, expert]);

  const editTable = useCallback(async () => {
    try {
      await resetTableService(currentTable);
      return true;
    } catch (error) {
      console.error('Error al reiniciar la mesa', error);
      return false;
    }
  }, [currentTable]);

  useEffect(() => {
    getHeroes();
  }, [getHeroes]);

  useEffect(() => {
    if (currentTable >= 0 && dataLoaded && dataLoaded.tables) {
      const table = dataLoaded.tables[currentTable];
      if (table) {
        setPlayers(table.players);
        setExpert(table.expert);
        setSaved(table.saved);
      }
    }
  }, [currentTable, dataLoaded, setPlayers, setExpert, setSaved]);

  return {
    heroes,
    players,
    expert,
    saved,
    currentTable,
    changePlayer,
    changeExpert,
    createTable,
    editTable,
  };
};
