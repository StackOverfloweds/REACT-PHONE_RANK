import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useFetchData from "../../../hooks/useFetch";
import { getSmartphones, getSmartphoneByID } from "../../../api/smartphoneAPI";
import styles from "../../../style/viewSmartphone.module.css";
import { updateSmartphone, deleteSmartphone } from "../../../api/admin";
const ViewSmartphones = () => {
  const navigate = useNavigate();
  const { data: smartphones, error, loading } = useFetchData(getSmartphones);
  const [selectedSmartphone, setSelectedSmartphone] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  
  const handleUpdateClick = async (id) => {
    try {
      const smartphoneData = await getSmartphoneByID(id);

      if (smartphoneData?.error === "Unauthorized") {
        navigate("/login"); 
        return;
      }

      if (!smartphoneData || !smartphoneData.smartphone) {
        console.warn("Invalid smartphone data received:", smartphoneData);
        return;
      }

      const combinedData = {
        ...smartphoneData.smartphone, 
        image_url: smartphoneData.image_url, 
      };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSmartphone(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated smartphone data:", selectedSmartphone.id);
  
    try {
      const response = await updateSmartphone(selectedSmartphone.id, selectedSmartphone);
  
      if (response.error) {
        console.error("Failed to update:", response.error);
        alert("Gagal mengupdate data!");
      } else {
        alert("Data berhasil diupdate!");
      }
    } catch (error) {
      console.error("Unhandled error:", error);
      alert("Terjadi kesalahan saat update.");
    }
  
    handleCloseModal();
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus smartphone ini?");
    if (!confirmDelete) return;
  
    try {
      const response = await deleteSmartphone(id); // Pastikan ada fungsi ini di `api/admin.js`
      
      if (response.error) {
        console.error("Gagal menghapus:", response.error);
        alert("Gagal menghapus data!");
      } else {
        alert("Smartphone berhasil dihapus!");
        window.location.reload(); // Bisa diganti dengan re-fetch kalau pakai SWR atau React Query
      }
    } catch (error) {
      console.error("Error saat menghapus:", error);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };
  
  

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className={`container mt-4 ${styles.container}`}>
      {/* Header */}
      <div className="d-flex justify-content-center mb-4">
        <div className="card shadow-sm p-3" style={{ maxWidth: "400px", backgroundColor: "#fff" }}>
          <div className="card-body text-center">
            <h3 className="card-title fw-bold" style={{ color: "#333" }}>Our Products</h3>
            <p className="card-text text-muted">Explore our latest smartphone collection</p>
          </div>
        </div>
      </div>

      {/* Product cards */}
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
                  <div className="d-flex justify-content-center gap-2">
              <button 
                className="btn" 
                style={{ backgroundColor: "#FFF6DC", color: "#333", border: "1px solid #EBA83A" }} 
                onClick={() => handleUpdateClick(phoneId)}
              >
                Update
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => handleDeleteClick(phoneId)}
              >
                Delete
              </button>
            </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form */}
      {showModal && selectedSmartphone && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Update Smartphone - {selectedSmartphone.brand?.name} {selectedSmartphone.model}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body row">
                  <div className="col-md-6">
                    <label className="form-label">Model</label>
                    <input type="text" className="form-control" name="model" value={selectedSmartphone.model || ''} onChange={handleInputChange} />

                    <label className="form-label mt-3">OS</label>
                    <input type="text" className="form-control" name="os" value={selectedSmartphone.os || ''} onChange={handleInputChange} />

                    <label className="form-label mt-3">RAM (GB)</label>
                    <input type="number" className="form-control" name="ram_capacity" value={selectedSmartphone.ram_capacity || ''} onChange={handleInputChange} />

                    <label className="form-label mt-3">Internal Memory (GB)</label>
                    <input type="number" className="form-control" name="internal_memory" value={selectedSmartphone.internal_memory || ''} onChange={handleInputChange} />

                    <label className="form-label mt-3">Price (IDR)</label>
                    <input type="number" className="form-control" name="price" value={selectedSmartphone.price || ''} onChange={handleInputChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Processor Brand</label>
                    <input type="text" className="form-control" name="processor.brand" value={selectedSmartphone.processor?.brand || ''} onChange={handleInputChange} />

                    <label className="form-label mt-3">Processor Speed (GHz)</label>
                    <input type="number" step="0.1" className="form-control" name="processor.speed" value={selectedSmartphone.processor?.speed || ''} onChange={handleInputChange} />

                    <label className="form-label mt-3">5G Support</label>
                    <select className="form-select" name="is_5G" value={selectedSmartphone.is_5G ? "true" : "false"} onChange={e => setSelectedSmartphone(prev => ({ ...prev, is_5G: e.target.value === "true" }))}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                  <button type="submit" className="btn btn-warning">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>}
    </div>
  );
};

export default ViewSmartphones;
