import React, { useState } from "react";
import useFetchData from "../../hooks/useFetch";
import { getSmartphones } from "../../api/smartphoneAPI";
import styles from "../../style/home.module.css";

const Home = () => {
  const { data: smartphones, error } = useFetchData(getSmartphones);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id); 
  };

  const handleMouseLeave = () => {
    setHoveredCard(null); 
  };

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  // Debugging: Log data dari backend
  console.log("Data from backend:", smartphones);
  console.log("Rendering smartphones:", smartphones.length);

  return (
    <div className={`container mt-4 ${styles.container}`}>
      <div className="row">
        {smartphones.map((phone) => {
          const { image_url, smartphone } = phone;
          const brand = smartphone?.brand?.name || "Unknown Brand";
          const model = smartphone?.model || "Unknown Model";
          const imageSrc = image_url ? `${baseURL}${image_url}` : "";
          const phoneId = smartphone?.id; 

          return (
            <div
              key={phoneId} 
              className={`col-md-4 col-lg-3 mb-4 ${styles.cardContainer}`}
              onMouseEnter={() => handleMouseEnter(phoneId)} 
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`card h-100 border-0 ${styles.customCard} ${
                  hoveredCard === phoneId ? styles.hoveredCard : ""
                }`}
              >
                <img
                  src={imageSrc}
                  className="card-img-top"
                  alt={model}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{brand}</h5>
                  <p className="card-text">{model}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;