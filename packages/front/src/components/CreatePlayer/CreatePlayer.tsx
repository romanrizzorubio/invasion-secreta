import { useCallback, useMemo } from 'react';
import { Select, SelectOptionProps } from '../../ui/Select/Select';
import { Option } from '../../types/Option';
import { Player } from '../../types/Player';

export type CreatePlayerProps = {
  name: string;
  player: Player;
  heroes: Option[];
  onChangePlayer: (player: Player) => void;
};

export const CreatePlayer = ({ name, player, heroes, onChangePlayer }: CreatePlayerProps) => {
  const heroesOptions: SelectOptionProps[] = useMemo(
    () =>
      heroes.map(({ label, value }) => ({
        label,
        value,
      })),
    [heroes],
  );

  const hero: Option = useMemo(() => player?.hero, [player]);

  const handleChangeHero = useCallback(
    (value: string) => {
      onChangePlayer({
        ...player,
        hero: heroes.find(({ value: heroValue }) => heroValue === value) as Option,
      });
    },
    [onChangePlayer, player, heroes],
  );

  return (
    <Select label={name} value={hero?.value} options={heroesOptions} onChange={handleChangeHero} />
  );
};
