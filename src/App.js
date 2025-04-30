import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ViewProvider } from './context/ViewContext';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <ViewProvider>
      <AppRoutes />
        </ViewProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App; 