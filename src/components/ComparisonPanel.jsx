import React from 'react';
import PropTypes from 'prop-types';

const ComparisonPanel = ({ isOpen, onClose, originalContent }) => {
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed left-0 top-0 h-full w-[500px] bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Original HTML Text</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Character count */}
          <div className="text-sm text-gray-500 mb-4">
            {originalContent.length} characters
          </div>

          {/* Original content sections */}
          <div className="space-y-6">
            {/* FDA approved section */}
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">FDA approved</span>
              </div>
              <div className="text-sm text-gray-600">
                {originalContent}
              </div>
            </div>

            {/* Relevant section */}
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Relevant</span>
              </div>
              <div className="text-sm text-gray-600">
                Aligns the product with globally recognized guidelines, making it more relevant to the German audience.
              </div>
            </div>

            {/* Added section */}
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Added</span>
              </div>
              <div className="text-sm text-gray-600">
                Additional content specific to German market requirements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ComparisonPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  originalContent: PropTypes.string.isRequired,
};

export default ComparisonPanel; 