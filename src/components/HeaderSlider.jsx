import React from "react";
import { Carousel } from "react-bootstrap"; 
import styles from "../style/slider.module.css";  // Import as a module

const HeaderSlider = () => {
  const words = [
    "Smartphone Modern", "Gaming Mobile", "Teknologi Terkini", 
    "Ponsel Cerdas", "Game Mobile Terpopuler", "Aplikasi Gaming",
    "Koneksi Internet Cepat", "Ponsel Gaming", "Perkembangan Teknologi",
    "Peningkatan Kualitas Layar", "Konektivitas 5G", "Perangkat High-End",
    "Smartphone untuk Productivity", "Game Online", "Virtual Reality"
  ];

  // Membagi data menjadi grup yang terdiri dari 3 kata per slide
  const groupWords = (arr, size) => {
    const groups = [];
    for (let i = 0; i < arr.length; i += size) {
      groups.push(arr.slice(i, i + size));
    }
    return groups;
  };

  const groupedData = groupWords(words, 3); 

  return (
    <Carousel interval={3000}> {/* Set the slide interval to 3 seconds */}
      {groupedData && groupedData.length > 0 ? (
        groupedData.map((group, index) => (
          <Carousel.Item key={index}>
            <div className={`d-flex justify-content-around flex-wrap ${styles.carouselItem}`}>
              {group.map((word, i) => {
                return (
                  <div key={i} className={`card ${styles.customCard}`}>
                    <div className="card-body text-center">
                      <div className="word-box">
                        <h5 className="card-title">{word}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <div className={`d-flex justify-content-around flex-wrap ${styles.carouselItem}`}>
            <div className={`card ${styles.customCard}`}>
              <div className="card-body text-center">
                <div className="word-box">
                  <h5>No words available</h5>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default HeaderSlider;
