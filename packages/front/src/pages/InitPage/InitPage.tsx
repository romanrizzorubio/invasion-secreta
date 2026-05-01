import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from './InitPage.styles';
import { useInit } from '../../hooks/useInit';
import { Button } from '../../ui/Button/Button';
import { SizeDict } from '../../types/Dicts';

const InitPage = () => {
  const navigate = useNavigate();

  const { resetData } = useInit();

  const handleInit = useCallback(async () => {
    const success = await resetData();
    if (!success) return;
    navigate('/');
  }, [resetData, navigate]);

  return (
    <Wrapper>
      <Button size={SizeDict.L} label="Iniciar" onClick={handleInit} />
    </Wrapper>
  );
};

export default InitPage;
