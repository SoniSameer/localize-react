import React, { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-blue-700 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} flex flex-col relative`}>
      <button
        className="absolute -right-5 top-1/2 -translate-y-1/2 bg-blue-700 rounded-full focus:outline-none z-20 p-2"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </button>
      <div className="mt-16 flex flex-col gap-4 px-4">
        <span className="font-bold text-lg">{!collapsed && 'My Library'}</span>
        {/* Add navigation links here */}
      </div>
    </div>
  );
};

export default Sidebar; 