import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Semesters from "./components/Semesters";
import CourseDashboard from "./components/CourseDashboard";
import CgpaCalculator from "./components/CgpaCalculator";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <Navbar onResetCourse={() => setSelectedCourse(null)} />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;