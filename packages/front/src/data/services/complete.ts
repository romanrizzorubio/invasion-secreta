import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const completeService = async (table: number) => {
  const data: DataService = await post(endpoints.complete, {
    table,
  });

  return parseData(data, table);
};
