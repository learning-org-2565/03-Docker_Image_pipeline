import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CourseContent() {
  const [modules, setModules] = useState([]); // State for course modules
  const [activeModule, setActiveModule] = useState(null);
  const { courseLevel } = useParams();

  // Fetch modules from the backend API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://127.0.0.1:9005/modules'); // Backend endpoint
        if (!response.ok) throw new Error('Failed to fetch modules');
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };
    fetchModules();
  }, []);

  const handleModuleClick = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  return (
    <div className="course-content">
      <div className="content-sidebar">
        <div className="course-header">
          <h2>Course content</h2>
          <button className="close-btn">×</button>
        </div>
        <div className="modules-list">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`module-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => handleModuleClick(module.id)}
            >
              <div className="module-header">
                <span className="module-number">{module.id}</span>
                <div className="module-info">
                  <h3>{module.title}</h3>
                  <div className="module-meta">
                    <span>{module.lessons}</span>
                    <span>|</span>
                    <span>{module.duration}</span>
                  </div>
                </div>
                <span className="expand-icon">{activeModule === module.id ? '▼' : '▶'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="content-main">
        {activeModule ? (
          <div className="module-content">
            <img
              src={modules.find((m) => m.id === activeModule)?.image_url}
              alt="Module Illustration"
              style={{ maxWidth: '100%', marginBottom: '20px' }}
            />
            <div
              className="rich-content"
              dangerouslySetInnerHTML={{
                __html: modules.find((m) => m.id === activeModule)?.content,
              }}
            />
          </div>
        ) : (
          <div className="content-placeholder">
            <h2>Select a module to start learning</h2>
            <p>Click on any module from the sidebar to view its content</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseContent;
