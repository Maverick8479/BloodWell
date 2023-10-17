import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [search, setSearch] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [statesCode, setStatesCode] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const endPoint = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYBLOODBANK&latitude=${latitude}&longitude=${longitude}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const ststeUrl = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETSTATELIST&statetype=3&lang=0`;
    axios.get(ststeUrl).then((res) => {
      setState(res.data);
      console.log(res.data);
    });

    fetchBlood();
  }, [endPoint]);

  useEffect(() => {
    const cityUrl = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETDISTRICTLIST&selectedStateCode=${selectedState}&lang=0`;
    axios.get(cityUrl).then((res) => {
      setCity(res.data.records);
      // console.log(res.data.records);
    });
  }, [selectedState]);

  const replaceSpaceWithPlus = (str) => {
    return str.replace(/\s/g, "+");
  };

  const fetchBlood = async () => {
    await axios
      .get(endPoint)
      .then((res) => {
        setBloodBanks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const uri = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYBLOODBANK&stateCode=${selectedState}&districtCode=${selectedCity}`;
    axios.get(uri).then((res) => {
      setBloodBanks(res.data.data);
    });

    let filteredBloodBanks = [];
    if (search !== "") {
      for (let i = 0; i < bloodBanks.length; i++) {
        if (bloodBanks[i][1].toLowerCase().includes(search.toLowerCase())) {
          //push as object
          filteredBloodBanks.push(bloodBanks[i]);
        }
      }
    }
    setBloodBanks(filteredBloodBanks);
    console.log(filteredBloodBanks);
  };

  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-12">
          <h1
            className="text-center"
            style={{
              fontFamily: "Roboto Condensed",
            }}
          >
            Nearest Blood Bank(BB)
          </h1>
        </div>

        <div className="col-12">
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <select
            className="form-control"
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedState(e.target.value);
            }}
          >
            <option value="">Select State</option>
            {state.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <select
            className="form-control"
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
          >
            <option value="">Select City</option>
            {city.length > 0 &&
              city.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.id}
                </option>
              ))}
          </select>
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Blood Bank or Hospital Name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div
          className="col-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 ">
          <h3 className="text-center">Blood Banks</h3>
          <hr />
        </div>

        <div className="col-12">
          {bloodBanks.length == 0 ? (
            <h3 className="text-center">No Blood Banks Found</h3>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Blood Bank Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Email</th>
                  <th scope="col">Category</th>
                  <th scope="col">Distance(Km)</th>
                  <th scope="col">Google Map</th>
                </tr>
              </thead>
              <tbody>
                {bloodBanks.map((bloodBank, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{bloodBank[1]}</td>
                    <td>{bloodBank[2]}</td>
                    <td>{bloodBank[3]}</td>
                    <td>
                      {bloodBank[4] == "" ? "Not Available" : bloodBank[4]}
                    </td>
                    <td>{bloodBank[5]}</td>
                    <td>{bloodBank[6]}</td>
                    <td>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${replaceSpaceWithPlus(
                          bloodBank[2]
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBloodBanks;
