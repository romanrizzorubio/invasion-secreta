import { HTMLAttributes, useMemo } from 'react';
import { Img, Wrapper, Text, ProgressPanel } from './Panel.styles';
import imgSuperLife from '../../assets/super-life.jpg';
import imgSuperPlan from '../../assets/super-plan.jpg';
import imgSpiderWoman from '../../assets/spiderwoman.jpg';
import imgSuperLose from '../../assets/super-lose.jpg';
import imgSuperWin from '../../assets/super-win.jpg';
import imgVeranke from '../../assets/veranke.jpg';
import imgShipFall from '../../assets/ship-fall.jpg';
import imgShipOpen from '../../assets/ship-open.jpg';
import imgEnemy from '../../assets/enemy.jpg';
import imgQueen from '../../assets/queen.jpg';
import imgExposed from '../../assets/exposed.jpg';
import imgOsborn from '../../assets/osborn.jpg';
import imgUatu from '../../assets/uatu.jpg';
import imgAron from '../../assets/aron.jpg';
import { PanelType, PanelTypeDict } from '../../types/Dicts';
import { Progress, ProgressProps } from '../../ui/Progress/Progress';
import { Controls, ControlsProps } from '../Controls/Controls';
import { Button, ButtonProps } from '../../ui/Button/Button';

export type PanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  type: PanelType;
  progress?: ProgressProps | ProgressProps[];
  msg?: string;
  controls?: ControlsProps;
  buttons?: ButtonProps | ButtonProps[];
  disabled?: boolean;
  hasBackground?: boolean;
};

export const Panel = ({
  type,
  progress,
  msg,
  controls,
  buttons,
  disabled = false,
  hasBackground = false,
}: PanelProps) => {
  const img = useMemo(() => {
    const imgMap = {
      [PanelTypeDict.SUPER]: imgSuperLife,
      [PanelTypeDict.SUPER_PLAN]: imgSuperPlan,
      [PanelTypeDict.SPIDER_WOMAN_LEAVES]: imgSpiderWoman,
      [PanelTypeDict.SUPER_DEFEATED]: imgSuperLose,
      [PanelTypeDict.SUPER_WINER]: imgSuperWin,
      [PanelTypeDict.VERANKE]: imgVeranke,
      [PanelTypeDict.SHIP_FALL]: imgShipFall,
      [PanelTypeDict.SHIP_OPEN]: imgShipOpen,
      [PanelTypeDict.ENEMY]: imgEnemy,
      [PanelTypeDict.QUEEN]: imgQueen,
      [PanelTypeDict.EXPOSED]: imgExposed,
      [PanelTypeDict.OSBORN]: imgOsborn,
      [PanelTypeDict.UATU]: imgUatu,
      [PanelTypeDict.ARON]: imgAron,
    };
    return imgMap[type];
  }, [type]);

  return (
    <Wrapper $img={img}>
      {msg && <Text>{msg}</Text>}
      <Img src={img} alt="" disabled={disabled} />
      <ProgressPanel>
        {progress &&
          (progress instanceof Array ? (
            progress.map((p, index) => (
              <Progress key={`progress-${index}`} {...p} hasBackground={hasBackground} />
            ))
          ) : (
            <Progress {...progress} hasBackground={hasBackground} />
          ))}
      </ProgressPanel>
      {controls && <Controls {...controls} />}
      {buttons &&
        (buttons instanceof Array ? (
          buttons.map((button, index) => (
            <Button
              key={`button-${index}`}
              {...button}
              disabled={disabled || button.disabled}
            />
          ))
        ) : (
          <Button {...buttons} disabled={disabled || buttons.disabled} />
        ))}
    </Wrapper>
  );
};
