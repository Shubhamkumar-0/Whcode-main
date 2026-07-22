import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, FileText, HelpCircle, Video, Download, 
  CheckCircle, XCircle, Play, AlertCircle, RefreshCw, ChevronRight, BookOpenCheck
} from 'lucide-react';

function CourseDashboard({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('notes');
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  // MCQ state
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    selectedOption: null,
    isAnswered: false,
    score: 0,
    completed: false
  });

  // Expanded notes state
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [readingContent, setReadingContent] = useState(null); // Shows popup with note details

  // YouTube modal state
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Reset quiz state when course changes
  useEffect(() => {
    resetQuiz();
    setExpandedUnit(null);
    setReadingContent(null);
    setActiveTab('notes');
  }, [course]);

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedOption: null,
      isAnswered: false,
      score: 0,
      completed: false
    });
  };

  const handleDownload = (filename) => {
    if (downloadingFile) return;
    setDownloadingFile(filename);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingFile(null);
            alert(`Successfully downloaded: ${filename}`);
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleOptionClick = (optIdx) => {
    if (quizState.isAnswered) return;
    setQuizState(prev => ({
      ...prev,
      selectedOption: optIdx
    }));
  };

  const handleQuizSubmit = () => {
    if (quizState.selectedOption === null || quizState.isAnswered) return;
    
    const question = course.mcqs[quizState.currentQuestion];
    const isCorrect = quizState.selectedOption === question.answer;

    setQuizState(prev => ({
      ...prev,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleQuizNext = () => {
    const nextQ = quizState.currentQuestion + 1;
    if (nextQ >= course.mcqs.length) {
      setQuizState(prev => ({
        ...prev,
        completed: true
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: nextQ,
        selectedOption: null,
        isAnswered: false
      }));
    }
  };

  const activeTabStyle = (tabName) => ({
    ...styles.tabBtn,
    ...(activeTab === tabName ? styles.activeTabBtn : {})
  });

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Dashboard Header */}
      <div style={styles.header}>
        <button className="dashboard-back-btn" style={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Courses</span>
        </button>
        <div style={styles.titleInfo}>
          <span style={styles.courseCode}>{course.code}</span>
          <h2 style={styles.courseName}>{course.name}</h2>
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Sidebar Panel - Course Details */}
        <div style={styles.sidebar} className="glass-panel">
          <h3 style={styles.sidebarTitle}>Course Details</h3>
          
          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Semester</span>
              <span style={styles.metaValue}>Sem {course.semester}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Credits</span>
              <span style={styles.metaValue}>{course.credits} LPU Credits</span>
            </div>
          </div>

          <div style={styles.syllabusSection}>
            <h4 style={styles.sectionHeader}>Syllabus Overview</h4>
            <p style={styles.syllabusText}>{course.syllabus}</p>
          </div>

          <div style={styles.statList}>
            <div style={styles.statRow}>
              <span style={styles.statDot} />
              <span>{course.notes.length} Study Chapters / Units</span>
            </div>
            <div style={styles.statRow}>
              <span style={styles.statDot} />
              <span>{course.pyqs.length} PYQ Exams uploaded</span>
            </div>
            <div style={styles.statRow}>
              <span style={styles.statDot} />
              <span>{course.mcqs ? course.mcqs.length : 0} Interactive MCQs</span>
            </div>
          </div>
        </div>

        {/* Content Panel - Study Resources Tabs */}
        <div style={styles.contentPanel}>
          {/* Navigation Tabs */}
          <div style={styles.tabsContainer} className="glass-panel">
            <button style={activeTabStyle('notes')} onClick={() => setActiveTab('notes')}>
              <BookOpen size={16} />
              <span>Study Notes</span>
            </button>
            <button style={activeTabStyle('pyqs')} onClick={() => setActiveTab('pyqs')}>
              <FileText size={16} />
              <span>PYQs (Exams)</span>
            </button>
            <button style={activeTabStyle('mcqs')} onClick={() => setActiveTab('mcqs')}>
              <HelpCircle size={16} />
              <span>Practice MCQ Quiz</span>
            </button>
            <button style={activeTabStyle('videos')} onClick={() => setActiveTab('videos')}>
              <Video size={16} />
              <span>Video Lectures</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div style={styles.tabContentArea}>
            
            {/* STUDY NOTES TAB */}
            {activeTab === 'notes' && (
              <div style={styles.notesTab}>
                <div style={styles.tabHeading}>
                  <h3 style={styles.tabTitleText}>Unit-wise Study Notes</h3>
                  <p style={styles.tabSubtitleText}>Expand a unit to read revision summaries or download files.</p>
                </div>

                <div style={styles.unitList}>
                  {course.notes.map((unit) => {
                    const isExpanded = expandedUnit === unit.unit;
                    return (
                      <div 
                        key={unit.unit} 
                        style={styles.unitCard} 
                        className="glass-panel"
                      >
                        <div 
                          style={styles.unitCardHeader}
                          onClick={() => setExpandedUnit(isExpanded ? null : unit.unit)}
                        >
                          <div style={styles.unitCardTitleBlock}>
                            <span style={styles.unitNumber}>U{unit.unit}</span>
                            <div style={styles.unitTitleText}>
                              <h4>{unit.title}</h4>
                              <p style={styles.unitDescText}>{unit.description}</p>
                            </div>
                          </div>
                          <button style={styles.unitToggleBtn}>
                            {isExpanded ? 'Collapse' : 'Expand'}
                          </button>
                        </div>

                        {isExpanded && (
                          <div style={styles.unitExpandedBody}>
                            {unit.content ? (
                              <div style={styles.quickReader}>
                                <h5 style={styles.readerHeading}>
                                  <BookOpenCheck size={14} color="var(--accent)" />
                                  <span>Core revision points:</span>
                                </h5>
                                <ul style={styles.bulletList}>
                                  {unit.content.map((bullet, bIdx) => (
                                    <li key={bIdx} style={styles.bulletItem}>{bullet}</li>
                                  ))}
                                </ul>
                                <div style={styles.readerActions}>
                                  <button 
                                    style={styles.actionBtnPrimary}
                                    onClick={() => setReadingContent(unit)}
                                  >
                                    Open Full Screen Reader
                                  </button>
                                  <button 
                                    style={styles.actionBtnSecondary}
                                    onClick={() => handleDownload(`Unit_${unit.unit}_FullNotes.pdf`)}
                                  >
                                    <Download size={14} />
                                    <span>Download PDF</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div style={styles.noReaderContent}>
                                <p style={styles.noReaderText}>Detailed outline loaded. PDF study notes available for download.</p>
                                <button 
                                  style={styles.actionBtnPrimary}
                                  onClick={() => handleDownload(`Unit_${unit.unit}_FullNotes.pdf`)}
                                >
                                  <Download size={14} />
                                  <span>Download Notes PDF</span>
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
            )}

            {/* PYQ EXAMS TAB */}
            {activeTab === 'pyqs' && (
              <div style={styles.pyqTab}>
                <div style={styles.tabHeading}>
                  <h3 style={styles.tabTitleText}>Previous Year Question Papers</h3>
                  <p style={styles.tabSubtitleText}>Download real midterm and endterm questions to test your preparation.</p>
                </div>

                <div style={styles.pyqGrid}>
                  {course.pyqs.map((pyq, idx) => (
                    <div key={idx} style={styles.pyqCard} className="glass-panel">
                      <div style={styles.pyqHeader}>
                        <FileText size={28} color="var(--primary)" />
                        <span style={styles.pyqYearBadge}>{pyq.year}</span>
                      </div>
                      <h4 style={styles.pyqTitle}>{pyq.type} Exam Paper</h4>
                      <p style={styles.pyqMeta}>Official LPU syllabus structure</p>
                      
                      <button 
                        style={styles.pyqDownloadBtn}
                        onClick={() => handleDownload(pyq.filename)}
                      >
                        <Download size={14} />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRACTICE QUIZ TAB */}
            {activeTab === 'mcqs' && (
              <div style={styles.quizTab}>
                <div style={styles.tabHeading}>
                  <h3 style={styles.tabTitleText}>Interactive Practice Quiz</h3>
                  <p style={styles.tabSubtitleText}>Instant feedback questions aligned with the LPU course outcomes.</p>
                </div>

                {!course.mcqs || course.mcqs.length === 0 ? (
                  <div style={styles.noQuizBlock} className="glass-panel">
                    <AlertCircle size={32} color="var(--text-muted)" />
                    <p>No quiz questions available for this course yet.</p>
                  </div>
                ) : quizState.completed ? (
                  <div style={styles.quizResultBlock} className="glass-panel">
                    <CheckCircle size={48} color="var(--accent)" />
                    <h4 style={styles.resultTitle}>Quiz Completed!</h4>
                    <p style={styles.resultScore}>
                      Your score: <span style={styles.scoreHighlight}>{quizState.score}</span> / {course.mcqs.length}
                    </p>
                    <p style={styles.resultVerdict}>
                      {quizState.score === course.mcqs.length 
                        ? "Perfect score! You are ready to ace your exam." 
                        : quizState.score >= course.mcqs.length / 2 
                        ? "Good job! Review the explanations to get a higher grade." 
                        : "Keep studying. Revision notes will help improve your concepts."}
                    </p>
                    <button style={styles.actionBtnPrimary} onClick={resetQuiz}>
                      <RefreshCw size={14} />
                      <span>Retake Quiz</span>
                    </button>
                  </div>
                ) : (
                  <div style={styles.quizCard} className="glass-panel">
                    {/* Question Header */}
                    <div style={styles.quizProgressHeader}>
                      <span style={styles.quizQuestionNum}>
                        Question {quizState.currentQuestion + 1} of {course.mcqs.length}
                      </span>
                      <span style={styles.quizScoreTrack}>
                        Score: {quizState.score}
                      </span>
                    </div>

                    {/* Question Text */}
                    <h4 style={styles.questionText}>
                      {course.mcqs[quizState.currentQuestion].question}
                    </h4>

                    {/* Options list */}
                    <div style={styles.optionsList}>
                      {course.mcqs[quizState.currentQuestion].options.map((option, idx) => {
                        const isSelected = quizState.selectedOption === idx;
                        const isCorrectAnswer = idx === course.mcqs[quizState.currentQuestion].answer;
                        
                        let optionStyle = { ...styles.optionRow };
                        
                        if (quizState.isAnswered) {
                          if (isCorrectAnswer) {
                            optionStyle = { ...optionStyle, ...styles.optionCorrect };
                          } else if (isSelected) {
                            optionStyle = { ...optionStyle, ...styles.optionIncorrect };
                          }
                        } else if (isSelected) {
                          optionStyle = { ...optionStyle, ...styles.optionSelected };
                        }

                        return (
                          <div 
                            key={idx} 
                            className={`dashboard-option-row ${quizState.isAnswered ? 'answered' : ''}`}
                            style={optionStyle}
                            onClick={() => handleOptionClick(idx)}
                          >
                            <span style={styles.optionLetter}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span style={styles.optionLabelText}>{option}</span>
                            
                            {quizState.isAnswered && isCorrectAnswer && (
                              <CheckCircle size={18} color="var(--accent)" style={styles.optionStatusIcon} />
                            )}
                            {quizState.isAnswered && isSelected && !isCorrectAnswer && (
                              <XCircle size={18} color="var(--danger)" style={styles.optionStatusIcon} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Feedback block */}
                    {quizState.isAnswered && (
                      <div style={styles.explanationBox}>
                        <div style={styles.explanationTitle}>
                          <AlertCircle size={15} color="var(--primary)" />
                          <span>Explanation:</span>
                        </div>
                        <p style={styles.explanationText}>
                          {course.mcqs[quizState.currentQuestion].explanation}
                        </p>
                      </div>
                    )}

                    {/* Quiz Controls */}
                    <div style={styles.quizActions}>
                      {!quizState.isAnswered ? (
                        <button 
                          style={{
                            ...styles.actionBtnPrimary, 
                            opacity: quizState.selectedOption === null ? 0.6 : 1,
                            cursor: quizState.selectedOption === null ? 'not-allowed' : 'pointer'
                          }} 
                          onClick={handleQuizSubmit}
                          disabled={quizState.selectedOption === null}
                        >
                          Check Answer
                        </button>
                      ) : (
                        <button style={styles.actionBtnPrimary} onClick={handleQuizNext}>
                          <span>{quizState.currentQuestion + 1 >= course.mcqs.length ? 'Show Results' : 'Next Question'}</span>
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIDEO LECTURES TAB */}
            {activeTab === 'videos' && (
              <div style={styles.videosTab}>
                <div style={styles.tabHeading}>
                  <h3 style={styles.tabTitleText}>Curated Video Lectures</h3>
                  <p style={styles.tabSubtitleText}>Visual educational guides curated from top educators on YouTube.</p>
                </div>

                <div style={styles.videosGrid}>
                  {course.videos.map((vid, idx) => (
                    <div 
                      key={idx} 
                      className="dashboard-video-card glass-panel"
                      style={styles.videoCard} 
                      onClick={() => setActiveVideoId(vid.youtubeId)}
                    >
                      <div style={styles.videoThumbnailWrapper}>
                        <img 
                          src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`} 
                          alt={vid.title}
                          style={styles.videoThumbnail} 
                        />
                        <div className="video-play-overlay" style={styles.playOverlay}>
                          <Play size={20} color="#fff" fill="#fff" />
                        </div>
                        <span style={styles.durationBadge}>{vid.duration}</span>
                      </div>
                      <div style={styles.videoDetails}>
                        <h4 style={styles.videoTitle}>{vid.title}</h4>
                        <span style={styles.videoViews}>{vid.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* FULL SCREEN NOTE READER POPUP */}
      {readingContent && (
        <div style={styles.modalOverlay}>
          <div style={styles.readerModal} className="glass-panel">
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{readingContent.title}</h3>
              <button style={styles.closeModalBtn} onClick={() => setReadingContent(null)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalDesc}>{readingContent.description}</p>
              
              <div style={styles.detailedContentCard}>
                <h4 style={styles.detailedSubHeading}>Detailed Chapter Outline & Key Terms</h4>
                <ul style={styles.modalBulletList}>
                  {readingContent.content.map((bullet, idx) => (
                    <li key={idx} style={styles.modalBulletItem}>
                      <span style={styles.bulletDot} />
                      <p>{bullet}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.lpuTipBox}>
                <h5>💡 Academic Tips for LPU Students</h5>
                <p>Ensure you write complete definitions and clean algorithms/draw flowcharts in your LPU exams. Relative grading places high weight on presentation and neat steps.</p>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button 
                style={styles.actionBtnSecondary} 
                onClick={() => setReadingContent(null)}
              >
                Close Reader
              </button>
              <button 
                style={styles.actionBtnPrimary} 
                onClick={() => {
                  setReadingContent(null);
                  handleDownload(`Unit_${readingContent.unit}_FullNotes.pdf`);
                }}
              >
                <Download size={14} />
                <span>Save Offline PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YOUTUBE LIGHTBOX VIDEO MODAL */}
      {activeVideoId && (
        <div style={styles.modalOverlay} onClick={() => setActiveVideoId(null)}>
          <div style={styles.videoModal} onClick={e => e.stopPropagation()}>
            <div style={styles.videoModalHeader}>
              <button style={styles.videoCloseBtn} onClick={() => setActiveVideoId(null)}>✕ Close Player</button>
            </div>
            <div style={styles.videoIframeWrapper}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '0 0 12px 12px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL FILE DOWNLOADING PROGRESS LOADER */}
      {downloadingFile && (
        <div style={styles.downloadToast}>
          <div style={styles.toastInfo}>
            <Download size={16} className="animate-spin" color="var(--primary)" />
            <span style={styles.toastText}>Downloading <strong>{downloadingFile}</strong>...</span>
            <span style={styles.toastPercent}>{downloadProgress}%</span>
          </div>
          <div style={styles.progressBarBg}>
            <div style={{...styles.progressBarFill, width: `${downloadProgress}%`}} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 24px 80px 24px',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '32px',
    textAlign: 'left',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--bg-surface-hover)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-primary)',
    padding: '8px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  titleInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  courseCode: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#ff6b00',
    background: 'var(--bg-card-header)',
    border: '1px solid var(--border-glass)',
    padding: '4px 12px',
    borderRadius: '8px',
    fontFamily: 'var(--font-heading)',
  },
  courseName: {
    fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '-0.02em',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '28px',
    alignItems: 'start',
  },
  sidebar: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)',
  },
  sidebarTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  metaItem: {
    background: 'var(--bg-surface-hover)',
    border: '1px solid var(--border-glass)',
    borderRadius: '10px',
    padding: '12px 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  metaLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  metaValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginTop: '2px',
  },
  syllabusSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionHeader: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
  },
  syllabusText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  statList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '16px',
  },
  statRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  statDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#ff6b00',
  },
  contentPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  tabsContainer: {
    display: 'flex',
    padding: '6px',
    gap: '6px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '14px',
    boxShadow: 'var(--shadow-card)',
  },
  tabBtn: {
    flex: 1,
    minWidth: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  activeTabBtn: {
    background: '#ff6b00',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
  },
  tabContentArea: {
    animation: 'fadeIn 0.3s ease-out',
  },
  tabHeading: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  tabTitleText: {
    fontSize: '20px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
  },
  tabSubtitleText: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  unitList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  unitCard: {
    padding: '18px 22px',
    borderRadius: '14px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    boxShadow: 'var(--shadow-card)',
  },
  unitCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  unitCardTitleBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'left',
  },
  unitNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    background: 'var(--bg-card-header)',
    color: '#ff6b00',
    fontSize: '15px',
    fontWeight: '800',
    border: '1px solid var(--border-glass)',
  },
  unitTitleText: {
    display: 'flex',
    flexDirection: 'column',
  },
  unitDescText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  unitToggleBtn: {
    background: 'var(--bg-surface-hover)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: '600',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  unitExpandedBody: {
    marginTop: '16px',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '16px',
    animation: 'fadeIn 0.3s ease-out',
  },
  quickReader: {
    textAlign: 'left',
  },
  readerHeading: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#ff6b00',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  bulletList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  bulletItem: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    position: 'relative',
    paddingLeft: '18px',
  },
  readerActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  actionBtnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ff6b00',
    color: '#ffffff',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(255, 107, 0, 0.25)',
  },
  actionBtnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--bg-surface-hover)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-primary)',
    padding: '9px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
  },
  noReaderContent: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  noReaderText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  pyqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  pyqCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)',
  },
  pyqHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '16px',
  },
  pyqYearBadge: {
    fontSize: '12px',
    background: 'var(--bg-card-header)',
    border: '1px solid var(--border-glass)',
    color: '#ff6b00',
    padding: '3px 10px',
    borderRadius: '6px',
    fontWeight: '700',
  },
  pyqTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '4px',
    fontFamily: 'var(--font-heading)',
  },
  pyqMeta: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginBottom: '20px',
  },
  pyqDownloadBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#0284c7',
    border: 'none',
    color: '#ffffff',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
  },
  noQuizBlock: {
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  quizResultBlock: {
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
  },
  resultTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
  },
  resultScore: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
  },
  scoreHighlight: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#ff6b00',
  },
  resultVerdict: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    maxWidth: '400px',
    marginBottom: '10px',
  },
  quizCard: {
    padding: '24px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)',
  },
  quizProgressHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
  },
  quizQuestionNum: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: '600',
  },
  quizScoreTrack: {
    fontSize: '13px',
    color: '#ff6b00',
    fontWeight: '700',
  },
  questionText: {
    fontSize: '17px',
    color: 'var(--text-primary)',
    lineHeight: '1.5',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '8px 0',
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'var(--bg-surface-hover)',
    border: '1px solid var(--border-glass)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  optionSelected: {
    borderColor: '#ff6b00',
    background: 'rgba(255, 107, 0, 0.08)',
  },
  optionCorrect: {
    borderColor: '#10b981',
    background: 'rgba(16, 185, 129, 0.08)',
  },
  optionIncorrect: {
    borderColor: '#ef4444',
    background: 'rgba(239, 68, 68, 0.08)',
  },
  optionLetter: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: 'var(--border-glass)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    marginRight: '12px',
  },
  optionLabelText: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontWeight: '500',
  },
  optionStatusIcon: {
    marginLeft: 'auto',
  },
  explanationBox: {
    background: 'rgba(255, 107, 0, 0.05)',
    borderLeft: '3px solid #ff6b00',
    padding: '14px 16px',
    borderRadius: '0 8px 8px 0',
  },
  explanationTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#ff6b00',
    marginBottom: '4px',
  },
  explanationText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  quizActions: {
    display: 'flex',
    justify: 'flex-end',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '16px',
  },
  videosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  videoCard: {
    padding: '12px',
    cursor: 'pointer',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)',
  },
  videoThumbnailWrapper: {
    position: 'relative',
    aspectRatio: '16/9',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'var(--transition-smooth)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    background: 'rgba(0, 0, 0, 0.75)',
    color: '#ffffff',
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600',
  },
  videoDetails: {
    padding: '12px 6px 4px 6px',
    textAlign: 'left',
  },
  videoTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    lineHeight: '1.4',
    marginBottom: '4px',
  },
  videoViews: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: '20px',
  },
  readerModal: {
    maxWidth: '750px',
    width: '100%',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-glass)',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
  },
  closeModalBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '20px',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '24px',
    overflowY: 'auto',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  modalDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  detailedContentCard: {
    background: 'var(--bg-surface-hover)',
    border: '1px solid var(--border-glass)',
    borderRadius: '12px',
    padding: '16px 20px',
  },
  detailedSubHeading: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ff6b00',
    marginBottom: '14px',
  },
  modalBulletList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  modalBulletItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  bulletDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#ff6b00',
    marginTop: '8px',
    flexShrink: 0,
  },
  lpuTipBox: {
    background: 'rgba(245, 158, 11, 0.08)',
    borderLeft: '3px solid #f59e0b',
    padding: '14px 18px',
    borderRadius: '0 8px 8px 0',
  },
  modalFooter: {
    display: 'flex',
    justify: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid var(--border-glass)',
  },
  videoModal: {
    maxWidth: '900px',
    width: '100%',
    aspectRatio: '16/9',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  videoModalHeader: {
    display: 'flex',
    justify: 'flex-end',
    background: '#000',
    padding: '8px 16px',
    borderRadius: '12px 12px 0 0',
  },
  videoCloseBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  videoIframeWrapper: {
    flexGrow: 1,
    background: '#000',
    borderRadius: '0 0 12px 12px',
  },
  downloadToast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    boxShadow: 'var(--shadow-neon-strong)',
    borderRadius: '14px',
    padding: '16px 20px',
    zIndex: 1000,
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    animation: 'fadeIn 0.2s ease-out',
  },
  toastInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
  },
  toastText: {
    color: 'var(--text-primary)',
    flexGrow: 1,
    textAlign: 'left',
    fontWeight: '600',
  },
  toastPercent: {
    fontWeight: '700',
    color: '#ff6b00',
  },
  progressBarBg: {
    width: '100%',
    height: '6px',
    background: 'var(--bg-surface-hover)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ff6b00, #ea580c)',
    transition: 'width 0.15s linear',
  }
};

export default CourseDashboard;
