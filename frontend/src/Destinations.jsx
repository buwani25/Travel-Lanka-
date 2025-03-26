import React, { useState } from "react";
import "./Destinations.css";

const Destination = () => {
  const destinations = [
    {
      name: "Temple of the Tooth Relic",
      image: "/Images/kandytemple.jpg",
      shortDesc: "One of the most sacred Buddhist sites in Sri Lanka.",
      fullDesc:
        "The Temple of the Tooth Relic, also known as Sri Dalada Maligawa, is a UNESCO World Heritage Site and a major religious attraction. It houses the sacred tooth relic of Lord Buddha and is a must-visit for tourists.",
    },
    {
      name: "Royal Botanical Gardens",
      image: "Images/garden.jpg",
      shortDesc: "A beautiful botanical garden in Peradeniya.",
      fullDesc:
        "Located in Peradeniya, this garden spans over 147 acres and is home to more than 4,000 species of plants. It's famous for its stunning orchid collection and giant Javan fig tree.",
    },
    {
      name: "Kandy Lake",
      image: "Images/lake.jpg",
      shortDesc: "A scenic artificial lake in the heart of Kandy.",
      fullDesc:
        "Built by King Sri Wickrama Rajasinghe in 1807, Kandy Lake offers a peaceful escape with a walking path and stunning views of the city. A perfect spot for evening strolls.",
    },
    {
      name: "Galle Fort",
      image: "Images/gallefort.jpg",
      shortDesc:
        "It’s an ideal place to explore history, visit museums, and enjoy beautiful coastal views.",
      fullDesc:
        "Galle Fort is a historic city in the southern part of Sri Lanka. A UNESCO World Heritage site, it's known for its Dutch colonial buildings, cobblestone streets, and stunning views of the Indian Ocean.",
    },
    {
      name: "Mirissa Beach",
      image: "Images/mirissa.jpg",
      shortDesc:
        "It’s also a popular spot for whale watching, where tourists can experience the breathtaking sight of whales in the wild.",
      fullDesc:
        "Mirissa Beach is a small town on the southern coast of Sri Lanka, famous for its golden beaches, clear blue waters, and vibrant nightlife.",
    },
    {
      name: "Sigiriya",
      image: "Images/sigiriya.jpg",
      shortDesc:
        "The summit of the rock provides a breathtaking view of the surrounding area, and it’s an iconic symbol of Sri Lankan heritage.",
      fullDesc:
        "Sigiriya is an ancient rock fortress located in the central Matale District of Sri Lanka. It's a UNESCO World Heritage Site known for its stunning views, water gardens, and ancient frescoes.",
    },
    {
      name: "Ella",
      image: "Images/ninearches.jpg",
      shortDesc:
        "Ella offers spectacular views, cool climate, and an opportunity to experience Sri Lanka’s scenic beauty and natural wonders.",
      fullDesc:
        "Ella is a small town in the southern part of Sri Lanka, nestled in the beautiful hills. It's known for its picturesque landscapes, waterfalls, and trekking opportunities, such as the famous Ella Rock hike.",
    },
    {
      name: "Udawalawe National Park",
      image: "Images/udawalawe.jpg",
      shortDesc:
        "The park also features a variety of other wildlife, including leopards, deer, and a wide range of bird species.",
      fullDesc:
        "Udawalawe is a national park located in the southern part of Sri Lanka, famous for its large population of elephants. It's an excellent spot for wildlife safaris and bird watching.",
    },
    {
      name: "Sinharaja Forest",
      image: "Images/sinharaja.jpg",
      shortDesc:
        "The forest is home to numerous endemic species of flora and fauna, including rare birds, reptiles, and insects. It’s a perfect destination for eco-tourism and nature lovers.",
      fullDesc:
        "Sinharaja Forest Reserve is a tropical rainforest located in the southwest of Sri Lanka, recognized as a UNESCO World Heritage Site. It's one of the last remaining stretches of primary rainforest in Sri Lanka, rich in biodiversity.",
    },
    {
      name: "Horton Plains National Park",
      image: "Images/horton.jpg",
      shortDesc:
        "The park is a popular destination for trekking and eco-tourism, with a variety of endemic species.",
      fullDesc:
        "The park is also home to the unique Baker’s Falls, a popular waterfall, and provides a chance to experience the cool climate of the highlands. Horton Plains National Park is located in the central highlands of Sri Lanka and is known for its scenic beauty and rich biodiversity. It’s also home to the famous World's End cliff, offering stunning panoramic views.",
    },
  ];

  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); //  Added missing state for search

  const toggleReadMore = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  //  Correctly filter destinations based on search term
  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="destination-container">
      <h1 className="destination-title">Explore Top Destinations, Sri Lanka</h1>

      {/*  Search Bar */}
      <div className="des-search-bar">
        <input
          type="text"
          placeholder="Search for a destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="des-search-input"
        />
      </div>

      <div className="destination-list">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, index) => (
            <div key={index} className="destination-card">
              <img
                src={dest.image}
                alt={dest.name}
                className="destination-image"
              />
              <h2 className="destination-name">{dest.name}</h2>
              <p className="destination-description">
                {expanded === index ? dest.fullDesc : dest.shortDesc}
              </p>
              <button
                className="read-more-btn"
                onClick={() => toggleReadMore(index)}
              >
                {expanded === index ? "Read Less" : "Read More"}
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No destinations found.</p>
        )}
      </div>
    </div>
  );
};

export default Destination;
