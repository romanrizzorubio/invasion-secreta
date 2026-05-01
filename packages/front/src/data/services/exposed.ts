import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const exposedService = async (value: number, table: number) => {
  const data: DataService = await post(endpoints.exposed, {
    value,
    table,
  });

  return parseData(data, table);
};
