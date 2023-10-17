import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PopupMenu } from "react-simple-widgets";
import { CgProfile } from "react-icons/cg";
import "./header.css";
const Header = ({ isLoggedIn, setLoggedIn }) => {
  const [firstLetter, setFirstLetter] = useState("");
  const [openbox, setOpenbox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const firstLetter = user.name.charAt(0).toUpperCase();
      setFirstLetter(firstLetter);
      console.log(firstLetter);
    }
  }, [firstLetter]);
  const token = localStorage.getItem("authToken");

  const genrateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };
  const color = genrateRandomColor();

  return (
    <nav
      className="navbar navbar-expand-lg "
      style={{
        height: "80px",
        zIndex: "100",
      }}
    >
      <div className="container-fluid container">
        <Link
          to={token ? "/dashboard" : "/"}
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginRight: "10px",
          }}
        >
          BloodBell🩸
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="searchbloodbanks"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2069/2069788.png"
                  alt="car"
                  style={{
                    height: "30px",
                    width: "30px",
                  }}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  Nearest Blood Bank
                </span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link" to="nearbyCamps">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2069/2069788.png"
                  alt="car"
                  style={{
                    height: "30px",
                    width: "30px",
                  }}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  Blood Donation Camps
                </span>
              </Link>
            </li> */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3629/3629625.png"
              alt="car"
              style={{
                height: "30px",
                width: "30px",
                marginLeft: "20px",
                marginTop: "10px",
              }}
            />
            <li className="nav-item">
              <Link
                className="nav-link"
                to="scoreboard"
                style={{
                  marginLeft: "10px",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "black",
                }}
              >
                Scoreboard
              </Link>
            </li>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5486/5486267.png"
              alt="car"
              style={{
                height: "30px",
                width: "30px",
                marginLeft: "20px",
                marginTop: "10px",
              }}
            />
            <li className="nav-item">
              <Link
                className="nav-link"
                to="bloodAvailability"
                style={{
                  marginLeft: "10px",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "black",
                }}
              >
                Blood Availability
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5752/5752153.png"
                  alt="car"
                  style={{
                    height: "30px",
                    width: "30px",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                />
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="feed"
                    style={{
                      marginLeft: "10px",
                      alignItems: "center",
                      textAlign: "center",
                      fontSize: "1.2rem",
                      color: "black",
                    }}
                  >
                    Feed
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          {isLoggedIn ? (
            <div className="d-flex">
              {/* <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("user");
                  navigate("/", {
                    state: {
                      massage: "You are logged out successfully",
                      type: "success",
                    },
                  });
                  // setLogin(false);
                  setLoggedIn(false);
                }}
                to="/login"
                className="btn btn-dark button"
                style={{
                  marginRight: "10px",
                }}
              >
                Logout
              </button> */}
              <div
                className="profile"
                style={{
                  //make it circular
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#fcba03",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenbox(!openbox);
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {firstLetter === "" ? "X" : firstLetter}
                </span>
              </div>
              <div
                className="box"
                style={{
                  position: "absolute",
                  top: "70px",
                  right: "20px",
                  padding: "10px",
                  // width: "200px",
                  // height: "200px",
                  backgroundColor: "white",
                  zIndex: "100",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  visibility: openbox ? "visible" : "hidden",
                }}
              >
                <div
                  className="profile"
                  style={{
                    //make it circular
                    height: "80px",
                    width: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#fcba03",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {firstLetter === "" ? "X" : firstLetter}
                  </span>
                </div>
                {/* <div
                  style={{
                    marginTop: "10px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {JSON.parse(localStorage.getItem("user")).email}
                </div> */}

                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => {
                    setOpenbox(false);
                  }}
                >
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => {
                    setOpenbox(false);
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/donationStatus"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    setOpenbox(false);
                  }}
                >
                  Donation Status
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user");
                    navigate("/", {
                      state: {
                        massage: "You are logged out successfully",
                        type: "success",
                      },
                    });
                    // setLogin(false);
                    setLoggedIn(false);
                  }}
                  to="/login"
                  className="btn btn-dark button"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="buttons">
              <Link
                to="/login"
                className="btn btn-dark button"
                style={{
                  marginRight: "10px",
                }}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-dark button">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
