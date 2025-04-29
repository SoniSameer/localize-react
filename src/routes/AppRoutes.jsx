import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      {/* Add more routes here as you build more pages */}
    </Route>
  </Routes>
);

export default AppRoutes; 