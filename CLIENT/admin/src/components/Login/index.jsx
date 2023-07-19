import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/reduce/adminSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  }, []);
  
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [valueLogin, setValueLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeInputLogin = (e) => {
    setValueLogin({
      ...valueLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const value = valueLogin;
      const loginData = await dispatch(loginAdmin(value)).unwrap();
      if (loginData) {
        Navigate("/");
      } else {
        toast.error("Tài khoản admin không hợp lệ!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // dispatch(updateState());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form id="form-input" onSubmit={handleSubmit}>
        <h3>Login Admin</h3>
        <label htmlFor="username" className="label-login">
          Username
        </label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          name="email"
          onChange={handleChangeInputLogin}
          className="input-login"
        />
        <label htmlFor="password" className="label-login">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={handleChangeInputLogin}
          className="input-login"
        />
        <button className="btn-login">Log In</button>
      </form>
    </>
  );
};

export default Login;
