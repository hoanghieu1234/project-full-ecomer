import React from "react";
import "./index.css";
const OrderManager = () => {
  return (
    <div className="wrapper-home">
      <div className="content-home">
        <div className="order-list">
          <h2>Manager Order</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>order date</th>
                <th>Product</th>
                <th>Total Money</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Hoàng Hiếu</td>
                <td>0899548260</td>
                <td>user1@example.com</td>
                <td>19/07/20</td>
                <td>iphone 6</td>
                <td>12.00$</td>
                <td>Pending</td>
                <td>
                  <button class="btn-delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
