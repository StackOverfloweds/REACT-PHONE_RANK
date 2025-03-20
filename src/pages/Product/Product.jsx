import React from "react";

const Product = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {/* Contoh Produk */}
        <div className="col-md-4">
          <div className="card">
            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">Smartphone A</h5>
              <p className="card-text">A powerful smartphone with amazing features.</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">Smartphone B</h5>
              <p className="card-text">High performance with a sleek design.</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">Smartphone C</h5>
              <p className="card-text">Best in class features with premium build.</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;
