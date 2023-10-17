import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiLink, FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
const BloodBankCard = ({ bloodBank, handleAppointment, index }) => {
  const replaceSpaceWithPlus = (str) => {
    return str.replace(/\s/g, "+");
  };

  return (
    <div>
      <div
        className="card m-2"
        style={{
          width: "18rem",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{bloodBank[1]}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{bloodBank[5]}</h6>
          <p className="card-text">
            <MdOutlineLocationOn /> {bloodBank[2]}
          </p>
          <p className="card-text">
            <FiPhoneCall />{" "}
            {bloodBank[3] == "" ? "Not Available" : bloodBank[3]}
          </p>
          <p className="card-text">
            <HiOutlineMail />{" "}
            {bloodBank[4] == "" ? "Not Available" : bloodBank[4]}
          </p>
          <p className="card-text">{bloodBank[6]} Km Away From Your Location</p>
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleAppointment(index);
                }}
              >
                Book Appointment
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${replaceSpaceWithPlus(
                      bloodBank[2]
                    )}`
                  );
                }}
              >
                View on Google Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBankCard;
