import React, { useState } from 'react';
import { BookOpen, GraduationCap, ChevronDown, ChevronUp, FileText, Play, HelpCircle, ArrowRight } from 'lucide-react';
import { coursesData } from '../data/mockData';

function Semesters({ onSelectCourse }) {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [expandedSem, setExpandedSem] = useState(null);

  const toggleExpandSemester = (semNum) => {
    if (expandedSem === semNum) {
      setExpandedSem(null);
    } else {
      setExpandedSem(semNum);
    }
  };

  // Get courses matching specific semester
  const getCoursesForSem = (semNum) => {
    return coursesData.filter(course => course.semester === semNum);
  };

  return (
    <div id="semesters-section" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.badge}>
          <GraduationCap size={16} color="var(--primary)" />
          <span>Curriculum Directory</span>
        </div>
        <h2 style={styles.title}>Browse By Semesters</h2>
        <p style={styles.subtitle}>
          Select a semester to view standard LPU courses, syllabi, notes, past papers, and mock exams.
        </p>
      </div>

      <div style={styles.grid}>
        {semesters.map((sem) => {
          const semCourses = getCoursesForSem(sem);
          const isExpanded = expandedSem === sem;

          return (
            <div 
              key={sem} 
              className={`semester-card-item glass-panel ${isExpanded ? 'expanded-sem' : ''}`}
              style={{
                ...styles.card,
                height: isExpanded ? 'auto' : '190px'
              }}
            >
              {/* Card Header Info */}
              <div 
                style={styles.cardHeader}
                onClick={() => toggleExpandSemester(sem)}
              >
                <div style={styles.headerText}>
                  <div style={styles.semNumber}>Semester {sem}</div>
                  <div style={styles.courseCount}>
                    {semCourses.length} {semCourses.length === 1 ? 'subject' : 'subjects'} loaded
                  </div>
                </div>
                <button style={styles.toggleBtn}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Quick Course Badges (Visible when collapsed) */}
              {!isExpanded && (
                <div style={styles.badgeContainer}>
                  {semCourses.length > 0 ? (
                    semCourses.map(course => (
                      <span key={course.id} style={styles.subBadge}>
                        {course.code}
                      </span>
                    ))
                  ) : (
                    <span style={styles.emptyBadge}>Elective focus semester</span>
                  )}
                </div>
              )}

              {/* Explorable Subjects List (Visible when expanded) */}
              {isExpanded && (
                <div style={styles.expandedContent}>
                  {semCourses.length > 0 ? (
                    <div style={styles.courseList}>
                      {semCourses.map(course => (
                        <div 
                          key={course.id} 
                          className="semester-course-row"
                          style={styles.courseRow}
                          onClick={() => onSelectCourse(course)}
                        >
                          <div style={styles.rowInfo}>
                            <div style={styles.rowMain}>
                              <span style={styles.rowCode}>{course.code}</span>
                              <span style={styles.rowName}>{course.name}</span>
                            </div>
                            <p style={styles.rowSyllabus}>
                              {course.syllabus.slice(0, 100)}...
                            </p>
                          </div>
                          <div style={styles.rowAction}>
                            <div style={styles.resourceBadges}>
                              <span title="Notes Available" style={styles.resIcon}><BookOpen size={13} /></span>
                              <span title="PYQs Available" style={styles.resIcon}><FileText size={13} /></span>
                              <span title="Quizzes Available" style={styles.resIcon}><HelpCircle size={13} /></span>
                              <span title="Videos Available" style={styles.resIcon}><Play size={13} /></span>
                            </div>
                            <button style={styles.exploreBtn}>
                              <span>Study</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={styles.emptyMsg}>
                      <p>Syllabus & notes are being compiled. Standard electives apply.</p>
                      <button 
                        style={styles.suggestBtn}
                        onClick={() => alert("Thanks for voting! We will prioritize notes for Semester " + sem + ".")}
                      >
                        Request Notes Priority
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fff7ed',
    border: '1px solid #ffedd5',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#ff6b00',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(255, 107, 0, 0.1)',
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#0f172a",
    fontFamily: "var(--font-heading)",
  },
  subtitle: {
    fontSize: "16px",
    color: "#475569",
    maxWidth: "600px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
    overflow: "hidden",
    alignSelf: "start",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid transparent",
    paddingBottom: "8px",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
  },
  semNumber: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
    fontFamily: "var(--font-heading)",
  },
  courseCount: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "2px",
    fontWeight: "500",
  },
  toggleBtn: {
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#334155",
    cursor: "pointer",
  },
  badgeContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
  },
  subBadge: {
    fontSize: "12px",
    background: "#fff7ed",
    color: "#ff6b00",
    border: "1px solid #ffedd5",
    padding: "4px 10px",
    borderRadius: "6px",
    fontWeight: "700",
  },
  emptyBadge: {
    fontSize: "12px",
    color: "#94a3b8",
    fontStyle: "italic",
  },
  expandedContent: {
    marginTop: "16px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "16px",
    animation: "fadeIn 0.3s ease-out",
  },
  courseList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  courseRow: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  rowInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  rowMain: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  rowCode: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#ff6b00",
    background: "#fff7ed",
    border: "1px solid #ffedd5",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  rowName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0f172a",
  },
  rowSyllabus: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: "1.4",
  },
  rowAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "10px",
  },
  resourceBadges: {
    display: "flex",
    gap: "6px",
  },
  resIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    background: "#e2e8f0",
    color: "#475569",
  },
  exploreBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#0284c7",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(2, 132, 199, 0.25)",
  },
  emptyMsg: {
    textAlign: "center",
    padding: "20px 0",
    color: "#64748b",
    fontSize: "13px",
  },
  suggestBtn: {
    marginTop: "12px",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    color: "#0f172a",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  }
};

export default Semesters;