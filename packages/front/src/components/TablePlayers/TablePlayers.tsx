import { HTMLAttributes, useMemo } from 'react';
import { Player } from '../../types/Player';
import { Table, TableFieldProps } from '../../ui/Table/Table';
import { Size } from '../../types/Dicts';
import { Wrapper } from './TablePlayers.styles';
import { getTableText } from '../../utils/utils';

export type TablePlayersData = {
  hero: string;
};

export type TablePlayersProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  currentTable: number;
  expert?: boolean;
  hideName?: boolean;
  players: Player[];
  size?: Size;
};

export const TablePlayers = ({
  currentTable,
  expert = false,
  hideName = false,
  players,
  size,
}: TablePlayersProps) => {
  const fields: TableFieldProps<TablePlayersData>[] = useMemo(
    () => [
      {
        header: 'Héroe',
        valueKey: 'hero',
      },
    ],
    [],
  );

  const data: TablePlayersData[] = useMemo(
    () =>
      players.map((player) => ({
        hero: player.hero.label,
      })),
    [players],
  );

  return (
    <Wrapper>
      <Table
        name={hideName ? undefined : getTableText(currentTable)}
        subtitle={expert ? 'Experto' : 'Normal'}
        fields={fields}
        data={data}
        size={size}
      />
    </Wrapper>
  );
};
