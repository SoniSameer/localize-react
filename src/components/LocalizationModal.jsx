import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const presetRules = [
  'Scientific information and WHO Guidelines',
  'Safety Information and Local Compliance',
  'Mechanism of Action and Guideline Compliance',
  'Formal Scientific Language and Technical Details',
  'First-Line Therapy Positioning',
  'Market-Specific Elements and Reporting Instructions',
  'Flexible Dosing and Consultation Availability',
  'Detailed Structure with Technical Specifications',
  'Targeted Benefits for Specific Groups (e.g., Travelers)',
  'Authentic German Localization'
];

const defaultPrompt = `Localize the provided English HTML text into German, ensuring the following: Adapt the tone to be polite and professional for a German-speaking audience, replacing informal phrases with formal equivalents. Incorporate cultural sensitivity by adjusting idiomatic expressions to resonate with German norms, avoiding direct translations that might feel unnatural. Ensure HTML tags remain intact, but translate any placeholder text within the tags (e.g., alt text for images, button labels). Use precise German terminology for technical or medical contexts, reflecting standard German vocabulary. Maintain the original structure and formatting of the HTML while ensuring the translated text fits naturally within the layout, adjusting sentence length if needed for readability. Provide a brief explanation of key changes to highlight cultural and linguistic adaptations.`;

const LocalizationModal = ({ open, onClose, onLocalise, selectedFile, selectedLanguage }) => {
  const [customPrompt, setCustomPrompt] = useState(defaultPrompt);
  const navigate = useNavigate();

  if (!open) return null;

  const handleLocalise = () => {
    if (selectedFile && selectedLanguage) {
      navigate('/test-api', {
        state: {
          htmlFile: selectedFile,
          targetLanguage: selectedLanguage,
          customPrompt: customPrompt
        }
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative p-0">
        {/* Header */}
        <div className="flex items-center bg-blue-700 rounded-t-2xl px-6 py-3">
          <span className="text-white font-medium text-lg flex-1">Localisation Instructions</span>
          <button onClick={onClose} className="text-white text-xl ml-auto" aria-label="Close">&#10005;</button>
        </div>
        {/* Content */}
        <div className="flex p-8 pt-6 gap-8">
          {/* Preset Rules */}
          <div className="w-3/5">
            <div className="font-medium text-gray-400 mb-2 flex items-center gap-2">
              Preset Rules
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <ul className="text-gray-700 text-sm max-h-64 overflow-y-auto hide-scrollbar">
              {presetRules.map((rule, idx) => (
                <li key={rule} className="flex items-center py-1 border-b-2 last:border-b-0 border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#1976d2" className="w-4 h-4 mr-2 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          {/* Custom Prompt */}
          <div className="w-3/5">
            <div className="font-medium text-gray-400 mb-2">Custom Prompt</div>
            <textarea
              className="w-full h-64 border border-gray-300 rounded-lg p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 hide-scrollbar"
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              style={{ overflow: 'auto' }}
            />
          </div>
        </div>
        {/* Disclaimer (full width) */}
        <div className="px-8 pb-2 -mt-4">
          <div className="text-xs text-gray-500 rounded px-4 py-2 w-full">
            Disclaimer: The generated content will be closely tailored to the objectives defined during goal setting, aligning with the adoption cycle, target persona, and key messaging. Adhering to brand guidelines, the content will be crafted to ensure both relevance and accuracy. Please enter the keywords in the box below to create content specifically customized for your selected target persona.
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 px-8 pb-6">
          <button
            className="border border-2 text-gray-400 rounded px-9 py-1 font-medium hover:bg-gray-200 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`rounded px-5 py-1 font-medium transition ${
              selectedFile && selectedLanguage
                ? 'bg-blue-700 text-white hover:bg-blue-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleLocalise}
            disabled={!selectedFile || !selectedLanguage}
          >
            Localise Content
          </button>
        </div>
      </div>
      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default LocalizationModal; 