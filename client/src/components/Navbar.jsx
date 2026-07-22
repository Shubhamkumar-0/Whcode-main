import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GraduationCap, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavClick = (action = null) => {
    setMobileMenuOpen(false);
    if (action) {
      setTimeout(() => {
        const element = document.getElementById(action);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top UMS Announcement Bar */}
      <div style={styles.topBanner}>
        <span>📢 Welcome to WHCode LPU Portal • Quick Access to UMS, CGPA Calculator & Course Notes</span>
      </div>

      <nav style={styles.navContainer}>
        <div style={styles.nav}>
          {/* Logo */}
          <div style={styles.logo} onClick={() => handleNavClick()}>
            <div style={styles.logoIcon}>
              <GraduationCap size={24} color="#ff6b00" />
            </div>
            <span style={styles.logoText}>WHCode<span style={styles.orangeText}>LPU</span></span>
          </div>

          {/* Desktop Links */}
          <div className="desktop-only" style={styles.links}>
            <button 
              style={styles.navLink} 
              onClick={() => handleNavClick()}
            >
              Home
            </button>
            <button 
              style={styles.navLink} 
              onClick={() => handleNavClick('semesters-section')}
            >
              Semesters
            </button>
            <button 
              style={styles.navLink} 
              onClick={() => handleNavClick('calculator-section')}
            >
              CGPA Calc
            </button>
            <a 
              href="https://ums.lpu.in/lpuums/"
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.navLinkExternal}
            >
              UMS Portal ↗
            </a>
          </div>

          {/* User profile / Login */}
          <div style={styles.userSection}>
            {user ? (
              <div style={styles.profileContainer}>
                <div className="desktop-only" style={styles.userInfo}>
                  <span style={styles.userName}>{user.name}</span>
                  <span style={styles.userReg}>{user.regNo}</span>
                </div>
                <button onClick={() => { logout(); navigate('/'); }} style={styles.logoutBtn} title="Sign Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} style={styles.loginBtn}>
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button className="mobile-only" style={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} color="#1f2937" /> : <Menu size={24} color="#1f2937" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <button 
              style={styles.mobileLink} 
              onClick={() => handleNavClick()}
            >
              Home
            </button>
            <button 
              style={styles.mobileLink} 
              onClick={() => handleNavClick('semesters-section')}
            >
              Semesters
            </button>
            <button 
              style={styles.mobileLink} 
              onClick={() => handleNavClick('calculator-section')}
            >
              CGPA Calculator
            </button>
            <a 
              href="https://ums.lpu.in/lpuums/" 
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mobileLinkExternal}
            >
              UMS Portal ↗
            </a>
            
            <div style={styles.mobileUserArea}>
              {user ? (
                <div style={styles.mobileProfile}>
                  <div style={styles.mobileProfileDetails}>
                    <div style={styles.mobileUserName}>{user.name}</div>
                    <div style={styles.mobileUserReg}>{user.regNo} • {user.branch}</div>
                  </div>
                  <button onClick={() => { logout(); navigate('/'); setMobileMenuOpen(false); }} style={styles.mobileLogoutBtn}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} style={styles.mobileLoginBtn}>
                  <LogIn size={16} />
                  <span>Sign In to Student Account</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

const styles = {
  topBanner: {
    background: 'linear-gradient(90deg, #fed7aa 0%, #fde68a 100%)',
    color: '#9a3412',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center',
    padding: '7px 16px',
    borderBottom: '1px solid #fbd5a5',
  },
  navContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: '#ffffff',
    borderBottom: '2px solid #e5e7eb',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff7ed',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #ffedd5',
    boxShadow: '0 2px 5px rgba(255, 107, 0, 0.15)',
  },
  logoText: {
    fontWeight: 800,
    fontSize: '22px',
    letterSpacing: '-0.02em',
    color: '#111827',
  },
  orangeText: {
    color: '#ff6b00',
    fontWeight: '900',
    marginLeft: '2px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  navLink: {
    background: 'transparent',
    border: 'none',
    color: '#374151',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 14px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  navLinkExternal: {
    textDecoration: 'none',
    color: '#ffffff',
    background: '#0284c7',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
    transition: 'all 0.2s ease',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ff6b00',
    border: 'none',
    padding: '9px 20px',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(255, 107, 0, 0.3)',
    transition: 'all 0.2s ease',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#fff7ed',
    border: '1px solid #ffedd5',
    padding: '6px 14px',
    borderRadius: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827',
  },
  userReg: {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: '500',
  },
  logoutBtn: {
    background: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  mobileToggle: {
    display: 'none',
    background: '#f3f4f6',
    border: '1px solid #e5e7eb',
    color: '#111827',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#ffffff',
    borderBottom: '2px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 24px',
    gap: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  mobileLink: {
    background: '#f9fafb',
    border: '1px solid #f3f4f6',
    color: '#1f2937',
    fontSize: '15px',
    fontWeight: 600,
    textAlign: 'left',
    padding: '12px 16px',
    borderRadius: '10px',
    width: '100%',
    cursor: 'pointer',
  },
  mobileLinkExternal: {
    color: '#ffffff',
    background: '#0284c7',
    fontSize: '15px',
    fontWeight: 600,
    textDecoration: 'none',
    padding: '12px 16px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  mobileUserArea: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px',
    marginTop: '8px',
  },
  mobileProfile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  mobileProfileDetails: {
    textAlign: 'left',
  },
  mobileUserName: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111827',
  },
  mobileUserReg: {
    fontSize: '13px',
    color: '#6b7280',
  },
  mobileLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#dc2626',
    padding: '12px',
    width: '100%',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
  },
  mobileLoginBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#ff6b00',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    padding: '12px',
    width: '100%',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    boxShadow: '0 3px 10px rgba(255, 107, 0, 0.3)',
  }
};

export default Navbar;