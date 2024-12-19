import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({
    title: '',
    duration: '',
    lessons: '',
    content: '',
    image_url: ''
  });

  // Fetch modules from the backend
  const fetchModules = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:9005/modules');
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  // Add new module
  const addModule = async () => {
    try {
      await axios.post('http://127.0.0.1:9005/modules', newModule);
      alert('Module added successfully');
      fetchModules(); // Refresh modules list
    } catch (error) {
      console.error('Error adding module:', error);
    }
  };

  // Delete a module
  const deleteModule = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:9005/modules/${id}`);
      alert('Module deleted successfully');
      fetchModules();
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  useEffect(() => {
    fetchModules(); // Fetch modules on component mount
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add New Module */}
      <div>
        <h2>Add New Module</h2>
        <input
          type="text"
          placeholder="Title"
          value={newModule.title}
          onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          value={newModule.duration}
          onChange={(e) => setNewModule({ ...newModule, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lessons"
          value={newModule.lessons}
          onChange={(e) => setNewModule({ ...newModule, lessons: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newModule.image_url}
          onChange={(e) => setNewModule({ ...newModule, image_url: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newModule.content}
          onChange={(e) => setNewModule({ ...newModule, content: e.target.value })}
        />
        <button onClick={addModule}>Add Module</button>
      </div>

      {/* List of Modules */}
      <div>
        <h2>Existing Modules</h2>
        <ul>
          {modules.map((module) => (
            <li key={module.id}>
              <strong>{module.title}</strong> - {module.duration} ({module.lessons} Lessons)
              <button onClick={() => deleteModule(module.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
