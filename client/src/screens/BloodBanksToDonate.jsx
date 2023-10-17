import React, { useState, useEffect } from "react";
import axios from "axios";
import BloodBankCard from "../components/BloodBankCard";
import { useNavigate } from "react-router-dom";

const BloodBanksToDonate = () => {
  const [bloodBank, setBloodBank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const endPoint = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYBLOODBANK&latitude=${lat}&longitude=${long}`;
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    fetchBloodBank();
  }, [endPoint]);

  const handleAppointment = (index) => {
    console.log(index);
    navigate(`/appointment`, {
      state: {
        data: bloodBank[index],
      },
    });
  };

  const fetchBloodBank = async () => {
    await axios
      .get(endPoint)
      .then((res) => {
        setBloodBank(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-fluid container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {bloodBank.map((bloodBank, index) => (
            <BloodBankCard
              key={index}
              bloodBank={bloodBank}
              handleAppointment={handleAppointment}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodBanksToDonate;
