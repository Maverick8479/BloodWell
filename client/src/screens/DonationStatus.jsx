import React, { useState, useEffect } from "react";
import axios from "axios";
import serevr from "../config/index";
import StatusCard from "../components/StatusCard";

const DonationStatus = () => {
  const [bloodBank, setBloodBank] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("red");
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const replaceSpaceWithPlus = (str) => {
    return str.replace(/\s/g, "+");
  };
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const genColor = (status) => {
    if (status === "Pending") {
      return "yellow";
    } else if (status === "Accepted") {
      return "green";
    } else if (status === "Rejected") {
      return "red";
    } else if (status === "Completed") {
      return "green";
    } else {
      return "red";
    }
  };
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${serevr}/api/donation/getDonationbyId`,
        {
          userIds: userId,
        },
        config
      )
      .then((res) => {
        res.data.donations.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setBloodBank(res.data.donations);
        console.log(res.data.donations);
        console.log(bloodBank);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid container">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : bloodBank.length > 0 ? (
        //make a table and show all the donations
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Blood Bank</th>
              <th scope="col">Location</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Blood Type</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Status
              </th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Google Map</th>
            </tr>
          </thead>
          <tbody>
            {bloodBank.map((bloodBank, index) => (
              <tr key={index}>
                <td>{bloodBank.bloodBank[1]}</td>
                <td>{bloodBank.bloodBank[2]}</td>
                <td>{bloodBank.bloodBank[4]}</td>
                <td>{bloodBank.bloodBank[3]}</td>
                <td>{bloodBank.bloodBank[5]}</td>
                <td>
                  {bloodBank.status}
                  <span
                    className="dot"
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: genColor(bloodBank.status),
                      borderRadius: "50%",
                      display: "inline-block",
                      marginLeft: "10px",
                      alignItems: "center",
                      borderColor: "black",
                    }}
                  ></span>
                </td>
                <td>{bloodBank.date}</td>
                <td>{bloodBank.time}</td>
                <td>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${replaceSpaceWithPlus(
                      bloodBank.bloodBank[2]
                    )}`}
                    target="_blank"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
                      alt="google map"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No Donation Request</h1>
      )}
    </div>
  );
};

export default DonationStatus;
