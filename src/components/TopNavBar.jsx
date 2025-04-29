import React from 'react';

const TopNavBar = () => {
  // Adjust this value to match the left margin of the text
  const leftMargin = '1rem'; 
  return (
    <header className="w-full bg-white px-6 pt-6 pb-2 relative">
      <div className="flex items-center justify-between">
        <div className="flex flex-col relative">
          <span className="text-2xl font-semibold text-blue-700 pb-1 z-10">My Library</span>
        </div>
        <div className="flex items-center gap-6 z-10">
          {/* Notification Bell Icon */}
          <button className="text-gray-500 hover:text-blue-700" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </button>
          {/* User Avatar Icon */}
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1976d2" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Underline: blue under 'My Library', gray for the rest */}
      <div className="absolute right-0 bottom-0 h-0.5 w-full flex" style={{ left: leftMargin }}>
        <div className="bg-blue-700" style={{ width: '140px', minWidth: '140px', height: '3px' }} />
        <div className="flex-1 bg-gray-200 h-0.5" />
      </div>
    </header>
  );
};

export default TopNavBar; 