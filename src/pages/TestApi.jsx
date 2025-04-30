import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FroalaEditor from 'react-froala-wysiwyg';
// Import Froala Editor CSS files
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

// Language display names mapping
const languageNames = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  hi: 'Hindi'
};

const TestApi = () => {
  const location = useLocation();
  const [localizedContent, setLocalizedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  // Froala Editor configuration
  const editorConfig = {
    key: 'YOUR_FROALA_KEY', 
    attribution: false,
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting'],
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'lineHeight', 'outdent', 'indent'],
      },
      moreRich: {
        buttons: ['insertLink', 'insertImage', 'insertTable', 'specialCharacters', 'insertHR'],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'html'],
        align: 'right',
      }
    },
    htmlAllowedTags: ['.*'],
    htmlAllowedAttrs: ['.*'],
    htmlRemoveTags: ['script'],
    pastePlain: false,
    useClasses: false
  };

  useEffect(() => {
    const fetchLocalizedContent = async () => {
      try {
        const { htmlFile, targetLanguage: lang, customPrompt } = location.state;
        setTargetLanguage(lang);
        
        const formData = new FormData();
        formData.append('htmlFile', htmlFile);
        formData.append('targetLanguage', lang);
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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleEditorChange = (content) => {
    setLocalizedContent(content);
  };

  const handleContentClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleDownload = () => {
    // Create a blob with the HTML content
    const blob = new Blob([localizedContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `localized_content_${targetLanguage}.html`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Localized Content</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Translated to:</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {languageNames[targetLanguage] || targetLanguage}
              </span>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download HTML
            </button>
          </div>
        </div>
        <div className="prose max-w-none" ref={editorRef}>
          {isEditing ? (
            <FroalaEditor
              tag="textarea"
              model={localizedContent}
              onModelChange={handleEditorChange}
              config={editorConfig}
            />
          ) : (
            <div 
              className="min-h-[200px] p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleContentClick}
              dangerouslySetInnerHTML={{ __html: localizedContent }}
            >
            </div>
          )}
        </div>
        {!isEditing && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Click on the content to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApi; 