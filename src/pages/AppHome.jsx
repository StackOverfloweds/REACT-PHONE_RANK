import React, { useState, useEffect } from "react";
import Home from "./Home/Home";
import HeaderSlider from "../components/HeaderSlider";
import style from "../style/LoadingBar.module.css"; // Import CSS module

const AppHome = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // Track loading progress

  // Simulate a loading time of 3 seconds
  useEffect(() => {
    const interval = 30; // Update progress every 30ms
    const totalSteps = 100; // Total steps to reach 100%
    const increment = 100 / (3000 / interval); // Calculate increment per step

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer); // Stop the interval when progress reaches 100%
          setLoading(false); // Hide the loading state
          return 100;
        }
        return prevProgress + increment; // Increment progress
      });
    }, interval);

    return () => clearInterval(timer); // Clean up the interval when component unmounts
  }, []);

  return (
    <div className="container mt-5">
      {/* Show loading bar while content is loading */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className={style.loadingContainer}>
            <div
              className={style.loadingBar}
              style={{ width: `${progress}%` }} // Dynamically set width based on progress
            ></div>
            <p className="mt-2">{Math.round(progress)}%</p>
          </div>
        </div>
      ) : (
        <>
          {/* Make for Header */}
          <div>
            <HeaderSlider />
          </div>
          {/* Make for home with Bootstrap margin-top class */}
          <div className="mt-5">
            <Home />
          </div>
        </>
      )}
    </div>
  );
};

export default AppHome;