import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from 'react-icons/fa';

function InternshipPath() {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth?.isAdmin === true;
  const { logout } = auth;
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [paths, setPaths] = useState([
    {
      id: 1,
      level: 'Basic',
      icon: '⚡',
      description: 'Learn the fundamentals of DevOps practices and tools',
      modules: [
        {
          id: 1,
          title: 'Introduction to Git & GitHub Actions',
          content: '<h2>Introduction to Git</h2><p>Learn the basics of version control...</p>',
        },
        {
          id: 2,
          title: 'Basic Docker containerization',
          content: '<h2>Docker Fundamentals</h2><p>Understanding containers...</p>',
        }
      ],
      price: '$299'
    },
    {
      id: 2,
      level: 'Intermediate',
      icon: '📦',
      description: 'Advance your DevOps skills with real-world applications',
      modules: [
        {
          id: 3,
          title: 'Infrastructure as Code',
          content: '<h2>Infrastructure as Code</h2><p>Learn Terraform basics...</p>',
        },
        {
          id: 4,
          title: 'Advanced Docker',
          content: '<h2>Advanced Docker</h2><p>Master container orchestration...</p>',
        }
      ],
      price: '$499'
    },
    {
      id: 3,
      level: 'Advanced',
      icon: '⚙️',
      description: 'Master complex DevOps scenarios and architectures',
      modules: [
        {
          id: 5,
          title: 'Kubernetes Management',
          content: '<h2>Kubernetes</h2><p>Deploy and manage clusters...</p>',
        },
        {
          id: 6,
          title: 'Security Practices',
          content: '<h2>Security</h2><p>Implement security best practices...</p>',
        }
      ],
      price: '$799'
    }
  ]);

  // Clear editing state when admin logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setEditingModule(null);
      setHasUnsavedChanges(false);
    }
  }, [isAuthenticated]);

  // Prevent accidental navigation when there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to logout?');
      if (!confirmed) return;
    }
    logout();
    setEditingModule(null);
    setHasUnsavedChanges(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/');
    }, 2000);
  };

  const handleModuleEdit = (pathId, moduleId) => {
    if (!isAuthenticated) {
      console.warn('Unauthorized edit attempt');
      navigate('/admin/login');
      return;
    }
    const path = paths.find(p => p.id === pathId);
    const module = path.modules.find(m => m.id === moduleId);
    setEditingModule({ ...module, pathId });
    setHasUnsavedChanges(false);
  };

  const handleModuleDelete = (pathId, moduleId) => {
    if (!isAuthenticated) {
      console.log('Unauthorized delete attempt');
      navigate('/admin/login');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this module?');
    if (confirmed) {
      setPaths(paths.map(path => {
        if (path.id === pathId) {
          return {
            ...path,
            modules: path.modules.filter(m => m.id !== moduleId)
          };
        }
        return path;
      }));
    }
  };

  const handleModuleSave = () => {
    if (!isAuthenticated || !editingModule) {
      console.log('Unauthorized save attempt');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to save these changes?');
    if (confirmed) {
      setPaths(paths.map(path => {
        if (path.id === editingModule.pathId) {
          return {
            ...path,
            modules: path.modules.map(m =>
              m.id === editingModule.id ?
                { ...m, title: editingModule.title, content: editingModule.content } :
                m
            )
          };
        }
        return path;
      }));
      setEditingModule(null);
      setHasUnsavedChanges(false);
      const successMessage = document.createElement('div');
      successMessage.className = 'save-success-message';
      successMessage.textContent = 'Changes saved successfully!';
      document.body.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 3000);
    }
  };

  const handleAddModule = (pathId) => {
    if (!isAuthenticated) {
      console.log('Unauthorized add attempt');
      navigate('/admin/login');
      return;
    }

    const newModule = {
      id: Date.now(),
      title: 'New Module',
      content: '<h2>New Module Content</h2><p>Start editing this module...</p>',
    };

    setPaths(paths.map(path => {
      if (path.id === pathId) {
        return {
          ...path,
          modules: [...path.modules, newModule]
        };
      }
      return path;
    }));
  };

  return (
    <div className="internship-container">
      {showSuccessMessage && (
        <div className="logout-success-message">
          Successfully logged out!
        </div>
      )}

      <div className="internship-header">
        <div className="header-content">
          <h1>
            Choose Your Path
          </h1>
          <p>Select the internship level that matches your experience and goals.</p>
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout Admin
          </button>
        )}
      </div>

      <div className="paths-container">
        {paths.map((path) => (
          <div key={path.id} className="path-card">
            <div className="path-header">
              <span className="path-icon">{path.icon}</span>
              <h2>{path.level}</h2>
              <p>{path.description}</p>
            </div>
            <div className="path-modules">
              {path.modules.map((module) => (
                <div key={module.id} className="module-item">
                  <h3>{module.title}</h3>
                  {isAuthenticated && (
                    <div className="admin-controls">
                      <button
                        onClick={() => handleModuleEdit(path.id, module.id)}
                        className="edit-button"
                        title="Edit Module"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleModuleDelete(path.id, module.id)}
                        className="delete-button"
                        title="Delete Module"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {isAuthenticated && (
                <button 
                  className="add-module-button"
                  onClick={() => handleAddModule(path.id)}
                >
                  <FaPlus /> Add Module
                </button>
              )}
            </div>
            <div className="path-footer">
              <div className="path-price">{path.price}</div>
              <button
                className="join-button"
                onClick={() => navigate(`/course/${path.level.toLowerCase()}`)}
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingModule && isAuthenticated && (
        <div className="module-editor-modal">
          <div className="modal-content">
            <h2>Edit Module</h2>
            <input
              type="text"
              value={editingModule.title}
              onChange={(e) => {
                setEditingModule({ ...editingModule, title: e.target.value });
                setHasUnsavedChanges(true);
              }}
              className="module-title-input"
            />
            <ReactQuill
              value={editingModule.content}
              onChange={(content) => {
                setEditingModule({ ...editingModule, content });
                setHasUnsavedChanges(true);
              }}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
            />
            <div className="modal-actions">
              <button
                onClick={handleModuleSave}
                className="save-button"
                disabled={!hasUnsavedChanges}
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  if (hasUnsavedChanges) {
                    const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
                    if (!confirmed) return;
                  }
                  setEditingModule(null);
                  setHasUnsavedChanges(false);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternshipPath;