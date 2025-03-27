import React, { useState } from "react";
import useFetchData from "../../hooks/useFetch";
import { getSmartphones } from "../../api/smartphoneAPI";
import styles from "../../style/home.module.css";

const Home = () => {
  const { data: smartphones, error, loading } = useFetchData(getSmartphones);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  if (loading) {
    return <div className="text-center mt-5">Loading smartphones...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  // Ensure smartphones is always an array
  if (!smartphones || smartphones.length === 0) {
    return <div className="alert alert-warning text-center">No smartphones available.</div>;
  }

  console.log("Rendering smartphones:", smartphones.length);

  return (
    <div className={`container mt-4 ${styles.container}`}>
      <div className="row">
        {smartphones.map((phone, index) => {
          const { image_url, smartphone } = phone;
          const brand = smartphone?.brand?.name || "Brand Not Available";
          const model = smartphone?.model || "Model Not Available";
          const imageSrc = image_url ? `${baseURL}${image_url}` : "/placeholder.jpg"; 
          const phoneId = smartphone?.id || index; 

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
