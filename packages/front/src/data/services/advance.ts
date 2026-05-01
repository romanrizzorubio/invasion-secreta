import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const advanceService = async () => {
  const data: DataService = await post(endpoints.advance);

  return parseData(data);
};
