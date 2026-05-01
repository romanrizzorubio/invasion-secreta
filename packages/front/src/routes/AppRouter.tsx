import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import InitPage from '../pages/InitPage/InitPage';
import TablePage from '../pages/TablePage/TablePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/init" element={<InitPage />} />
        <Route path="/table" element={<TablePage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
