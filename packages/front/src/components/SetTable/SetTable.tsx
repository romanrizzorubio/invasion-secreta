import { Wrapper } from './SetTable.styles';
import { Button } from '../../ui/Button/Button';
import { useSetTable } from '../../hooks/useSetTable';
import { SizeDict } from '../../types/Dicts';
import { Input } from '../../ui/Input/Input';

export const SetTable = () => {
  const { table, changeTable, saveTable } = useSetTable();

  return (
    <Wrapper>
      <Input
        label="Mesa"
        type="number"
        value={table}
        size={SizeDict.M}
        min={1}
        onChange={changeTable}
      />
      <Button label="Iniciar" onClick={saveTable} disabled={table === undefined || table <= 0} />
    </Wrapper>
  );
};
