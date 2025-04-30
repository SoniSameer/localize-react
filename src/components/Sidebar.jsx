import React from 'react';
import { useView } from '../context/ViewContext';
import { useLocation } from 'react-router-dom';
import { getTitleByRoute } from '../utils/getTitleByRoute';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { viewMode } = useView();
  const { pathname } = useLocation();

  const title = getTitleByRoute(pathname, viewMode);

  return (
    <div className={`fixed top-0 left-0 h-full bg-blue-700 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-56'
    } flex flex-col`}>
      <button
        className="absolute -right-5 top-1/2 -translate-y-1/2 bg-blue-700 rounded-full focus:outline-none z-20 p-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </button>
      <div className="mt-16 flex flex-col gap-4 px-4 overflow-y-auto">
        <span className="font-bold text-lg">{!isCollapsed && title}</span>
        {/* Add navigation links here */}
      </div>
    </div>
  );
};

export default Sidebar; 