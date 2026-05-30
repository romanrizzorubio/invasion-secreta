import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { loadService } from '../data/services/load';
import { loadSocket } from '../data/sockets/load';
import { Data } from '../types/Data';
import { PhaseDict } from '../types/Dicts';

type GameContextValue = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  currentTable: number;
  setCurrentTable: Dispatch<SetStateAction<number>>;
};

const initialData: Data = {
  tables: [],
  phase: PhaseDict.INIT,
  superLife: 0,
  superLifeValue: 0,
  superPlan: 0,
  superPlanValue: 0,
  spiderWomanTotal: 0,
  spiderWomanTotalValue: 0,
  ship: 0,
  shipValue: 0,
  enemy: 0,
  enemyValue: 0,
  exposed: 0,
  exposedValue: 0,
  exposedMax: 0,
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const openingRef = useRef(false);
  const socketRef = useRef<Socket | null>(null);

  const [data, setData] = useState<Data>(initialData);
  const [currentTable, setCurrentTable] = useState(-1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await loadService(currentTable);
        setData(response);
      } catch (error) {
        console.error('Error al cargar los datos', error);
      }
    };

    loadData();

    return loadSocket({
      currentTable,
      socketRef,
      openingRef,
      handleData: setData,
      handleError: (error: Error) => console.error('Error en el socket', error),
    });
  }, [currentTable]);

  useEffect(() => {
    if (data.phase === PhaseDict.INIT && currentTable !== -1) {
      setCurrentTable(-1);
    }
  }, [data.phase, currentTable]);

  return (
    <GameContext.Provider
      value={{
        data,
        setData,
        currentTable,
        setCurrentTable,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
};
