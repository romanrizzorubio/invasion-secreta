import { BannedHeroes, HeroesDict } from "../types/dicts";
import { OptionData } from "../types/OptionData";

export function getHeroes(): OptionData[] {
  return Object.entries(HeroesDict)
    .filter(([, name]) => !BannedHeroes.includes(name))
    .map(([id, name]) => ({
      id,
      name
    }));
}
