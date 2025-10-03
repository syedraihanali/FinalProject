//frontend/src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PatientProfile from './pages/PatientProfile.jsx';
import SignInPage from './pages/SignInPage.jsx';
import './common.css';
import Header from './components/Header.jsx';
import BookAppointmentPage from './pages/BookAppointmentPage.jsx';
import StaffPortal from './pages/StaffPortal.jsx';
import { AuthContext } from './AuthContext.jsx'; // Import AuthContext
import AboutUs from './pages/AboutUs.jsx';

function App() {
  const { auth } = useContext(AuthContext); // Access auth state

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/signin" element={!auth.token ? <SignInPage /> : <Navigate to="/myprofile" />} />
            <Route path="/book-appointment" element={
              auth.token ? <BookAppointmentPage /> : <Navigate to="/signin" />
            } />
            <Route path="/staff-portal" element={
              auth.token ? <StaffPortal /> : <Navigate to="/staff-portal" />
            } />
            <Route path="/myprofile" element={
              auth.token ? <PatientProfile /> : <Navigate to="/signin" />
            } />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
