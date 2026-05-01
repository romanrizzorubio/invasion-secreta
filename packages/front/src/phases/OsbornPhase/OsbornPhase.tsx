import { Wrapper } from './OsbornPhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict } from '../../types/Dicts';
import { useMemo } from 'react';

export type OsbornPhaseProps = {
  hasWin?: boolean;
};

export const OsbornPhase = ({ hasWin = false }: OsbornPhaseProps) => {
  const msg = useMemo(() => {
    return hasWin
      ? 'Los Skrulls han logrado sus planes, os han debilitado lo suficiente como para que Veranke haga su aparición triunfal cómo nueva líder mundial. De pronto, todos escucháis: ¡BLAM!. Un disparo desde lo lejos acaba en la cabeza de la Reina Skrull que cae abatida en el suelo. Miráis el origen del disparo y es ¡Norman Osborn!. Con una decisión, quizá demasiado drástica, ha impedido que pueda escaparse de nuevo. Más tarde descubrís atónitos como un oscuro gobierno nombra a Norman Director de S.H.I.E.L.D. al considerar que llegan momentos oscuros en los que hay que tomar decisiones drásticas.'
      : 'La Reina Skrull está acorralada, va a dar con sus huesos en La Balsa, aunque asegura que no será su fin ya que escapará y finalizará su plan. De pronto, todos escucháis: ¡BLAM!. Un disparo desde lo lejos acaba en la cabeza de la Reina Skrull que cae abatida en el suelo. Miráis el origen del disparo y es ¡Norman Osborn!. Con una decisión, quizá demasiado drástica, ha impedido que pueda escaparse de nuevo. Más tarde descubrís atónitos cómo un oscuro gobierno nombra a Norman Director de S.H.I.E.L.D. al considerar que llegan momentos oscuros en los que hay que tomar decisiones drásticas.';
  }, [hasWin]);

  return (
    <Wrapper>
      <Panel type={PanelTypeDict.OSBORN} msg={msg} />
    </Wrapper>
  );
};
