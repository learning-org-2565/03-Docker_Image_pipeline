import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddModuleModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [lessons, setLessons] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const newModule = { title, duration, lessons, content };
    onSave(newModule); // Send new module data to parent
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Module</h2>
        <input
          type="text"
          placeholder="Module Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 1hr)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="text"
          placeholder="Number of Lessons"
          value={lessons}
          onChange={(e) => setLessons(e.target.value)}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Add module content here..."
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        />
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">
            Save Module
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModuleModal;
