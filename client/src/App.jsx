import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Semesters from "./components/Semesters";
import CourseDashboard from "./components/CourseDashboard";
import CgpaCalculator from "./components/CgpaCalculator";
import Footer from "./components/Footer";

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      {selectedCourse ? (
        <CourseDashboard 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
        />
      ) : (
        <>
          <Hero onSelectCourse={handleSelectCourse} />
          <Features />
          <Semesters onSelectCourse={handleSelectCourse} />
          <CgpaCalculator />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;