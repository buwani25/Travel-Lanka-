import './Home.css'

function Home(){
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
        <a href="#" class="cta-button">Book Now</a>
    </header>
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

export default Home