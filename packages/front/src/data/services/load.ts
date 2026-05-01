import { get } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const loadService = async (currentTable: number) => {
  const data: DataService = await get(endpoints.data);

  return parseData(data, currentTable);
};
