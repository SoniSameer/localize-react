import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ComparisonPanel from './ComparisonPanel';
import AdvancedPanel from './AdvancedPanel';
import FroalaEditor from './FroalaEditor';
import { useView } from '../context/ViewContext';

const LocalizedContentView = ({ 
  content,
  language,
  onBlockClick,
  isEditable = true,
  selectedBlockId = null,
  onContentChange
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const { viewMode } = useView();

  const handleInfoClick = (block, e) => {
    e.stopPropagation();
    setSelectedBlock(block);
    setIsPanelOpen(true);
  };

  // Calculate left margin based on which panels are open
  const getLeftMargin = () => {
    if (viewMode === 'advanced' && isPanelOpen) {
      return 'ml-[900px]'; // Both panels open (400px + 500px)
    } else if (viewMode === 'advanced') {
      return 'ml-[400px]'; // Only advanced panel
    } else if (isPanelOpen) {
      return 'ml-[500px]'; // Only comparison panel
    }
    return ''; // No panels open
  };

  // Handle content changes from the Froala editor
  const handleEditorChange = (blockId, newContent) => {
    onContentChange?.(blockId, newContent);
  };

  return (
    <div className="w-full h-full">
      {/* Comparison Panel */}
      <ComparisonPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        originalContent={selectedBlock?.content || ''}
      />

      {/* Advanced Panel */}
      <AdvancedPanel isOpen={viewMode === 'advanced'} />

      {/* Header */}
      <div className={`flex items-center justify-between p-4 bg-white border-b transition-all duration-300 ${getLeftMargin()}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Localised Text</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm font-medium">{language}</span>
        </div>
        <button
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => {/* Submit for approval handler */}}
        >
          Submit for Approval
        </button>
      </div>

      {/* Main Content Area with padding for buttons */}
      <div className={`p-8 transition-all duration-300 ${getLeftMargin()}`}>
        <div className="relative">
          {/* Email Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Email Header */}
            <div className="w-full bg-[#0066b2] text-white p-4 rounded-t-lg">
              <div className="text-xl font-medium">Werbe-Email von Oxymat</div>
            </div>

            {/* Email Body */}
            <div className="border rounded-b-lg bg-white">
              {/* Logo Section */}
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <img 
                    src="/oxymat-logo.png" 
                    alt="Oxymat Logo" 
                    className="h-8"
                  />
                  <span className="ml-4 text-lg">Innovative Lösungen bei Prostatakrebs</span>
                </div>
              </div>

              {/* Content Blocks */}
              <div className="p-6 space-y-8">
                {content.map((block, index) => (
                  <div key={block.id} className="relative group">
                    {/* Info Button - Positioned outside */}
                    {isEditable && (
                      <button
                        className="absolute -left-14 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors shadow-sm"
                        onClick={(e) => handleInfoClick(block, e)}
                      >
                        <span className="text-sm font-medium text-blue-600">i</span>
                      </button>
                    )}
                    
                    {/* Content Block */}
                    <div
                      className={`rounded-lg transition-all ${
                        selectedBlockId === block.id
                          ? 'ring-2 ring-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => isEditable && onBlockClick?.(block.id)}
                    >
                      {selectedBlockId === block.id ? (
                        <FroalaEditor
                          content={block.content}
                          onContentChange={(newContent) => handleEditorChange(block.id, newContent)}
                          language={language}
                          height={200}
                        />
                      ) : (
                        <div 
                          className="prose max-w-none p-4"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LocalizedContentView.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  language: PropTypes.string.isRequired,
  onBlockClick: PropTypes.func,
  isEditable: PropTypes.bool,
  selectedBlockId: PropTypes.string,
  onContentChange: PropTypes.func
};

export default LocalizedContentView; 