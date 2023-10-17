import React, { useEffect, useState } from "react";
import axios from "axios";
import serevr from "../config/index";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updation, setUpdation] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adharno, setAdharno] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [specificCity, setSpecificCity] = useState("");
  const [state, setState] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setName(user.name);
    setEmail(user.email);
    setAdharno(user.adharno);
    setBloodGroup(user.bloodGroup);
    setCity(user.city);
    setContact(user.contact);
    setDob(user.dob);
    setSpecificCity(user.specificCity);
    setState(user.state);
    setUserId(user._id);
    console.log(user);
  }, [localStorage.getItem("user")]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const body = JSON.stringify({
      userId,
      name,
      email,
      adharno,
      bloodGroup,
      contact,
      city,
      state,
      specificCity,
      dob,
    });
    try {
      const res = await axios.post(
        `${serevr}/api/auth/updateUser`,
        body,
        config
      );
      console.log(res.data);
      setUpdation(false);
      //set user in local storage
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid container">
      <div
        className="card"
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #000",
        }}
      >
        <div className="row">
          <div
            className="col-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <h1
              className="text-center"
              style={{ fontFamily: "Roboto Condensed" }}
            >
              Profile
            </h1>
            <a
              onClick={() => {
                setUpdation(!updation);
                console.log(updation);
              }}
              className="btn btn-primary"
              style={{
                width: "100px",
                height: "45px",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png"
                style={{
                  width: "30",
                  height: "30px",
                }}
              />
            </a>
          </div>
          <div className="col-12">
            <p style={{ border: "1px solid #000" }}></p>
          </div>
        </div>
        <div className="row" style={{ fontFamily: "Roboto Condensed" }}>
          <div className="col-md-3">
            <img
              src={
                user?.gender === "male"
                  ? "./images/boy.jpg"
                  : "./images/girl.jpg"
              }
              alt="profile pic"
              className="img-fluid"
            />
          </div>
          <div className="col-md-5">
            <div className="row">
              <div
                className="col-12 
                mt-2
              "
              >
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={email}
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={adharno}
                  className="form-control"
                  placeholder="Adhar No"
                  onChange={(e) => {
                    setAdharno(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={bloodGroup}
                  className="form-control"
                  placeholder="Blood Group"
                  onChange={(e) => {
                    setBloodGroup(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={city}
                  className="form-control"
                  placeholder="City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={contact}
                  className="form-control"
                  placeholder="Contact"
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={dob}
                  className="form-control"
                  placeholder="Date of Birth"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={specificCity}
                  className="form-control"
                  placeholder="Specific City"
                  onChange={(e) => {
                    setSpecificCity(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  value={state}
                  className="form-control"
                  placeholder="State"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  disabled={!updation}
                />
              </div>
            </div>
            {updation ? (
              <div className="row mt-2">
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    onClick={updateProfile}
                    style={{ width: "100%" }}
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
