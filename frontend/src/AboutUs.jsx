import React, { useState } from "react";
import "./AboutUs.css";
import "./Home.css";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

      

      <main>

    <section id="img">
    <img src="/Images/about-us2.jpg" alt="img"></img>
    </section>

    <section id="about-company">
      <p className="about-us">About Us</p>
      <p>
      
Ayubowan! (May you live long)<br/><br/>
Welcome to Travel Lanka, the largest family of luxury hotels Sri Lanka has to offer!<br/><br/>
On this resplendent isle, we wish all our guests a long life. And even though some have called it paradise, we call it home. A home filled with stories untold and wonders enchanted, which I invite you to step into and discover at each of our luxury hotels and villas under the banner of Jetwing Hotels, Sri Lanka.<br/><br/>

For nearly half a century, we have been honoured to share the magic of our tropical land with the world. With humble beginnings on my family’s favourite seaside town of Negombo, it was my father, Herbert Cooray, who set us on the path we still proudly follow today. He built Jetwing on the strength of family values – with respect at our core, complemented by the inherent sense of care and compassion shared by all Sri Lankans. In unison, these values contributed to a spirit so powerful, that it continues to inspire generations of Sri Lankan hospitality – the luxurious charm which sets us apart, and is wholeheartedly extended to you with warm smiles across every part of our island.<br/><br/>

Be it hidden amidst the mystique of historical cities, nestled away in rustic villages, cushioned warmly up in the mountain clouds, or pampered down by the setting sun of the Indian Ocean – our doors are always open, wherever you may find yourself in Sri Lanka.<br/><br/>

The world has graced our shores for centuries, forging a beautiful relationship that has always held a special place in our hearts. So special in fact, that even though you may arrive as guests, you will leave as friends, but return as family. Because when you stay with us, you stay at the home of Sri Lankan hospitality.<br/><br/>

Welcome to our family – we look forward to meeting you.<br/><br/>

A.W.Upali<br/><br/>

Chairman, Travel Lanka<br/><br/>
      </p>
    </section>

    
  </main>



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
        <div className="footer-copy">&copy; 2024 Tourism Management System</div>
      </footer>
    </div>

  );
}
export default AboutUs;
