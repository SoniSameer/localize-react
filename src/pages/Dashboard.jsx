import React, { useState } from 'react';
import UploadModal from '../components/UploadModal';
import LocalizationModal from '../components/LocalizationModal';

const Dashboard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLocalisationModal, setShowLocalisationModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleUpload = (file, language) => {
    setSelectedFile(file);
    setSelectedLanguage(language);
    setShowUploadModal(false);
    setShowLocalisationModal(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mx-auto rounded-xl shadow-lg p-8" style={{ background: 'linear-gradient(180deg, #b3d8ef 0%, #a7aee3 100%)' }}>
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">What masterpiece are we crafting today?</h2>
        <div className="flex justify-center">
          <button
            className="flex flex-col items-center bg-white rounded-xl shadow-md px-12 py-8 hover:shadow-lg transition"
            onClick={() => setShowUploadModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1976d2" className="w-12 h-12 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-blue-700 text-xl font-semibold">Localise Email</span>
          </button>
        </div>
      </div>
      <UploadModal 
        open={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
        onUpload={handleUpload} 
      />
      <LocalizationModal 
        open={showLocalisationModal} 
        onClose={() => setShowLocalisationModal(false)} 
        onLocalise={() => setShowLocalisationModal(false)}
        selectedFile={selectedFile}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};

export default Dashboard; 