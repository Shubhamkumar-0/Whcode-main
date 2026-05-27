import React from 'react';
import { BookOpen, FileText, CheckSquare, Video } from 'lucide-react';

function Features() {
  const featuresList = [
    {
      icon: <BookOpen size={28} color="#6366f1" />,
      title: "Revision Notes",
      description: "Carefully structured unit-wise notes covering key LPU syllabus concepts with quick highlights."
    },
    {
      icon: <CheckSquare size={28} color="#10b981" />,
      title: "Interactive MCQs",
      description: "Test your knowledge with chapter-wise quizzes, real-time grading, and detailed explanations."
    },
    {
      icon: <FileText size={28} color="#a855f7" />,
      title: "Semester PYQs",
      description: "Previous Year Questions for Mid-term and End-term exams to understand paper patterns."
    },
    {
      icon: <Video size={28} color="#f43f5e" />,
      title: "Video Tutorials",
      description: "Hand-picked high-quality video tutorials and playlist references to speed up learning."
    }
  ];

  const handleScrollToSemesters = () => {
    const element = document.getElementById('semesters-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>What You Get On WHCode</h2>
      <p style={styles.sectionSubtitle}>
        Everything you need to excel in your academics. Select a semester below to get started.
      </p>

      <div style={styles.grid}>
        {featuresList.map((feat, idx) => (
          <div 
            key={idx} 
            className="feature-card-item glass-panel"
            style={styles.card}
            onClick={handleScrollToSemesters}
          >
            <div style={styles.iconContainer}>{feat.icon}</div>
            <h3 style={styles.cardTitle}>{feat.title}</h3>
            <p style={styles.cardDesc}>{feat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "80px 24px",
    textAlign: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#fff",
  },
  sectionSubtitle: {
    fontSize: "16px",
    color: "var(--text-secondary)",
    maxWidth: "600px",
    margin: "0 auto 48px auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginTop: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    padding: "32px",
    cursor: "pointer",
    background: "rgba(11, 19, 43, 0.4)",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "19px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
  },
  cardDesc: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
  }
};

export default Features;