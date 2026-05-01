import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const superPlanService = async (value: number, table: number) => {
  const data: DataService = await post(endpoints.superPlan, {
    value,
    table,
  });

  return parseData(data, table);
};
