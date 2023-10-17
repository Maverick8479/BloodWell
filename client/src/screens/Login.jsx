import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import server from "../config/index";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard", {
        state: {
          massage: "You are already logged in",
          type: "info",
        },
      });
    }
  }, []);

  const notify = (message, type) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      notify("Please fill all the fields", "error");
      return;
    }

    setLoading(true);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${server}/api/auth/login`,
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoggedIn(true);
      setLoading(false);
      navigate("/dashboard", {
        state: {
          massage: "You are logged in successfully",
          type: "success",
        },
      });
    } catch (err) {
      setLoading(false);
      notify(err.response.data.message, "error");
    }
  };
  return (
    <>
      {loading ? (
        // <Loader />
        <div className="loader">
          <div className="loader__inner">Loading</div>
        </div>
      ) : (
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center ">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-5 p-md-5">
                    <h3
                      className="mb-4 pb-2"
                      style={{
                        color: "#1c2331",

                        textAlign: "center",
                      }}
                    >
                      Login
                    </h3>
                    <form>
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="name"
                              className="form-control form-control-md"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <label className="form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12 mb-4">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="lastName"
                              className="form-control form-control-md"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label className="form-label">
                              Password <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Submit"
                          onClick={loginHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default Login;
