import React, { useState, useEffect } from "react";

const StatusCard = ({
  name,
  location,
  email,
  phone,
  type,
  status,
  date,
  time,
}) => {
  const [color, setColor] = useState("red");

  const replaceSpaceWithPlus = (str) => {
    return str.replace(/\s/g, "+");
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
    setColor(genColor(status));
  }, [status]);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Blood Donation Status</h3>
        <h6 className="card-title">{name}</h6>
        <h6 className="card-title">{location}</h6>
        <h6 className="card-title">{email}</h6>
        <h6 className="card-title">{phone}</h6>
        <h6 className="card-title">{type}</h6>
      </div>
      <div className="card-body">
        <h3 className="card-title">Status</h3>
        <h6 className="card-title">
          {status}
          <span
            className="dot"
            style={{
              height: "12px",
              width: "12px",
              backgroundColor: color,
              borderRadius: "50%",
              display: "inline-block",
              marginLeft: "10px",
              alignItems: "center",
              borderColor: "black",
            }}
          ></span>
        </h6>
      </div>
      <div className="card-body">
        <h3 className="card-title">Date</h3>
        <h6 className="card-title">{date}</h6>

        <h3 className="card-title">Time</h3>
        <h6 className="card-title">{time}</h6>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${replaceSpaceWithPlus(
                location
              )}`
            );
          }}
        >
          View on Google Map
        </button>
      </div>
    </div>
  );
};

export default StatusCard;
