import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
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
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    if (massage) {
      notify(massage, type);
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="container-fluid container">
      <h1 className="text-center">Welcome {user.name}</h1>
      <div className="row">
        <Link
          to="/donationprocess"
          className="btn btn-primary"
          style={{
            width: "50%",
            margin: "auto",
            marginTop: "10px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Blood Donation Process
        </Link>
      </div>
      <div className="row">
        <div className="col-md-12">
          <img src="./images/process.png" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <Link to="/findBloodBankToDonate" className="btn btn-primary">
            Find Blood Bank to Donate
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/findNearestCampToDonate" className="btn btn-primary">
            Find Blood Donation Camp
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/applyOpenDonation" className="btn btn-primary">
            Apply for Open Donation
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
