import './TransDash1.css'
import { Link } from "react-router-dom";
function DashboardTMS(){
    return(
        <div class="container">
             <header>
        <div class="logo"><i>Travel Lanka</i></div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Destinations</a></li>
                <li><a href="#">Reviews</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </nav>
        <a href="#" class="cta-button">Logout</a>
    </header>
    <aside class="dashboard-sidebar">
            <nav>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><Link to="/Vehicle">Add Vehicle</Link></li>
                    <li><Link to="/Vehicles">Vehicles</Link></li>
                    <li><a href="#">Drivers</a></li>
                    <li><a href="#">Bookings</a></li>
                    <li><a href="#">Maintenance</a></li>
                    <li><a href="#">Reports</a></li>
                </ul>
            </nav>
        </aside>
    <main class="dashboard-content">
            <section class="dashboard-section">
                <h2>Overview</h2><br></br>
                <div class="overview-metrics">
                    <div class="metric-card">
                        <h3>Total Vehicles</h3>
                        <p id="total-vehicles">150</p>
                    </div>
                    <div class="metric-card">
                        <h3>Active Routes</h3>
                        <p id="active-routes">25</p>
                    </div>
                    <div class="metric-card">
                        <h3>Total Distance Covered</h3>
                        <p id="total-distance">12,500 km</p>
                    </div>
                </div>
            </section>

            <section class="dashboard-section">
                <h2>Vehicle Status</h2>
                <canvas id="vehicle-status-chart"></canvas>
            </section>

            <section class="dashboard-section">
                <h2>Recent Activity</h2>
                <ul class="activity-list">
                    <li>Vehicle #123 completed route A at 08:00.</li>
                    <li>Driver John Doe started route B at 09:15.</li>
                    <li>Maintenance scheduled for Vehicle #124 on 2024-03-10.</li>
                </ul>
            </section>
        </main>
    <footer>
    <div class="footer-nav">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">About</a></li>
        </ul>
    </div>
    <div class="footer-line"></div>
    <div class="footer-copy">
        &copy; 2024 Tourism Management System
    </div>
</footer>
  
  </div>
    );
}

export default DashboardTMS