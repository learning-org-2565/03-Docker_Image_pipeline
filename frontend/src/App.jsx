import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import CourseContent from './components/CourseContent';
import Navigation from './components/Navigation';
import AdminLogin from './components/AdminLogin';
import DocumentView from './components/DocumentView';
import InternshipPath from './components/InternshipPath';



import './styles/main.css';

// Home Page Component
const HomePage = () => (
  <div className="home-page">
    <section className="hero-section">
      <div className="hero-content">
        <h1>DevOps Research Platform</h1>
        <p>
          Access comprehensive DevOps documentation, collaborate with your team, 
          and streamline your knowledge management process.
        </p>
        <div className="hero-buttons">
          <a href="/docs" className="primary-btn">Why DevOps</a>
          <a href="/admin/login" className="secondary-btn">Admin Login</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-image-placeholder">
          <i className="fas fa-layer-group"></i>
        </div>
      </div>
    </section>
  </div>
);

// Authentication Context
export const AuthContext = React.createContext(null);

// Authentication Provider
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const login = () => {
    localStorage.setItem('isAdmin', 'true');
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  const value = React.useMemo(
    () => ({ isAdmin, login, logout }),
    [isAdmin]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = React.useContext(AuthContext);
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/internships" element={<InternshipPath />} />
              <Route path="/docs" element={<DocumentView />} />
              <Route path="/docs/:id" element={<DocumentView />} />
              <Route path="/course/:courseLevel" element={<CourseContent />} />

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
