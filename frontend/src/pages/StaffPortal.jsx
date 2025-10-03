import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext.jsx';
import './PatientProfile.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const StaffPortal = () => {
  const { auth } = useContext(AuthContext);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const getUpcomingApp = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/patients/${auth.user.id}/upcomingAppointments`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      const data = await res.json();
      setUpcomingAppointments(data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (auth?.user?.id && auth?.token) {
      getUpcomingApp();
    }
  }, [auth]);

  return (
    <div>
      <h1>StaffPortal</h1>
      <section className="appointments-section" style={{ width: '90vw', textAlign: 'center', marginLeft: '50px' }}>
        <h3>Upcoming Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <tr key={appointment.AppointmentID}>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.date}</td>
                  <td>{`${appointment.startTime} - ${appointment.endTime}`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No upcoming appointments.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StaffPortal;
