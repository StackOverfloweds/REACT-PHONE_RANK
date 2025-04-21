import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateSmartphone, getSmartphoneById } from "../../../api/admin";

const UpdateSmartphone = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSmartphoneById(id);
        setForm({
          name: response.name,
          brand: response.brand,
          price: response.price,
        });
      } catch (err) {
        console.error("Failed to fetch smartphone:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSmartphone(id, form);
      window.location.href = "/admin/phones";
    } catch (err) {
      console.error("Failed to update smartphone:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Smartphone</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default UpdateSmartphone;
