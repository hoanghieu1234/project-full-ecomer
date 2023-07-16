import React from "react";
import "./index.css";
const UserManager = () => {
  return (
    <div className="wrapper-home">
      <div className="content-home">
        <h2>Manager User</h2>
        <input
          type="text"
          class="search-input"
          placeholder="Search for user..."
        ></input>
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FistName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nguyễn</td>
              <td>Văn A</td>
              <td>user1@example.com</td>
              <td>0123456789</td>
              <td>
                <button class="btn-edit">Block</button>
                <button class="btn-delete">isBlock</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
