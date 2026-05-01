import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { Table } from '../../types/Table';

export const resetTableService = async (table: number) => {
  const data: Table = await post(endpoints.resetTable, {
    table,
  });

  return data;
};
