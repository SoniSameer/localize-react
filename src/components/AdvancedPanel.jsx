import React from 'react';
import PropTypes from 'prop-types';

const AdvancedPanel = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed left-0 top-0 h-full w-[400px] bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-700 text-white">
          <h2 className="text-lg font-medium">Advanced Options</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Sections */}
          <div className="space-y-6">
            {/* Translation Memory */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3 text-blue-700">Translation Memory</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Match Threshold</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="75"
                    className="w-32"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Use Fuzzy Matching</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Quality Checks */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3 text-blue-700">Quality Checks</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-gray-600">Terminology Consistency</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-gray-600">Grammar Check</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-gray-600">Formatting Check</span>
                </label>
              </div>
            </div>

            {/* Machine Translation */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3 text-blue-700">Machine Translation</h3>
              <div className="space-y-4">
                <select className="w-full p-2 border rounded-md text-sm text-gray-600">
                  <option value="gpt4">GPT-4</option>
                  <option value="deepl">DeepL</option>
                  <option value="google">Google Translate</option>
                </select>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-translate New Content</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Controlled Release */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-blue-700">Controlled Release</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-700">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Schedule Release</span>
                  <input 
                    type="datetime-local" 
                    className="border rounded-md p-1 text-sm text-gray-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Gradual Rollout</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdvancedPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default AdvancedPanel; 