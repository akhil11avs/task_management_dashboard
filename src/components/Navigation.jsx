import { useState, useEffect } from 'react';

export default function Navigation({ currentRoute, onNavigate }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // const toggleTheme = () => {
  //   setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  // };

  return (
    <nav className="sidebar">
      <div>
        <div className="logo-container">
          <div className="logo-icon">✓</div>
          <div className="logo-text">TaskSphere</div>

          {/* Mobile Theme Toggle */}
          {/* <button
            className="theme-toggle-btn mobile-theme-toggle"
            onClick={toggleTheme}
            style={{ display: 'none', width: 'auto', padding: '0.5rem 0.75rem' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button> */}
        </div>

        <div className="nav-links">
          <a
            className={`nav-item ${currentRoute === '/' ? 'active' : ''}`}
            onClick={() => onNavigate('/')}
          >
            <span className="nav-icon">📊</span>
            <span>All Tasks</span>
          </a>
          <a
            className={`nav-item ${currentRoute === '/completed' ? 'active' : ''}`}
            onClick={() => onNavigate('/completed')}
          >
            <span className="nav-icon">✓</span>
            <span>Completed Tasks</span>
          </a>
        </div>
      </div>

      {/* <div className="sidebar-footer">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
        </button>
      </div> */}
    </nav>
  );
}
