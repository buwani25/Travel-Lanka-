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
