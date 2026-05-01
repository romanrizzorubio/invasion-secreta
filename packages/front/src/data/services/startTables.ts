import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { DataService } from '../../types/Data';
import { parseData } from '../../utils/parsers';

export const startTablesService = async () => {
  const data: DataService = await post(endpoints.startTables);

  return parseData(data);
};
