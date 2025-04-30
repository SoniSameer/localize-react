import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TestApi = () => {
  const location = useLocation();
  const [localizedContent, setLocalizedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocalizedContent = async () => {
      try {
        const { htmlFile, targetLanguage, customPrompt } = location.state;
        
        const formData = new FormData();
        formData.append('htmlFile', htmlFile);
        formData.append('targetLanguage', targetLanguage);
        formData.append('customPrompt', customPrompt);

        const response = await axios.post(
          'https://localization-poc.onrender.com/api/translate/html',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setLocalizedContent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch localized content. Please try again.');
        setLoading(false);
      }
    };

    if (location.state) {
      fetchLocalizedContent();
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-700">Localizing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Localized Content</h1>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: localizedContent }}
        />
      </div>
    </div>
  );
};

export default TestApi; 