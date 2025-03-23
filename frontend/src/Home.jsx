import "./Home.css";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/Images/bg4.jpg",
    title: "Where Dreams Take Flight",
    caption: "Your Home, Your Journey, Your Hospitality Haven"
  },
  {
    image: "/Images/bg3.jpg",
    title: "Explore The Unseen",
    caption: "Discover breathtaking landscapes and hidden gems"
  },
  {
    image: "/Images/bg2.jpg",
    title: "Adventure Awaits",
    caption: "Embrace new cultures and unforgettable experiences"
  }
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <header>
        <div className="logo"><i>Travel Lanka</i></div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
        <a href="#" className="cta-button">Login</a>
      </header>

      <div className="hero-section">
        <img 
          src={slides[currentSlide].image} 
          alt="Scenic View" 
          className="hero-image"
        />
        <div className="hero-content">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].caption}</p>
        </div>
        <div className="slider-controls">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={index === currentSlide ? "dot active" : "dot"} 
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="services-section">
        <h2>Why Choose Us?</h2>
        <div className="services-container">
          <div className="service-card">
            <h3>Best Destinations</h3>
            <p>We offer the best travel destinations for your dream vacation.</p>
          </div>
          <div className="service-card">
            <h3>Affordable Prices</h3>
            <p>Get exclusive discounts and packages at the best rates.</p>
          </div>
          <div className="service-card">
            <h3>24/7 Support</h3>
            <p>Our team is available anytime to assist with your queries.</p>
          </div>
        </div>
      </div>
      <div className="destinations-section">
        <h2 className="topp">Top Destinations</h2><br></br>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src="/Images/bg5.jpg" alt="Beach Paradise" />
            <h3>Beach Paradise</h3>
            <p>Relax on stunning white sand beaches with crystal-clear waters.</p>
          </div>
          <div className="destination-card">
            <img src="/Images/bg6.jpg" className="pic1" alt="Mountain Escape" />
            <h3>Mountain Escape</h3>
            <p>Enjoy breathtaking views and adventurous hiking trails.</p>
          </div>
          <div className="destination-card">
            <img src="/Images/bg7.jpg" className="pic1"  alt="Cultural Heritage" />
            <h3>Cultural Heritage</h3>
            <p>Explore ancient temples and vibrant traditions.</p>
          </div>
        </div>
      </div>
      <div className="testimonials-section">
        <h2>What Our Customers Say</h2><br></br>
        <div className="testimonials-container">
          <div className="testimonial">
            <img src="/Images/bg8.jpg" alt="User 1" />
            <p>"An unforgettable journey! Everything was perfect."</p>
            <h4>- Sarah W.</h4>
          </div>
          <div className="testimonial">
            <img src="/Images/bg9.jpg" alt="User 2" />
            <p>"Best travel agency ever! Highly recommend."</p>
            <h4>- James L.</h4>
          </div>
        </div>
      </div>
      <div className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

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

export default Home;
