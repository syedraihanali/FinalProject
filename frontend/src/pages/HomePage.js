import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import '../common.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
     
      <section className="hero">
        <h1>Healthcare made easy.</h1>
        <p className="tagline">Your trusted portal for booking appointments and managing patient care.</p>
      </section>

     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div  style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px' }}>
          <section className="description">
            <p>
              Welcome to the Doctor’s Portal — your simple and secure way to manage healthcare online. 
              This platform connects patients with their family doctors, making it easy to register, 
              book appointments, and view upcoming visits or medical history all in one place.
            </p>
            <p>
              As a patient, you can create your profile, choose your family doctor, and instantly 
              check available time slots. Booking is fast, transparent, and hassle-free, ensuring you 
              get the care you need when you need it. Our portal is designed to save time, reduce waiting, 
              and give you better control over your healthcare journey.
            </p>
          </section>
      </div>
    <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px' }}>
      <section className="cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',height: '60%' }}>
        <div className="card">
          <h2>New Patient</h2>
          <p>Register now to create your profile and connect with a family doctor.</p>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
        <div className="card">
          <h2>Family Doctor</h2>
          <p>Already registered? Book your next appointment quickly and easily.</p>
          <button onClick={() => navigate('/book-appointment')}>Book Now</button>
        </div>
      </section>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
