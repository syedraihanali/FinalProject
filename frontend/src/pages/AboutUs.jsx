import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <section className="hero">
        <h1>About Our Doctor’s Portal</h1>
        <p>Connecting patients and doctors with ease and simplicity.</p>
      </section>

      <section className="intro">
        <h2>What is the Doctor’s Portal?</h2>
        <p>
          The Doctor’s Portal is a modern healthcare management system that makes 
          healthcare more accessible and organized. It allows patients to easily 
          register, choose their family doctor, book appointments online, and 
          manage their health records — all in one secure place.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Patient Registration:</strong> New patients can sign up quickly and securely.</li>
          <li><strong>Doctor Management:</strong> Each patient is assigned to a family doctor with a maximum patient capacity.</li>
          <li><strong>Appointment Booking:</strong> Patients can view available time slots and book appointments instantly.</li>
          <li><strong>Upcoming Appointments:</strong> Patients can view their upcoming visits in an organized schedule.</li>
          <li><strong>Appointment History:</strong> Past consultations are recorded for reference and follow-ups.</li>
          <li><strong>Secure Authentication:</strong> Encrypted login ensures data privacy and security.</li>
        </ul>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          We aim to simplify healthcare management by reducing wait times, 
          removing paperwork, and providing patients with an easy-to-use digital 
          system for booking and managing their appointments. At the same time, 
          we empower doctors with tools to organize their schedules and manage 
          patient loads efficiently.
        </p>
      </section>

      <section className="tech">
        <h2>Technology Stack</h2>
        <p>
          The portal is built with a modern technology stack:
        </p>
        <ul>
          <li><strong>Frontend:</strong> React.js for a dynamic and user-friendly interface.</li>
          <li><strong>Backend:</strong> Node.js + Express.js for APIs and business logic.</li>
          <li><strong>Database:</strong> MySQL/MariaDB for secure data storage.</li>
          <li><strong>Authentication:</strong> JWT (JSON Web Tokens) with bcrypt for password security.</li>
        </ul>
      </section>

      <section className="conclusion">
        <h2>Why Choose Us?</h2>
        <p>
          Healthcare should be simple, fast, and secure. Our Doctor’s Portal bridges 
          the gap between patients and doctors, offering an efficient and reliable 
          way to manage appointments and patient-doctor relationships.
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
