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
    padding: "80px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(99, 102, 241, 0.08)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--primary)',
    marginBottom: '16px',
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#fff",
  },
  subtitle: {
    fontSize: "16px",
    color: "var(--text-secondary)",
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
    background: "rgba(11, 19, 43, 0.3)",
    overflow: "hidden",
    alignSelf: "start",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid transparent",
    paddingBottom: "12px",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
  },
  semNumber: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
  },
  courseCount: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    marginTop: "2px",
  },
  toggleBtn: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-secondary)",
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
    background: "rgba(99, 102, 241, 0.08)",
    color: "var(--primary)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    padding: "4px 10px",
    borderRadius: "6px",
    fontWeight: "600",
  },
  emptyBadge: {
    fontSize: "12px",
    color: "var(--text-muted)",
    fontStyle: "italic",
  },
  expandedContent: {
    marginTop: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "16px",
    animation: "fadeIn 0.3s ease-out",
  },
  courseList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  courseRow: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
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
    color: "var(--primary)",
    background: "rgba(99, 102, 241, 0.1)",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  rowName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#fff",
  },
  rowSyllabus: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    lineHeight: "1.4",
  },
  rowAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
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
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0.04)",
    color: "var(--text-muted)",
  },
  exploreBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(99, 102, 241, 0.1)",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    color: "var(--primary)",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },
  emptyMsg: {
    textAlign: "center",
    padding: "20px 0",
    color: "var(--text-secondary)",
    fontSize: "13px",
  },
  suggestBtn: {
    marginTop: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer",
  }
};

export default Semesters;