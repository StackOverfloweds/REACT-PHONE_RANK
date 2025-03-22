import React, { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetch";
import { getSmartphones, getSmartphoneByID } from "../../api/smartphoneAPI";
import styles from "../../style/product.module.css";

const Product = () => {
  const { data: smartphones, error, loading } = useFetchData(getSmartphones);
  const [selectedSmartphone, setSelectedSmartphone] = useState(null);
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleProductClick = async (id) => {
    try {
      const smartphoneData = await getSmartphoneByID(id);
      const combinedData = {
        ...smartphoneData.smartphone, 
        image_url: smartphoneData.image_url, 
      };
      console.log(combinedData)
      setSelectedSmartphone(combinedData);
      setShowModal(true); 
    } catch (err) {
      console.error("Error fetching smartphone details:", err);
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSmartphone(null);
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className={`container mt-4 ${styles.container}`}>
      {/* Card untuk Our Products */}
    <div className="d-flex justify-content-center mb-4">
      <div className="card shadow-sm p-3" style={{ maxWidth: "400px", backgroundColor: "#fff" }}>
        <div className="card-body text-center">
          <h3 className="card-title fw-bold" style={{ color: "#333" }}>Our Products</h3>
          <p className="card-text text-muted">Explore our latest smartphone collection</p>
        </div>
      </div>
    </div>

      <div className="row">
        {smartphones.map((phone) => {
          const { image_url, smartphone } = phone;
          const brand = smartphone?.brand?.name || "Unknown Brand";
          const model = smartphone?.model || "Unknown Model";
          const imageSrc = image_url ? `${baseURL}${image_url}` : "/placeholder.jpg";
          const phoneId = smartphone?.id;

          return (
            <div key={phoneId} className={`col-md-4 col-lg-3 mb-4 ${styles.cardContainer}`}>
              <div className={`card h-100 border ${styles.customCard}`}>
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
                  <button 
                    className="btn" 
                    style={{ backgroundColor: "#E3FDFD", color: "#333", border: "1px solid #5F99AE" }} 
                    onClick={() => handleProductClick(phoneId)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 Modal Popup */}
      {showModal && selectedSmartphone && (
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedSmartphone.brand?.name.toUpperCase()} - {selectedSmartphone.model}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body text-center">
              {/* 🖼️ Gambar Produk */}
              {selectedSmartphone.image_url && (
                <img
                  src={`${baseURL}${selectedSmartphone.image_url}`}
                  alt={selectedSmartphone.model}
                  className="img-fluid mb-3"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}

              {/* 📝 Spesifikasi */}
              <p><strong>OS:</strong> {selectedSmartphone.os.toUpperCase()}</p>
              <p><strong>Processor:</strong> {selectedSmartphone.processor.brand} ({selectedSmartphone.processor.speed} GHz)</p>
              <p><strong>RAM:</strong> {selectedSmartphone.ram_capacity} GB</p>
              <p><strong>Internal Memory:</strong> {selectedSmartphone.internal_memory} GB {selectedSmartphone.extended_memory_available ? "(Expandable)" : ""}</p>
              <p><strong>Display:</strong> {selectedSmartphone.display.screen_size} inch, {selectedSmartphone.display.resolution_width} x {selectedSmartphone.display.resolution_height} px, {selectedSmartphone.display.refresh_rate}Hz</p>
              <p><strong>Camera:</strong> {selectedSmartphone.camera.primary_camera_rear} MP (Rear) | {selectedSmartphone.camera.primary_camera_front} MP (Front)</p>
              <p><strong>Battery (Fast Charging):</strong> {selectedSmartphone.battery.fast_charging_available ? "Yes" : "No"}</p>
              <p><strong>5G Support:</strong> {selectedSmartphone.is_5G ? "Yes" : "No"}</p>
              <p><strong>Rating:</strong> {selectedSmartphone.avg_rating} ⭐</p>

              {/* 💰 Harga */}
              <h4 className="mt-3 text-success">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedSmartphone.price)}
              </h4>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )}

      
      {/* Overlay untuk modal */}
      {showModal && <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>}
    </div>
  );
};

export default Product;
