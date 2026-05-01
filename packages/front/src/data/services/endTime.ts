import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const endTimeService = async () => {
  const data: DataService = await post(endpoints.endTime);

  return parseData(data);
};
