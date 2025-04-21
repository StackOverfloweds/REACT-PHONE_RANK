import { useState } from "react";
import { createSmartphone } from "../../../api/admin";

const CreateSmartphone = () => {
  const [form, setForm] = useState({
    brand: { name: "" },
    display: {
      screen_size: "",
      refresh_rate: "",
      resolution_width: "",
      resolution_height: "",
    },
    battery: {
      capacity: "",
      fast_charging_available: false,
      fast_charging: "",
    },
    camera: {
      num_rear_cameras: "",
      primary_camera_rear: "",
      primary_camera_front: "",
    },
    processor: {
      brand: "",
      model: "",
      num_cores: "",
      speed: "",
    },
    model: "",
    price: "",
    avg_rating: "",
    is_5G: false,
    ram_capacity: "",
    internal_memory: "",
    os: "",
    extended_memory_available: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const [section, field] = name.split(".");
      setForm((prevForm) => ({
        ...prevForm,
        [section]: {
          ...prevForm[section],
          [field]: checked,
        },
      }));
    } else if (name.includes(".")) {
      const [section, field] = name.split(".");
      setForm((prevForm) => ({
        ...prevForm,
        [section]: {
          ...prevForm[section],
          [field]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parsing numbers
    const parsedForm = {
      ...form,
      price: Number(form.price),
      avg_rating: Number(form.avg_rating),
      processor: {
        ...form.processor,
        num_cores: Number(form.processor.num_cores),
        speed: Number(form.processor.speed),
      },
      display: {
        ...form.display,
        screen_size: Number(form.display.screen_size),
        refresh_rate: Number(form.display.refresh_rate),
        resolution_width: Number(form.display.resolution_width),
        resolution_height: Number(form.display.resolution_height),
      },
      battery: {
        ...form.battery,
        capacity: Number(form.battery.capacity),
        fast_charging: Number(form.battery.fast_charging),
      },
      camera: {
        ...form.camera,
        num_rear_cameras: Number(form.camera.num_rear_cameras),
        primary_camera_rear: Number(form.camera.primary_camera_rear),
        primary_camera_front: Number(form.camera.primary_camera_front),
      },
      ram_capacity: Number(form.ram_capacity),
      internal_memory: Number(form.internal_memory),
    };

    console.log("Parsed Form:", parsedForm);

    try {
      const response = await createSmartphone(parsedForm);
      console.log("res ", response)
      // Check if the response is successful
      if (response) {
        window.location.href = "/admin/dashboard";
      } else {
        console.error("Failed to add smartphone:", response);
        alert("Failed to add smartphone. Please check the data sent.");
      }
    } catch (err) {
      console.error("Error sending data:", err);
      alert("An error occurred. Please check the log for details.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Smartphone</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <input
          className="form-control my-2"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="brand.name"
          placeholder="Brand"
          value={form.brand.name}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="avg_rating"
          placeholder="Average Rating"
          type="number"
          value={form.avg_rating}
          onChange={handleChange}
        />

        {/* Processor */}
        <h5>Processor</h5>
        <input
          className="form-control my-2"
          name="processor.brand"
          placeholder="Processor Brand"
          value={form.processor.brand}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="processor.model"
          placeholder="Processor Model"
          value={form.processor.model}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="processor.num_cores"
          placeholder="Number of Cores"
          type="number"
          value={form.processor.num_cores}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="processor.speed"
          placeholder="Processor Speed (GHz)"
          type="number"
          value={form.processor.speed}
          onChange={handleChange}
        />

        {/* Display */}
        <h5>Display</h5>
        <input
          className="form-control my-2"
          name="display.screen_size"
          placeholder="Screen Size (inches)"
          type="number"
          value={form.display.screen_size}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="display.refresh_rate"
          placeholder="Refresh Rate (Hz)"
          type="number"
          value={form.display.refresh_rate}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="display.resolution_width"
          placeholder="Resolution Width"
          type="number"
          value={form.display.resolution_width}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="display.resolution_height"
          placeholder="Resolution Height"
          type="number"
          value={form.display.resolution_height}
          onChange={handleChange}
        />

        {/* Battery */}
        <h5>Battery</h5>
        <input
          className="form-control my-2"
          name="battery.capacity"
          placeholder="Battery Capacity (mAh)"
          type="number"
          value={form.battery.capacity}
          onChange={handleChange}
        />
        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="battery.fast_charging_available"
            checked={form.battery.fast_charging_available}
            onChange={handleChange}
          />
          <label className="form-check-label">Fast Charging Available</label>
        </div>
        <input
          className="form-control my-2"
          name="battery.fast_charging"
          placeholder="Fast Charging (Watts)"
          type="number"
          value={form.battery.fast_charging}
          onChange={handleChange}
        />

        {/* Camera */}
        <h5>Camera</h5>
        <input
          className="form-control my-2"
          name="camera.num_rear_cameras"
          placeholder="Number of Rear Cameras"
          type="number"
          value={form.camera.num_rear_cameras}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="camera.primary_camera_rear"
          placeholder="Primary Rear Camera (MP)"
          type="number"
          value={form.camera.primary_camera_rear}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="camera.primary_camera_front"
          placeholder="Primary Front Camera (MP)"
          type="number"
          value={form.camera.primary_camera_front}
          onChange={handleChange}
        />

        {/* Additional Info */}
        <input
          className="form-control my-2"
          name="ram_capacity"
          placeholder="RAM Capacity (GB)"
          type="number"
          value={form.ram_capacity}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="internal_memory"
          placeholder="Internal Memory (GB)"
          type="number"
          value={form.internal_memory}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="os"
          placeholder="Operating System"
          value={form.os}
          onChange={handleChange}
        />
        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="extended_memory_available"
            checked={form.extended_memory_available}
            onChange={handleChange}
          />
          <label className="form-check-label">Extended Memory Available</label>
        </div>
        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="is_5G"
            checked={form.is_5G}
            onChange={handleChange}
          />
          <label className="form-check-label">Is 5G</label>
        </div>

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateSmartphone;
