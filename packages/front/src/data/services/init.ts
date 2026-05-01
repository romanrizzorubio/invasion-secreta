import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { DataService } from '../../types/Data';
import { parseData } from '../../utils/parsers';

export const initService = async (end: Date) => {
  const newEnd = new Date();
  const hours = end.getHours();
  const minutes = end.getMinutes();
  newEnd.setHours(Number(hours));
  newEnd.setMinutes(Number(minutes));
  newEnd.setSeconds(59);

  const data: DataService = await post(endpoints.init, {
    end: newEnd.getTime(),
  });

  return parseData(data);
};
