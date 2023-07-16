import React, { useState } from "react";
import "./index.css";
const ProductManager = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // Xử lý lưu thông tin sản phẩm vào cơ sở dữ liệu
    // Sau đó có thể ẩn form bằng cách đặt lại trạng thái showForm về false
    setShowForm(false);
  };

  return (
    <div className="wrapper-home">
      <div className="content-home">
        <div className="product-actions">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for product..."
          />
          <button
            type="button"
            id="addProductButton"
            onClick={handleAddProductClick}
          >
            Create Product
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmitForm} className="product-form">
            <div className="form-row">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="form-row">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" required />
            </div>
            <div className="form-row">
              <label htmlFor="category">Category:</label>
              <input type="text" id="category" name="category" required />
            </div>
            <div className="form-row">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" required />
            </div>
            <div className="form-row">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" required />
            </div>
            <div className="form-row">
              <button type="submit">Save Product</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="product-list">
          <h2>Manager Product</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>iPhone 12</td>
                <td>1200000</td>
                <td>Điện thoại</td>
                <td>imgase</td>
                <td>1</td>
                <td>
                  <button type="button" className="edit-btn">
                    Edit
                  </button>
                  <button type="button">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
