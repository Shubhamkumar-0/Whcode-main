import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { coursesData } from '../data/mockData';

function Hero({ onSelectCourse }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter courses based on query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = coursesData.filter(course => 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered.slice(0, 5)); // limit to 5 results
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectResult = (course) => {
    onSelectCourse(course);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const popularCourses = [
    { code: "CSE205", name: "Data Structures", id: "cse205" },
    { code: "INT219", name: "Front-end Web Dev", id: "int219" },
    { code: "CSE101", name: "Intro to Programming", id: "cse101" },
    { code: "CSE306", name: "Operating Systems", id: "cse306" }
  ];

  return (
    <div style={styles.heroContainer}>
      <div className="floating-bg-circle circle-primary"></div>
      
      <div style={styles.content}>
        {/* LPU Tag */}
        <div style={styles.tag}>
          <Sparkles size={14} color="#f97316" />
          <span>Academic Portal for LPU Students</span>
        </div>

        {/* Hero Title */}
        <h1 style={styles.title}>
          Ace Your LPU Exams <br />
          With <span style={styles.gradientText}>WHCode Resources</span>
        </h1>
        
        <p style={styles.subtitle}>
          Get direct access to unit-wise study notes, previous year question papers (PYQs), 
          interactive self-assessment MCQs, and curated video lectures.
        </p>

        {/* Search Engine */}
        <div style={styles.searchWrapper} ref={dropdownRef}>
          <div className="search-input-wrapper" style={styles.searchBar}>
            <Search size={22} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search subject code or name (e.g. CSE205, Web Dev...)" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              style={styles.searchInput}
            />
          </div>

          {/* Search Dropdown Results */}
          {showDropdown && results.length > 0 && (
            <div style={styles.dropdown}>
              {results.map(course => (
                <div 
                  key={course.id} 
                  className="search-dropdown-item"
                  style={styles.dropdownItem}
                  onClick={() => handleSelectResult(course)}
                >
                  <div style={styles.resultInfo}>
                    <span style={styles.resultCode}>{course.code}</span>
                    <span style={styles.resultName}>{course.name}</span>
                  </div>
                  <div style={styles.resultMeta}>
                    <span style={styles.resultSem}>Sem {course.semester}</span>
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {showDropdown && searchQuery.trim() !== '' && results.length === 0 && (
            <div style={styles.dropdownNoResults}>
              No courses match "{searchQuery}". Try searching "CSE" or "MTH".
            </div>
          )}
        </div>

        {/* Popular Tags */}
        <div style={styles.popularContainer}>
          <span style={styles.popularLabel}>Popular subjects:</span>
          <div style={styles.popularList}>
            {popularCourses.map(pop => {
              const fullCourse = coursesData.find(c => c.id === pop.id);
              return (
                <button 
                  key={pop.id} 
                  className="pop-badge-item"
                  style={styles.popBadge}
                  onClick={() => fullCourse && onSelectCourse(fullCourse)}
                >
                  {pop.code}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heroContainer: {
    position: 'relative',
    padding: '70px 24px 50px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    maxWidth: '800px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fff7ed',
    border: '1px solid #ffedd5',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#ff6b00',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(255, 107, 0, 0.1)',
  },
  title: {
    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
    lineHeight: '1.15',
    color: '#0f172a',
    marginBottom: '18px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '800',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '32px',
    maxWidth: '650px',
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '24px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    padding: '4px 18px',
    transition: 'var(--transition-smooth)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
  },
  searchIcon: {
    color: '#94a3b8',
    marginRight: '12px',
  },
  searchInput: {
    width: '100%',
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#0f172a',
    fontSize: '16px',
    padding: '14px 0',
    fontFamily: 'var(--font-body)',
  },
  dropdown: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    zIndex: 10,
    overflow: 'hidden',
    textAlign: 'left',
    animation: 'fadeIn 0.2s ease-out',
  },
  dropdownItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  resultInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  resultCode: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ff6b00',
  },
  resultName: {
    fontSize: '15px',
    color: '#0f172a',
    fontWeight: '500',
  },
  resultMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  resultSem: {
    fontSize: '12px',
    background: '#f1f5f9',
    color: '#475569',
    padding: '3px 8px',
    borderRadius: '6px',
    fontWeight: '600',
  },
  dropdownNoResults: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    zIndex: 10,
    padding: '16px',
    color: '#64748b',
    fontSize: '14px',
  },
  popularContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  popularLabel: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
  },
  popularList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  popBadge: {
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#334155',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
  }
};

// Add standard inline hovering overrides for list items in code, 
// using mouse enter/leave hooks is standard and highly reliable.
export default function HeroWithHover(props) {
  return <Hero {...props} />;
}