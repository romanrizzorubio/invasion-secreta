import { Wrapper } from './Watchers.styles';
import { PanelTypeDict } from '../../types/Dicts';
import { useWatchers } from '../../hooks/useWatchers';
import { Watcher } from './Watcher';

export type WatchersProps = {
  readOnly?: boolean;
};

export const Watchers = ({ readOnly = false }: WatchersProps) => {
  const { currentTable, uatu, aron, uatuDisabled, changeUatu, changeAron } = useWatchers();

  const showUatu = uatu !== undefined && (readOnly || uatu === currentTable);
  const showAron = aron !== undefined && (readOnly || aron === currentTable);

  if (!showUatu && !showAron) return null;

  return (
    <Wrapper>
      {showUatu && (
        <Watcher
          table={uatu}
          type={PanelTypeDict.UATU}
          onPrevious={() => changeUatu(false)}
          onNext={() => changeUatu(true)}
          readOnly={readOnly}
          disabled={uatuDisabled}
        />
      )}
      {showAron && (
        <Watcher
          table={aron}
          type={PanelTypeDict.ARON}
          onPrevious={() => changeAron(false)}
          onNext={() => changeAron(true)}
          readOnly={readOnly}
        />
      )}
    </Wrapper>
  );
};
