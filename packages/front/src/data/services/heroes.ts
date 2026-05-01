import { get } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseOptions } from '../../utils/parsers';
import { OptionService } from '../../types/Option';

export const heroesService = async () => {
  const data: OptionService[] = await get(endpoints.heroes);

  return parseOptions(data);
};
