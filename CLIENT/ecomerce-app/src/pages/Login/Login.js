import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "../../redux/reduce/userSlice";
import { updateState } from "../../redux/reduce/updateSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const loginData = await dispatch(login(value)).unwrap();
      if (loginData && loginData.isBlocked == false) {
        navigate("/");
      } else {
        toast.error("Tài khoản bị khóa!", {
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

      dispatch(updateState());
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form
                  action="/login"
                  method="POST"
                  className="d-flex flex-column gap-30 "
                  onSubmit={handleSubmit}
                >
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={handleChangeInputLogin}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={handleChangeInputLogin}
                    />
                  </div>

                  <div>
                    <Link to="/forgot-password" className="mb-3">
                      Forgot Password?
                    </Link>
                    <div className="d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">Login</button>
                      <Link to="/sign-up" className="button signup">
                        SignUp
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
