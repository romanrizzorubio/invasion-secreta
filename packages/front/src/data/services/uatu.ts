import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const uatuService = async (next: boolean, table: number) => {
  const data: DataService = await post(endpoints.uatu, {
    next,
    table,
  });

  return parseData(data, table);
};
