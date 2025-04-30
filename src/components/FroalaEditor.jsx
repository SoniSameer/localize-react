import React from 'react';
import PropTypes from 'prop-types';

// Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/third_party/font_awesome.min.js';

// Import Froala Editor React Component
import FroalaEditorComponent from 'react-froala-wysiwyg';

const FroalaEditor = ({ 
  content, 
  onContentChange,
  readOnly = false,
  language = 'de',
  height = 300
}) => {
  // Basic configuration for the editor
  const config = {
    language: language,
    height: height,
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'clearFormatting'],
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'lineHeight'],
      },
      moreRich: {
        buttons: ['insertLink', 'insertTable', 'specialCharacters', 'insertHR'],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'html'],
        align: 'right',
      }
    },
    // Placeholder text
    placeholderText: readOnly ? '' : 'Start editing...',
    // Enable HTML cleaning when pasting
    pastePlain: true,
    // Enable quick insert buttons
    quickInsertButtons: ['table', 'ul', 'ol', 'hr'],
    // Enable table cell styles
    tableCellStyles: {
      'fr-highlighted': 'Highlighted',
      'fr-thick': 'Thick'
    },
    // Enable table editing
    tableEditButtons: ['tableHeader', 'tableRemove', '|', 'tableRows', 'tableColumns'],
    // Enable read-only mode if specified
    readOnly: readOnly,
    // Enable HTML purification
    htmlAllowedTags: ['.*'],
    htmlAllowedAttrs: ['.*'],
    // Enable auto-save
    saveInterval: 10000,
    // Enable character counter
    charCounterCount: true,
    // Enable word counter
    wordCounter: true,
    // Enable responsive mode
    heightMin: 200,
    heightMax: 600,
    // Enable table resize
    tableResizer: true,
    // Enable table cell resize
    tableCellResizer: true,
    // Enable table row drag and drop
    tableResizerOffset: 10,
    // Enable image resize
    imageResize: true,
    // Enable image drag and drop
    imagePaste: true,
    // Enable image upload
    imageUploadURL: false,
    // Enable video resize
    videoResize: true,
    // Enable video upload
    videoUploadURL: false,
    // Enable file upload
    fileUploadURL: false,
    // Events
    events: {
      'contentChanged': function() {
        // Call the parent's callback with new content
        onContentChange?.(this.html.get());
      },
      'focus': function() {
        // Add custom focus handling if needed
      },
      'blur': function() {
        // Add custom blur handling if needed
      }
    }
  };

  return (
    <div className="froala-editor-container">
      <FroalaEditorComponent
        tag="textarea"
        model={content}
        config={config}
      />
      <style jsx>{`
        .froala-editor-container {
          /* Custom styles for the editor container */
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          overflow: hidden;
        }
        
        /* Override Froala's default styles to match your UI */
        :global(.fr-box.fr-basic) {
          border-radius: 0.375rem;
        }
        
        :global(.fr-toolbar) {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          box-shadow: none !important;
        }
        
        :global(.fr-wrapper) {
          border: none !important;
          box-shadow: none !important;
        }
        
        :global(.fr-element) {
          color: #1a202c !important;
          padding: 1rem !important;
        }
        
        /* Style for read-only mode */
        ${readOnly && `
          :global(.fr-box.fr-basic .fr-element) {
            background: #f7fafc;
          }
        `}
      `}</style>
    </div>
  );
};

FroalaEditor.propTypes = {
  content: PropTypes.string,
  onContentChange: PropTypes.func,
  readOnly: PropTypes.bool,
  language: PropTypes.string,
  height: PropTypes.number
};

export default FroalaEditor; 