import React from "react";
import "./index.css";
import { RiAdminFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const local = useLocation();
  return (
    <div className="wrapper">
      <div className="logo">
        <RiAdminFill />
        Admin
      </div>
      <div className="list-item">
        <ul className="list-item-route">
          <li className={local.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={local.pathname === "/user" ? "active" : ""}>
            <Link to="/user">User Manager</Link>
          </li>
          <li className={local.pathname === "/product" ? "active" : ""}>
            <Link to="/product">Product Manager</Link>
          </li>
          <li className={local.pathname === "/order" ? "active" : ""}>
            <Link to="/order">Order Manager</Link>
          </li>
        </ul>
      </div>
      <SlLogout title="Logout here!" className="logout" />
    </div>
  );
};

export default Sidebar;
