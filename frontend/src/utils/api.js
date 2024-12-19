const API_BASE_URL = "http://127.0.0.1:9005";


// Mock data for development
const mockDocuments = [
  {
    id: 1,
    title: 'Getting Started with DevOps',
    content: '<h1>Getting Started with DevOps</h1><p>Learn the fundamentals of DevOps practices and tools.</p><h2>What is DevOps?</h2><p>DevOps is a set of practices that combines software development and IT operations.</p>',
    created_at: '2024-12-17T08:00:00Z',
    updated_at: '2024-12-17T08:00:00Z',
    parent_id: null,
    order_index: 0,
    content_type: 'rich_text'
  },
  {
    id: 2,
    title: 'CI/CD Pipeline Setup',
    content: '<h1>CI/CD Pipeline Setup</h1><p>Step-by-step guide to setting up your first CI/CD pipeline.</p><h2>Understanding CI/CD</h2><p>Continuous Integration and Continuous Deployment form the backbone of modern DevOps practices.</p>',
    created_at: '2024-12-17T08:30:00Z',
    updated_at: '2024-12-17T08:30:00Z',
    parent_id: 1,
    order_index: 1,
    content_type: 'rich_text'
  },
  {
    id: 3,
    title: 'Container Orchestration',
    content: '<h1>Container Orchestration with Kubernetes</h1><p>Master container orchestration with Kubernetes.</p><h2>Core Concepts</h2><p>Learn about pods, services, and deployments.</p>',
    created_at: '2024-12-17T09:00:00Z',
    updated_at: '2024-12-17T09:00:00Z',
    parent_id: null,
    order_index: 2,
    content_type: 'rich_text'
  }
];

// Mock implementation of login
export const login = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    access_token: 'mock_token_12345',
    token_type: 'bearer'
  };
};

// Mock implementation of getDocuments
export const getDocuments = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockDocuments;
};

// Mock implementation of getDocument
export const getDocument = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  const doc = mockDocuments.find(d => d.id === parseInt(id));
  if (!doc) throw new Error('Document not found');
  return doc;
};

// Mock implementation of createDocument
export const createDocument = async (document) => {
  // Validate required fields
  if (!document.title) {
    throw new Error('Title is required');
  }
  if (!document.content) {
    throw new Error('Content is required');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // Generate a new unique ID
    const newId = Math.max(...mockDocuments.map(d => d.id), 0) + 1;
    
    // Create new document with timestamps and defaults
    const newDoc = {
      ...document,
      id: newId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      content_type: document.content_type || 'rich_text',
      order_index: document.order_index || mockDocuments.length
    };
    
    // Add to mock documents array
    mockDocuments.push(newDoc);
    console.log('Created new document:', newDoc);
    
    return newDoc;
  } catch (error) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
};

// Mock implementation of updateDocument
export const updateDocument = async (id, document) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = mockDocuments.findIndex(d => d.id === id);
  if (index === -1) throw new Error('Document not found');
  
  // Update the document
  mockDocuments[index] = {
    ...mockDocuments[index],
    ...document,
    id, // Ensure ID doesn't change
    updated_at: new Date().toISOString()
  };
  
  return mockDocuments[index];
};
