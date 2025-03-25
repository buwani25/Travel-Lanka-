import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation
  const handleBookTour = () => {
    navigate('/cusDetails'); // Navigate to the Customer Details page
  };
  const handlePendingTours = () => {
    navigate('/pendingtours'); // Navigate to the Pending Tours page
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Customer Dashboard</h1>
        <div className="buttons">
          <button onClick={handleBookTour} className="booking-button">
            Book a Tour
          </button>

          <button onClick={handlePendingTours} className="pending-button">
            Pending Tours
          </button>
        </div>
      </header>

      <section className="tours-section">
        <h2>Past Tours</h2>
        <div className="tours-list">
          <div className="tour-item">Tour to Paris - Completed</div>
          <div className="tour-item">Safari in Kenya - Completed</div>
          <div className="tour-item">Beach Vacation in Maldives - Completed</div>
        </div>

        <h2>Booked Tours</h2>
        <div className="tours-list">
          <div className="tour-item">Trip to Japan - Upcoming</div>
          <div className="tour-item">Adventure in New Zealand - Upcoming</div>
          
        </div>
      </section>

      <footer>
        <div className="footer-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
        <div className="footer-line"></div>
        <div className="footer-copy">
          &copy; 2024 Tourism Management System
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
