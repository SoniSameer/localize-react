import React from 'react';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';
import { Outlet } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

const MainLayout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'ml-16' : 'ml-56'
      }`}>
        <TopNavBar />
        <main className="flex-1 bg-gray-50 p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 