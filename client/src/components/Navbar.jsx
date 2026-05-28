import React, { useState } from 'react';
import { BookOpen, LogIn, LogOut, Menu, X, Calculator, MessageSquare, GraduationCap } from 'lucide-react';

function Navbar({ user = null, onLoginClick = () => {}, onLogout = () => {} }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      // No specific action, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav style={styles.navContainer}>
      <div style={styles.nav}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => handleNavClick()}>
          <div style={styles.logoIcon}>
            <GraduationCap size={24} color="#6366f1" />
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
              <button onClick={onLogout} style={styles.logoutBtn} title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} style={styles.loginBtn}>
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button className="mobile-only" style={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} style={styles.mobileLogoutBtn}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} style={styles.mobileLoginBtn}>
                <LogIn size={16} />
                <span>Sign In to Student Account</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(6, 11, 19, 0.8)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    maxWidth: "1300px",
    margin: "0 auto",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(99, 102, 241, 0.1)',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    border: '1px solid rgba(99, 102, 241, 0.2)',
  },
  logoText: {
    fontWeight: 800,
    fontSize: "20px",
    fontFamily: "var(--font-heading)",
    letterSpacing: "-0.03em",
    color: "#fff",
  },
  orangeText: {
    color: "#f97316",
    fontWeight: "900",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '15px',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'var(--transition-smooth)',
  },
  navLinkExternal: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontSize: '15px',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '6px 12px',
    transition: 'var(--transition-smooth)',
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
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '8px 16px',
    borderRadius: '10px',
    color: '#fff',
    fontFamily: 'var(--font-heading)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(99, 102, 241, 0.08)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    padding: '6px 14px',
    borderRadius: '12px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
  },
  userReg: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '6px',
    transition: 'var(--transition-smooth)',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#090f1e',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    gap: '12px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
  },
  mobileLink: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '16px',
    textAlign: 'left',
    padding: '10px 12px',
    borderRadius: '8px',
    width: '100%',
    cursor: 'pointer',
  },
  mobileLinkExternal: {
    color: 'var(--text-secondary)',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 12px',
  },
  mobileUserArea: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
    fontWeight: '600',
    color: '#fff',
  },
  mobileUserReg: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  mobileLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    color: 'var(--danger)',
    padding: '10px',
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
    background: 'var(--primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    padding: '10px',
    width: '100%',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
  }
};

export default Navbar;