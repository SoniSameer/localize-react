import React, { useRef, useState, useEffect } from 'react';

const countries = ['Germany', 'France', 'United Kingdom', 'Spain'];
const fileFormats = ['Email'];

const UploadModal = ({ open, onClose, onUpload }) => {
  const fileInputRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('Email');
  const [selectedFile, setSelectedFile] = useState(null);

  // Reset state when modal is closed
  useEffect(() => {
    if (!open) {
      setSelectedCountry(null);
      setSelectedFormat('Email');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [open]);

  if (!open) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const canUpload = selectedFile && selectedCountry;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative p-0">
        {/* Header */}
        <div className="flex items-center bg-blue-700 rounded-t-2xl px-6 py-3">
          <button onClick={onClose} className="text-white text-2xl mr-3" aria-label="Back">&#8592;</button>
          <span className="text-white font-medium text-lg flex-1">Upload HTML File</span>
          <button onClick={onClose} className="text-white text-xl ml-auto" aria-label="Close">&#10005;</button>
        </div>
        {/* Content */}
        <div className="p-8 pt-6">
          {/* File Upload or Preview */}
          {selectedFile ? (
            <div className="flex items-center bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 mb-6 relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1976d2" className="w-10 h-10 mr-4">
                <rect x="4" y="4" width="16" height="16" rx="2" fill="#e3f0fa" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h4" />
              </svg>
              <div className="flex-1">
                <div className="text-blue-700 font-medium cursor-pointer hover:underline">{selectedFile.name}</div>
                <div className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)}MB</div>
              </div>
              <button onClick={handleRemoveFile} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg" aria-label="Remove file">&#10005;</button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-blue-400 rounded-lg flex flex-col items-center py-8 mb-6 cursor-pointer hover:bg-blue-50 transition" onClick={() => fileInputRef.current.click()}>
              <span className="bg-gray-200 text-gray-600 rounded-full px-4 py-1 text-xs mb-2">HTML</span>
              <span className="text-gray-700 font-medium mb-1">Drag HTML file here to import</span>
              <span className="text-gray-400 text-sm mb-2">or, click to browse file</span>
              <button className="bg-white border border-blue-400 text-blue-700 rounded px-4 py-1 font-medium shadow-sm">Select files</button>
              <input ref={fileInputRef} type="file" accept=".html,.htm" className="hidden" onChange={handleFileChange} />
            </div>
          )}
          {/* File Format */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select File Format</label>
            <div className="flex gap-2 flex-wrap">
              {fileFormats.map((format) => (
                <button
                  key={format}
                  className={`rounded px-4 py-1 font-medium focus:outline-none transition-colors ${selectedFormat === format ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedFormat(format)}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
          {/* Country Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Select Country</label>
            <div className="flex gap-2 flex-wrap">
              {countries.map((country) => (
                <button
                  key={country}
                  className={`rounded px-4 py-1 font-medium focus:outline-none transition-colors ${selectedCountry === country ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              className="bg-gray-100 text-gray-700 rounded px-5 py-2 font-medium hover:bg-gray-200 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`rounded px-5 py-2 font-medium transition-colors ${canUpload ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              disabled={!canUpload}
              onClick={canUpload ? onUpload : undefined}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal; 