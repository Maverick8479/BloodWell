import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import server from "./config/index";
import SearchBloodBanks from "./screens/SearchBloodBanks";
import BloodDonationCamps from "./screens/BloodDonationCamps";
import DonationProcess from "./screens/DonationProcess";
import BloodBanksToDonate from "./screens/BloodBanksToDonate";
import Appointment from "./screens/Appointment";
import DonationStatus from "./screens/DonationStatus";
import ScoreBoard from "./screens/ScoreBoard";
import BloodAvailability from "./screens/BloodAvailability";
import Profile from "./screens/Profile";
import Feed from "./screens/Feed";
const App = () => {
  //check if the authToken is available in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const loggedIn = localStorage.getItem("authToken");

  const loadUser = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server}/api/auth/validStatus`,
        {
          token: loggedIn,
        },
        config
      );
      console.log(res.data);
      if (res.data.success) {
        setIsLoggedIn(true);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      setLoading(false);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    setLoading(true);
    if (loggedIn) {
      loadUser();
    }
    setLoading(false);
  }, [loggedIn]);

  const setLoggedIn = (state) => {
    setIsLoggedIn(state);
    console.log("logged in");
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/findBloodBankToDonate"
                element={<BloodBanksToDonate />}
              />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/donationStatus" element={<DonationStatus />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/searchbloodbanks" element={<SearchBloodBanks />} />
            <Route path="/nearbyCamps" element={<BloodDonationCamps />} />
            <Route path="/donationProcess" element={<DonationProcess />} />
            <Route path="/scoreBoard" element={<ScoreBoard />} />
            <Route path="/bloodAvailability" element={<BloodAvailability />} />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/register"
              element={<Register setLoggedIn={setLoggedIn} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
