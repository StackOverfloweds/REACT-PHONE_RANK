import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useFetchData from "../../../hooks/useFetch";
import { getSmartphones, getSmartphoneByID } from "../../../api/smartphoneAPI";
import styles from "../../../style/viewSmartphone.module.css";
import { updateSmartphone, deleteSmartphone, searchSmartphones } from "../../../api/admin";

const ViewSmartphones = () => {
  const navigate = useNavigate();
  const { data: smartphones, error, loading } = useFetchData(getSmartphones);
  const [selectedSmartphone, setSelectedSmartphone] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
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
      setShowUpdateModal(true);
    } catch (err) {
      console.error("Error fetching smartphone details:", err);
    }
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedSmartphone(null);
  };

  const handleCloseSearchModal = () => {
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("processor.")) {
      const key = name.split(".")[1];
      setSelectedSmartphone(prev => ({
        ...prev,
        processor: {
          ...prev.processor,
          [key]: value,
        },
      }));
    } else {
      setSelectedSmartphone(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateSmartphone(selectedSmartphone.id, selectedSmartphone);

      if (response.error) {
        alert("Gagal mengupdate data!");
      } else {
        alert("Data berhasil diupdate!");
        navigate("/admin/phones/view");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat update.");
    }

    handleCloseModal();
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus smartphone ini?");
    if (!confirmDelete) return;

    try {
      const response = await deleteSmartphone(id);

      if (response.error) {
        alert("Gagal menghapus data!");
      } else {
        alert("Smartphone berhasil dihapus!");
        window.location.reload();
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await searchSmartphones({ brand: searchBrand, model: searchModel });
      if (results?.error) {
        alert("Failed to fetch smartphones.");
      } else {
        // The API returns smartphones directly in the data.smartphones array
        const foundSmartphones = results.smartphones;
        const foundImg = results.img_url;
        console.log(results);
        console.log("Search results:", foundSmartphones);
        
        // Combine foundSmartphones and foundImg based on the index, ensuring the image_url is added correctly
        const combinedResults = foundSmartphones.map((smartphone, index) => {
          // Adding image_url from foundImg, defaulting to an empty string if not available
          const image_url = foundImg[index] ? foundImg[index].image_url : '';
          
          return {
            ...smartphone,    // Copy all properties from the smartphone object
            image_url         // Add image_url property
          };
        });
        
        console.log("Combined results:", combinedResults);
        
        // Save the combined results into state
        setSearchResults(combinedResults);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    }
  };
  
  

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className={`container mt-4 ${styles.container}`}>
      {/* Header with Search Form */}
      <div className="d-flex justify-content-center mb-4">
        <div className="card shadow-sm p-3" style={{ maxWidth: "400px", backgroundColor: "#fff" }}>
          <div className="card-body text-center">
            <h3 className="card-title fw-bold" style={{ color: "#333" }}>Search Smartphones</h3>
            <form onSubmit={handleSearchSubmit}>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brand"
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Model"
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                />
                <button type="submit" className="btn btn-warning">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Product cards - showing all smartphones */}
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

      {/* Update Modal Form */}
      {showUpdateModal && selectedSmartphone && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Update Smartphone - {selectedSmartphone.brand?.name} {selectedSmartphone.model}
                  </h5>
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
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

     {/* Search Results Modal */}
{showSearchResults && (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Search Results</h5>
          <button type="button" className="btn-close" onClick={handleCloseSearchModal}></button>
        </div>
        <div className="modal-body">
          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((smartphone) => {
                const brand = smartphone?.brand?.name || "Unknown Brand";
                const model = smartphone?.model || "Unknown Model";
                const phoneId = smartphone?.id;
                const imageSrc = smartphone?.image_url ? `${baseURL}${smartphone.image_url}` : "/placeholder.jpg";  // Use image_url from combinedResults

                return (
                  <div key={phoneId} className="col-md-12 mb-4">
                    <div className="card">
                      <div className="row g-0">
                        <div className="col-md-4">
                          {/* Display the image */}
                          <img
                            src={imageSrc}  // Use the correct image_url
                            className="img-fluid rounded-start"
                            alt={model}
                            style={{ height: "250px", objectFit: "cover", width: "100%" }}
                            onError={(e) => (e.target.src = "/placeholder.jpg")}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h4 className="card-title">{brand} {model}</h4>
                            <div className="row mt-3">
                              <div className="col-md-6">
                                <p><strong>Price:</strong> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(smartphone.price)}</p>
                                <p><strong>OS:</strong> {smartphone.os}</p>
                                <p><strong>RAM:</strong> {smartphone.ram_capacity}GB</p>
                                <p><strong>Storage:</strong> {smartphone.internal_memory}GB</p>
                                <p><strong>5G:</strong> {smartphone.is_5G ? "Yes" : "No"}</p>
                                <p><strong>Rating:</strong> {smartphone.avg_rating}/5</p>
                              </div>
                              <div className="col-md-6">
                                <p><strong>Processor:</strong> {smartphone.processor?.brand} {smartphone.processor?.model}</p>
                                <p><strong>Cores:</strong> {smartphone.processor?.num_cores}</p>
                                <p><strong>Speed:</strong> {smartphone.processor?.speed}GHz</p>
                                <p><strong>Battery:</strong> {smartphone.battery?.capacity}mAh</p>
                                <p><strong>Fast Charging:</strong> {smartphone.battery?.fast_charging_available ? `${smartphone.battery?.fast_charging}W` : "No"}</p>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-md-6">
                                <p><strong>Display:</strong> {smartphone.display?.screen_size}" {smartphone.display?.resolution_width}x{smartphone.display?.resolution_height}</p>
                                <p><strong>Refresh Rate:</strong> {smartphone.display?.refresh_rate}Hz</p>
                              </div>
                              <div className="col-md-6">
                                <p><strong>Cameras:</strong> {smartphone.camera?.num_rear_cameras} rear ({smartphone.camera?.primary_camera_rear}MP main)</p>
                                <p><strong>Front Camera:</strong> {smartphone.camera?.primary_camera_front}MP</p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end gap-2 mt-3">
                              <button 
                                className="btn" 
                                style={{ backgroundColor: "#FFF6DC", color: "#333", border: "1px solid #EBA83A" }} 
                                onClick={() => {
                                  handleUpdateClick(phoneId);
                                  handleCloseSearchModal();
                                }}
                              >
                                Update
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => {
                                  handleDeleteClick(phoneId);
                                  handleCloseSearchModal();
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No results found for your search.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseSearchModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default ViewSmartphones; 