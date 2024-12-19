import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocument, getDocuments } from '../utils/api';

function DocumentView() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDocuments();
    if (id) {
      loadDocument(id);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const loadDocument = async (docId) => {
    try {
      setIsLoading(true);
      setError(null);
      const doc = await getDocument(docId);
      setDocument(doc);
    } catch (error) {
      console.error('Failed to load document:', error);
      setError('Failed to load the document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDocuments = async () => {
    try {
      setError(null);
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
      setError('Failed to load the documentation structure. Please refresh the page.');
    }
  };

  const renderDocumentTree = (docs, level = 0) => {
    return (
      <ul className={`doc-tree ${level > 0 ? 'nested-docs' : ''}`}>
        {docs.map(doc => (
          <li 
            key={doc.id} 
            className={`doc-item ${document?.id === doc.id ? 'active' : ''}`}
            style={{ paddingLeft: `${level * 1.5}rem` }}
          >
            <Link to={`/docs/${doc.id}`} className="doc-link">
              <i className={`fas ${doc.children?.length ? 'fa-folder' : 'fa-file-alt'} doc-icon`}></i>
              <span className="doc-title">{doc.title}</span>
            </Link>
            {doc.children?.length > 0 && renderDocumentTree(doc.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle error-icon"></i>
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          <i className="fas fa-redo"></i> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="document-view">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>
            <i className="fas fa-book"></i>
            Documentation
          </h3>
          <button onClick={loadDocuments} className="refresh-button" title="Refresh documentation">
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
        <div className="sidebar-content">
          {renderDocumentTree(documents)}
        </div>
      </div>
      
      <div className="content">
        {isLoading ? (
          <div className="loading-state">
            <i className="fas fa-circle-notch fa-spin"></i>
            <p>Loading...</p>
          </div>
        ) : document ? (
          <div className="document-container">
            <header className="document-header">
              <h1>{document.title}</h1>
              <div className="document-meta">
                <span className="updated-at">
                  <i className="fas fa-clock"></i>
                  Last updated: {new Date(document.updated_at).toLocaleDateString()}
                </span>
              </div>
            </header>
            <div 
              className="document-content prose"
              dangerouslySetInnerHTML={{ __html: document.content }}
            />
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-book-open empty-icon"></i>
            <p>Select a document from the sidebar to start reading</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentView;
