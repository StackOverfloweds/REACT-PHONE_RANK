import { useState,useEffect } from "react";
import { searchSmartphones, getSmartphoneByID, getBrands } from "../../api/smartphoneAPI";
import style from "../../style/Search.module.css";

const Searching = () => {
    const [formData, setFormData] = useState({
        brand: "",
        min_price: "",
        max_price: "",
        min_ram: "",
    });
    const [brands, setBrands] = useState([]);
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedSmartphone, setSelectedSmartphone] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const brandData = await getBrands();
            setBrands(brandData);
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setResults([]);
    
        const searchParams = {
            brand: formData.brand,
            min_price: parseFloat(formData.min_price) || 0,
            max_price: parseFloat(formData.max_price) || 0,
            min_ram: parseInt(formData.min_ram) || 0,
        };
    
        try {
            const response = await searchSmartphones(searchParams);
            if (response.error) {
                setMessage(response.error.message || "An error occurred while fetching data.");
                return;
            }
            if (!Array.isArray(response) || response.length === 0) {
                setMessage("No smartphones found matching the criteria.");
                return;
            }
            setResults(response.slice(0, 3)); // Menampilkan 3 hasil teratas
        } catch (error) {
            console.error("Error fetching smartphones:", error);
            setMessage("Failed to fetch data. Please try again later.");
        }
    };
    

    const handleProductClick = async (id) => {
        try {
          const smartphoneData = await getSmartphoneByID(id);
      
          if (smartphoneData?.error === "Unauthorized") {
            navigate("/login"); 
            return;
          }
      
          console.log("Smartphone Data:", smartphoneData);
      
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

    return (
        <div>
            <div className={style.container}>
                <h2 className={style.title}>Search Smartphones</h2>
                <form onSubmit={handleSubmit} className={style.form}>
                <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className={style.input}
            >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>

                    <input type="number" name="min_price" placeholder="Min Price" value={formData.min_price} onChange={handleChange} className={style.input} />
                    <input type="number" name="max_price" placeholder="Max Price" value={formData.max_price} onChange={handleChange} className={style.input} />
                    <input type="number" name="min_ram" placeholder="Min RAM (GB)" value={formData.min_ram} onChange={handleChange} className={style.input} />
                    <button type="submit" className={style.button}>Search</button>
                </form>
                {message && <p className={style.message}>{message}</p>}
            </div>

            <div className="row mt-4 justify-content-center">
            {/* Card Recommendation */}
            {results.length > 0 && (
                <div className="col-12 d-flex justify-content-center mb-4">
                    <div className="card shadow-sm p-3" style={{ maxWidth: "300px", backgroundColor: "#fff" }}>
                        <div className="card-body text-center">
                            <h3 className="card-title fw-bold" style={{ color: "#333" }}>Recomendation</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Smartphone Cards */}
            {results.map((phone) => {
                const { image_url, smartphone } = phone;
                const brand = smartphone?.brand?.name || "Unknown Brand";
                const model = smartphone?.model || "Unknown Model";
                const imageSrc = image_url ? `${baseURL}${image_url}` : "/placeholder.jpg";
                const phoneId = smartphone?.id;

                return (
                    <div key={phoneId} className="col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                        <div className={`card h-100 border ${style.customCard}`} style={{ width: "18rem" }}>
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

export default Searching;
