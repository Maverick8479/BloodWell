import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import server from "../config/index";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state || {};

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmission = () => {
    if (date === "" || time === "") {
      alert("Please fill in the date and time");
      return;
    }

    if (new Date(date) < new Date()) {
      alert("Please select a date in the future");
      return;
    }
    if (time < "09:00" || time > "17:00") {
      alert("Please select a time between 09:00 and 17:00");
      return;
    }

    let userId = localStorage.getItem("user").split('"')[3];

    axios
      .post(`${server}/api/donation/addDonation`, {
        bloodBank: data,
        donor: userId,
        date,
        time,
      })
      .then((res) => {
        console.log(res);
        navigate("/dashboard", {
          state: {
            massage:
              "Appointment successfully created, Check your profile for more details",
            type: "success",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/dashboard", {
          state: {
            massage: err.response.data.message,
            type: "error",
          },
        });
      });
  };

  useEffect(() => {
    if (!data) {
      navigate("/dashboard");
    }
    console.log(data);
  }, [data]);

  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Book Appointment</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="card-title">Blood Bank Name: {data[1]}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Blood Bank Address: {data[2]}
                  </h6>
                  <p className="card-text">
                    Blood Bank Phone:{" "}
                    {data[3] == "" ? "Not Available" : data[3]}
                  </p>
                  <p className="card-text">
                    Blood Bank Email:{" "}
                    {data[4] == "" ? "Not Available" : data[4]}
                  </p>
                  <p className="card-text">Distance: {data[6]} Km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            placeholder="Date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="date">Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            placeholder="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={handleSubmission}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
