import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { state } = useLocation();
  const { massage, type } = state || {};
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

  useEffect(() => {
    if (massage) {
      notify(massage, type);
    }
  }, []);
  return (
    <div className="container-fluid container">
      <div className="row">
        <div
          className="col-md-6 "
          style={{
            paddingTop: "5rem",
          }}
        >
          <h1
            className="display-1"
            style={{
              fontFamily: "Roboto Condensed",
              //make it extra bold
              fontWeight: "700",
              color: "#f8312f",
            }}
          >
            BloodBell🩸
          </h1>
          <h3
            className="display-4"
            style={{
              fontFamily: "Roboto Condensed",
              //make it extra bold
              fontWeight: "700",
              color: "#f8312f",
            }}
          >
            Donate Blood, Save Lives
          </h3>
          <p className="lead">
            BloodBell is a platform to connect blood donors and blood
            recipients.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              className="btn btn-primary btn-lg px-4 me-md-2"
              type="button"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn btn-outline-secondary btn-lg px-4"
              type="button"
              to="/register"
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="./images/hero.jpg"
            alt="blood"
            className="img-fluid"
            style={{
              height: "90%",
              width: "100%",
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
