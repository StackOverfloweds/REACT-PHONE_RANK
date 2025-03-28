import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold text-blue-600">MAUT PhoneRank</span>! We provide the best smartphone ranking system using the 
          <strong className="text-blue-700"> Multi-Attribute Utility Theory (MAUT)</strong>. Our system helps users find 
          the best smartphone based on various parameters like processor, RAM, camera, and price.
        </p>

        <h4 className="text-2xl font-semibold text-blue-700 mt-6">Our Mission</h4>
        <p className="text-gray-700 leading-relaxed">
          To make smartphone selection easier by providing a smart and unbiased ranking system.
        </p>

        <h4 className="text-2xl font-semibold text-blue-700 mt-6">Why Choose Us?</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
          <li>📊 Accurate and unbiased ranking</li>
          <li>🔍 Easy-to-use filtering options</li>
          <li>📱 Wide range of smartphones covered</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
