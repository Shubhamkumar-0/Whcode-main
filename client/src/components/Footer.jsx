import React from 'react';
import { BookOpen, GraduationCap, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { mockCommunityLinks } from '../data/mockData';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        
        {/* Left column - Brand info */}
        <div style={styles.brandCol}>
          <div style={styles.brandTitle}>
            <GraduationCap size={24} color="var(--primary)" />
            <span style={styles.brandText}>WHCode<span style={styles.orangeText}>LPU</span></span>
          </div>
          <p style={styles.brandDesc}>
            A comprehensive, crowd-sourced academic resource sharing portal built by students, for students of Lovely Professional University (LPU).
          </p>
          <div style={styles.socials}>
            <a className="footer-social-btn" href={mockCommunityLinks.telegram} target="_blank" rel="noreferrer" style={styles.socialIcon} title="Join Telegram Group">
              <Send size={16} />
              <span>Telegram Group</span>
            </a>
          </div>
        </div>

        {/* Middle column - Portals */}
        <div style={styles.linksCol}>
          <h4 style={styles.colHeader}>Official LPU Portals</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <a className="footer-link-item" href="https://ums.lpu.in/ums" target="_blank" rel="noreferrer" style={styles.link}>
                <span>UMS Login Portal</span>
                <ExternalLink size={12} />
              </a>
            </li>
            <li style={styles.listItem}>
              <a className="footer-link-item" href="https://econnect.lpu.in" target="_blank" rel="noreferrer" style={styles.link}>
                <span>LPU e-Connect</span>
                <ExternalLink size={12} />
              </a>
            </li>
            <li style={styles.listItem}>
              <a className="footer-link-item" href="https://www.lpu.in/current-students/academic-calendar.php" target="_blank" rel="noreferrer" style={styles.link}>
                <span>Academic Calendars</span>
                <ExternalLink size={12} />
              </a>
            </li>
          </ul>
        </div>

        {/* Right column - Support & Links */}
        <div style={styles.linksCol}>
          <h4 style={styles.colHeader}>Quick Links</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <a className="footer-link-item" href="#semesters-section" style={styles.link}>
                <span>Browse Semesters</span>
              </a>
            </li>
            <li style={styles.listItem}>
              <a className="footer-link-item" href="#calculator-section" style={styles.link}>
                <span>Grade Calculator</span>
              </a>
            </li>
            <li style={styles.listItem}>
              <div style={styles.disclaimerLink}>
                <ShieldCheck size={14} color="var(--accent)" />
                <span style={{ fontSize: '12px' }}>Student Compiled (Unofficial)</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <p>© 2026 WHCode | Designed for LPU Academic Excellence</p>
        <p style={styles.note}>Disclaimer: This portal is not officially affiliated with Lovely Professional University.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#040810',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '60px 24px 20px 24px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-body)',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto 40px auto',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr',
    gap: '40px',
    textAlign: 'left',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '30px',
    }
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  brandTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandText: {
    fontWeight: 800,
    fontSize: '20px',
    color: '#fff',
    fontFamily: 'var(--font-heading)',
  },
  orangeText: {
    color: '#f97316',
  },
  brandDesc: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    maxWidth: '380px',
  },
  socials: {
    display: 'flex',
    gap: '10px',
  },
  socialIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    padding: '8px 16px',
    borderRadius: '8px',
    color: 'var(--primary)',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'var(--transition-smooth)',
    ':hover': {
      background: 'rgba(99, 102, 241, 0.2)',
      transform: 'translateY(-1px)',
    }
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  colHeader: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  listItem: {
    display: 'flex',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    transition: 'var(--transition-smooth)',
    ':hover': {
      color: '#fff',
    }
  },
  disclaimerLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--text-muted)',
  },
  bottomBar: {
    maxWidth: '1200px',
    margin: '0 auto',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '13px',
    textAlign: 'center',
  },
  note: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  }
};

export default Footer;