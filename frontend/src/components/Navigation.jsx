import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/">DevLoveOps</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/internships">Internships</Link>
        <Link to="/resourceoptimization">ResourceOptimization</Link>
        <Link to="/apply">Apply</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/admin/login" className="sign-in-btn">
          <i className="fas fa-lock"></i> Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
