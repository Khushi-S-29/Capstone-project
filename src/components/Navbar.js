import { useEffect, useRef, useState } from 'react';

export default function Navbar({ pageProgress, isAltMode, onToggleMode, onOpenAuth, user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleModeClick = () => {
    onToggleMode();
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    onOpenAuth();
    setIsMenuOpen(false);
  };

  return (
    <header className="nav-wrap">
      <div className="page-progress" aria-hidden="true">
        <span style={{ width: `${pageProgress}%` }} />
      </div>
      <nav className="nav">
        <div className="nav-left">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              Rs
            </span>
            <span className="brand-text">FutureForge</span>
          </a>
        </div>

        <div className="nav-center" aria-hidden="true">
          <span className="nav-pill">
            <span className="nav-pulse" />
            Decision Engine Live
          </span>
        </div>

        <div className="nav-actions" ref={menuRef}>
          <button
            className={`nav-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
          >
            <span className="line line-a" />
            <span className="line line-b" />
            <span className="line line-c" />
          </button>

          {isMenuOpen ? (
            <div className="nav-menu-dropdown" role="menu">
              <button className="menu-item menu-item-mode" onClick={handleModeClick} role="menuitem">
                <span className="menu-item-glyph" aria-hidden="true">
                  M
                </span>
                <span className="menu-item-content">
                  <span className="menu-item-title">
                    {isAltMode ? 'Switch to Cool Mode' : 'Switch to Warm Mode'}
                  </span>
                  <span className="menu-item-sub">Change header and page tone</span>
                </span>
              </button>
              <button className="menu-item menu-item-profile" onClick={handleProfileClick} role="menuitem">
                <span className="menu-item-glyph" aria-hidden="true">
                  P
                </span>
                <span className="menu-item-content">
                  <span className="menu-item-title">{user ? 'My Profile' : 'Profile'}</span>
                  <span className="menu-item-sub">{user ? 'View your account' : 'Login / Signup'}</span>
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
