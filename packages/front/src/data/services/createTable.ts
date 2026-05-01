import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { Player } from '../../types/Player';
import { Table } from '../../types/Table';

export const createTableService = async (table: number, players: Player[], expert: boolean) => {
  const data: Table = await post(endpoints.initTable, {
    table,
    players,
    expert,
  });

  return data;
};
