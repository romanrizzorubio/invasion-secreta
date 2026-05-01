import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Main } from './Layout.styles';

const Layout = () => {
  return (
    <Container>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Layout;
