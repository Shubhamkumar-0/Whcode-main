import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, HelpCircle, GraduationCap, Percent } from 'lucide-react';

const LPU_GRADES = [
  { grade: 'O', points: 10, description: 'Outstanding' },
  { grade: 'A+', points: 9, description: 'Excellent' },
  { grade: 'A', points: 8, description: 'Very Good' },
  { grade: 'B+', points: 7, description: 'Good' },
  { grade: 'B', points: 6, description: 'Above Average' },
  { grade: 'C', points: 5, description: 'Average' },
  { grade: 'D', points: 4, description: 'Pass' },
  { grade: 'E', points: 0, description: 'Re-appear' },
  { grade: 'F', points: 0, description: 'Fail/Absent' }
];

function CgpaCalculator() {
  const [activeMode, setActiveMode] = useState('sgpa');
  
  // SGPA state
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Subject 1', credits: 4, grade: 'O' },
    { id: 2, name: 'Subject 2', credits: 4, grade: 'A+' },
    { id: 3, name: 'Subject 3', credits: 3, grade: 'A' },
    { id: 4, name: 'Subject 4', credits: 3, grade: 'B+' }
  ]);
  const [sgpaResult, setSgpaResult] = useState(0);

  // CGPA state
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'Sem 1', sgpa: 8.5, credits: 20 },
    { id: 2, name: 'Sem 2', sgpa: 8.2, credits: 22 }
  ]);
  const [cgpaResult, setCgpaResult] = useState(0);

  // Calculate SGPA
  useEffect(() => {
    let totalCredits = 0;
    let weightedPoints = 0;

    subjects.forEach(subj => {
      const credits = Number(subj.credits) || 0;
      const gradeObj = LPU_GRADES.find(g => g.grade === subj.grade);
      const points = gradeObj ? gradeObj.points : 0;
      
      totalCredits += credits;
      weightedPoints += (credits * points);
    });

    if (totalCredits > 0) {
      setSgpaResult(Number((weightedPoints / totalCredits).toFixed(2)));
    } else {
      setSgpaResult(0);
    }
  }, [subjects]);

  // Calculate CGPA
  useEffect(() => {
    let totalCredits = 0;
    let weightedSgpas = 0;

    semesters.forEach(sem => {
      const credits = Number(sem.credits) || 0;
      const sgpa = Number(sem.sgpa) || 0;
      
      totalCredits += credits;
      weightedSgpas += (credits * sgpa);
    });

    if (totalCredits > 0) {
      setCgpaResult(Number((weightedSgpas / totalCredits).toFixed(2)));
    } else {
      setCgpaResult(0);
    }
  }, [semesters]);

  const addSubjectRow = () => {
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    setSubjects([...subjects, { id: newId, name: `Subject ${newId}`, credits: 3, grade: 'A' }]);
  };

  const removeSubjectRow = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSemesterRow = () => {
    const newId = semesters.length > 0 ? Math.max(...semesters.map(s => s.id)) + 1 : 1;
    setSemesters([...semesters, { id: newId, name: `Sem ${newId}`, sgpa: 8.0, credits: 20 }]);
  };

  const removeSemesterRow = (id) => {
    setSemesters(semesters.filter(s => s.id !== id));
  };

  const updateSemester = (id, field, value) => {
    setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div id="calculator-section" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.badge}>
          <Calculator size={16} color="var(--secondary)" />
          <span>LPU Grading Scale Tool</span>
        </div>
        <h2 style={styles.title}>Academic SGPA & CGPA Calculator</h2>
        <p style={styles.subtitle}>
          LPU uses relative grading. Estimate your SGPA and CGPA based on credits and grades.
        </p>
      </div>

      <div style={styles.calculatorLayout} className="glass-panel">
        {/* Toggle Mode Button */}
        <div style={styles.modeToggleContainer}>
          <button 
            style={{...styles.modeBtn, ...(activeMode === 'sgpa' ? styles.activeModeBtn : {})}}
            onClick={() => setActiveMode('sgpa')}
          >
            Calculate Semester SGPA
          </button>
          <button 
            style={{...styles.modeBtn, ...(activeMode === 'cgpa' ? styles.activeModeBtn : {})}}
            onClick={() => setActiveMode('cgpa')}
          >
            Calculate Cumulative CGPA
          </button>
        </div>

        <div style={styles.mainGrid}>
          {/* Input Area */}
          <div style={styles.inputArea}>
            
            {/* SGPA MODE */}
            {activeMode === 'sgpa' && (
              <div style={styles.sgpaMode}>
                <div style={styles.tableHeader}>
                  <span style={{...styles.thCol, width: '40%'}}>Subject/Course</span>
                  <span style={{...styles.thCol, width: '30%'}}>Credits</span>
                  <span style={{...styles.thCol, width: '20%'}}>Grade</span>
                  <span style={{...styles.thCol, width: '10%'}}>Action</span>
                </div>

                <div style={styles.rowsContainer}>
                  {subjects.map((sub) => (
                    <div key={sub.id} style={styles.row}>
                      <input 
                        type="text" 
                        value={sub.name}
                        onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                        style={styles.textInput}
                        placeholder="Subject Name"
                      />
                      
                      <select 
                        value={sub.credits}
                        onChange={(e) => updateSubject(sub.id, 'credits', Number(e.target.value))}
                        style={styles.selectInput}
                      >
                        <option value={1}>1 Credit</option>
                        <option value={2}>2 Credits</option>
                        <option value={3}>3 Credits</option>
                        <option value={4}>4 Credits</option>
                        <option value={5}>5 Credits</option>
                      </select>

                      <select 
                        value={sub.grade}
                        onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                        style={styles.selectInput}
                      >
                        {LPU_GRADES.map(g => (
                          <option key={g.grade} value={g.grade}>
                            {g.grade} ({g.points} pts)
                          </option>
                        ))}
                      </select>

                      <button 
                        className="calc-delete-btn"
                        onClick={() => removeSubjectRow(sub.id)}
                        style={styles.deleteBtn}
                        title="Remove Subject"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="calc-add-row-btn" style={styles.addRowBtn} onClick={addSubjectRow}>
                  <Plus size={16} />
                  <span>Add Subject Row</span>
                </button>
              </div>
            )}

            {/* CGPA MODE */}
            {activeMode === 'cgpa' && (
              <div style={styles.cgpaMode}>
                <div style={styles.tableHeader}>
                  <span style={{...styles.thCol, width: '40%'}}>Semester Name</span>
                  <span style={{...styles.thCol, width: '30%'}}>Semester SGPA</span>
                  <span style={{...styles.thCol, width: '20%'}}>Credits</span>
                  <span style={{...styles.thCol, width: '10%'}}>Action</span>
                </div>

                <div style={styles.rowsContainer}>
                  {semesters.map((sem) => (
                    <div key={sem.id} style={styles.row}>
                      <input 
                        type="text" 
                        value={sem.name}
                        onChange={(e) => updateSemester(sem.id, 'name', e.target.value)}
                        style={styles.textInput}
                        placeholder="Semester"
                      />

                      <input 
                        type="number" 
                        min={0} 
                        max={10} 
                        step={0.01}
                        value={sem.sgpa}
                        onChange={(e) => updateSemester(sem.id, 'sgpa', Number(e.target.value))}
                        style={styles.numberInput}
                        placeholder="SGPA"
                      />
                      
                      <input 
                        type="number" 
                        min={1} 
                        max={35}
                        value={sem.credits}
                        onChange={(e) => updateSemester(sem.id, 'credits', Number(e.target.value))}
                        style={styles.numberInput}
                        placeholder="Credits"
                      />

                      <button 
                        className="calc-delete-btn"
                        onClick={() => removeSemesterRow(sem.id)}
                        style={styles.deleteBtn}
                        title="Remove Semester"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="calc-add-row-btn" style={styles.addRowBtn} onClick={addSemesterRow}>
                  <Plus size={16} />
                  <span>Add Semester Row</span>
                </button>
              </div>
            )}

          </div>

          {/* Results Visualizer Gauge */}
          <div style={styles.resultsArea}>
            <div style={styles.gaugeCard} className="glass-panel">
              <h4 style={styles.gaugeTitle}>
                {activeMode === 'sgpa' ? 'Estimated SGPA' : 'Estimated CGPA'}
              </h4>
              
              <div style={styles.gaugeWrapper}>
                <div style={styles.outerCircle}>
                  <div style={styles.innerCircle}>
                    <span style={styles.gaugeResultText}>
                      {activeMode === 'sgpa' ? sgpaResult : cgpaResult}
                    </span>
                    <span style={styles.gaugeMax}>/ 10.0</span>
                  </div>
                </div>
              </div>

              {/* LPU Conversion Percentage */}
              <div style={styles.conversionBox}>
                <div style={styles.conversionLabel}>
                  <Percent size={14} color="var(--accent)" />
                  <span>LPU Equivalent Percentage</span>
                </div>
                <div style={styles.conversionValue}>
                  {activeMode === 'sgpa' 
                    ? (sgpaResult * 10).toFixed(0) 
                    : (cgpaResult * 10).toFixed(0)}%
                </div>
                <p style={styles.conversionHelp}>
                  LPU Official Formula: Percentage = CGPA × 10
                </p>
              </div>

              {/* Relative Grading Tip */}
              <div style={styles.tipBox}>
                <HelpCircle size={16} color="var(--text-muted)" />
                <p style={styles.tipText}>
                  Your final grades depend on the class average and standard deviation (Relative Grading). Aim for at least 15-20 marks above average to secure an A/A+ grade.
                </p>
              </div>
            </div>
          </div>
        </div>
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
  calculatorLayout: {
    padding: "32px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  modeToggleContainer: {
    display: "flex",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "6px",
    borderRadius: "12px",
    gap: "6px",
  },
  modeBtn: {
    flex: 1,
    padding: "12px",
    background: "none",
    border: "none",
    color: "#475569",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    fontFamily: "var(--font-heading)",
    cursor: "pointer",
    transition: "var(--transition-smooth)",
  },
  activeModeBtn: {
    background: "#ff6b00",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(255, 107, 0, 0.25)",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "30px",
    alignItems: "start",
  },
  inputArea: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  tableHeader: {
    display: "flex",
    padding: "0 12px 10px 12px",
    borderBottom: "1px solid #e2e8f0",
  },
  thCol: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#64748b",
    textAlign: "left",
  },
  rowsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "350px",
    overflowY: "auto",
    paddingRight: "6px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "10px 12px",
  },
  textInput: {
    width: "40%",
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    color: "#0f172a",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
  },
  selectInput: {
    width: "25%",
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    color: "#0f172a",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
    cursor: "pointer",
  },
  numberInput: {
    width: "25%",
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    color: "#0f172a",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "#fee2e2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    cursor: "pointer",
    transition: "var(--transition-smooth)",
    flexShrink: 0,
  },
  addRowBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    alignSelf: "flex-start",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    color: "#0f172a",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "var(--transition-smooth)",
  },
  resultsArea: {
    width: "100%",
  },
  gaugeCard: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
  },
  gaugeTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#475569",
    marginBottom: "20px",
  },
  gaugeWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  outerCircle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff6b00, #ea580c)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(255, 107, 0, 0.25)",
  },
  innerCircle: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeResultText: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: "1",
  },
  gaugeMax: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
  },
  conversionBox: {
    width: "100%",
    background: "#fff7ed",
    border: "1px solid #ffedd5",
    borderRadius: "14px",
    padding: "16px",
    textAlign: "center",
    marginBottom: "16px",
  },
  conversionLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#ff6b00",
    fontWeight: "700",
    marginBottom: "6px",
  },
  conversionValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
  },
  conversionHelp: {
    fontSize: "11px",
    color: "#64748b",
    marginTop: "4px",
  },
  tipBox: {
    display: "flex",
    gap: "10px",
    background: "#f1f5f9",
    padding: "14px",
    borderRadius: "10px",
    textAlign: "left",
  },
  tipText: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: "1.4",
  }
};

export default CgpaCalculator;
