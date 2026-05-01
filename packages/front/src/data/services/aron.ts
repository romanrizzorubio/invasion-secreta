import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const aronService = async (next: boolean, table: number) => {
  const data: DataService = await post(endpoints.aron, {
    next,
    table,
  });

  return parseData(data, table);
};
