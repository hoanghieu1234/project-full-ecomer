import React, { useEffect, useState } from "react";
import getUser from "../../api/User.Api";
import "./index.css";
import LoadingComponent from "../Loading";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [valueSearch, setValueSearch] = useState();

  // Get All User
  const getApiUser = async () => {
    const user = await getUser.getAllUser();
    setUsers(user);
  };
  useEffect(() => {
    getApiUser();
  }, []);

  // Call Api Block User
  const handleBlockUser = async (id) => {
    const userId = await getUser.getUserById(id);
    if (!userId) {
      console.log("user không tồn tại");
    }
    // Đảo ngược trạng thái block
    const idBlockUser = userId.isBlocked === true ? false : true;
    userId.isBlocked = idBlockUser;
    await getUser.blockUser(id, userId);
    getApiUser();
  };
  // search value
  const handleOnchange = async (e) => {
    try {
      setValueSearch(e.target.value);
      const data = await getUser.searchUser({ lastname: valueSearch });
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper-home">
      {/* <LoadingComponent /> */}
      <div className="content-home mt-550">
        <h2>Manager User</h2>
        <input
          type="text"
          class="search-input"
          placeholder="Search for user..."
          onChange={handleOnchange}
        ></input>
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FistName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users?.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <button
                        className="btn-edit"
                        id="btn"
                        onClick={() => {
                          handleBlockUser(user._id);
                        }}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
