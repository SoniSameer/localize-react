import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Dashboard from '../pages/Dashboard';
import LocalizedContentPage from '../pages/LocalizedContentPage';
import TestApi from '../pages/TestApi';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/localised-content" element={<LocalizedContentPage />} />
      <Route path="/test-api" element={<TestApi />} />
      {/* Add more routes here as you build more pages */}
    </Route>
  </Routes>
);

export default AppRoutes; 