import React, { useEffect, useState } from "react";
import axios from "axios";

const BloodAvailability = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bloodAvailability, setBloodAvailability] = useState([]);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodComponent, setBloodComponent] = useState("");
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [statesCode, setStatesCode] = useState("");
  const [availableBlood, setAvailableBlood] = useState([]);
  useEffect(() => {
    const ststeUrl = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETSTATELIST&statetype=3&lang=0`;
    axios.get(ststeUrl).then((res) => {
      setState(res.data);
      console.log(res.data);
    });
  }, []);
  useEffect(() => {
    const cityUrl = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETDISTRICTLIST&selectedStateCode=${selectedState}&lang=0`;
    axios.get(cityUrl).then((res) => {
      setCity(res.data.records);
      // console.log(res.data.records);
    });
  }, [selectedState]);

  //   https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=19&districtCode=342&bloodGroup=17&bloodComponent=11&lang=0&_=1669138620108

  const handleSearch = () => {
    if (selectedState === "" || selectedCity === "") {
      alert("Please select state and city");
      return;
    }
    if (bloodGroup === "" || bloodComponent === "") {
      alert("Please select blood group and component");
      return;
    }
    const uri = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=${selectedState}&districtCode=${selectedCity}&bloodGroup=${bloodGroup}&bloodComponent=${bloodComponent}&lang=0`;
    axios.get(uri).then((res) => {
      //sort the data that contains "<p class='text-success'>"

      const temp = res.data.data;
      //clear the array
      setAvailableBlood([]);
      console.log(temp);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i][3].includes("<p class='text-success'>")) {
          availableBlood.push(temp[i]);
        }
      }
      setBloodBanks(availableBlood);
    });
  };

  return (
    <div className="container-fluid container ">
      <div className="row">
        <div className="col-12">
          <h1
            className="text-center"
            style={{
              fontFamily: "Roboto Condensed",
            }}
          >
            Blood Availability
          </h1>
        </div>

        <div className="col-12">
          <hr />
        </div>
      </div>
      <div
        className="row"
        style={{
          fontFamily: "Roboto Condensed",
        }}
      >
        <div className="col-md-3">
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
        <div className="col-md-3">
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
        <div className="col-md-3">
          <select
            className="form-control"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
          >
            <option value="-1">Select Blood Group</option>
            <option value="18">AB-Ve</option>
            <option value="17">AB+Ve</option>
            <option value="12">A-Ve</option>
            <option value="11">A+Ve</option>
            <option value="14">B-Ve</option>
            <option value="13">B+Ve</option>
            <option value="23">Oh-VE</option>
            <option value="22">Oh+VE</option>
            <option value="16">O-Ve</option>
            <option value="15">O+Ve</option>
            <option value="all">All Blood Groups</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            onChange={(e) => {
              setBloodComponent(e.target.value);
            }}
          >
            <option value="-1">Select Blood Component</option>
            <option value="11">Whole Blood</option>
            <option value="14">Single Donor Platelet</option>
            <option value="18">Single Donor Plasma</option>
            <option value="28">Sagm Packed Red Blood Cells</option>
            <option value="16">Platelet Rich Plasma</option>
            <option value="15">Platelet Poor Plasma</option>
            <option value="20">Platelet Concentrate</option>
            <option value="19">Plasma</option>
            <option value="12">Packed Red Blood Cells</option>
            <option value="30">Leukoreduced Rbc</option>
            <option value="29">Irradiated RBC</option>
            <option value="13">Fresh Frozen Plasma</option>
            <option value="17">Cryoprecipitate</option>
            <option value="21">Cryo Poor Plasma</option>
          </select>
        </div>

        <div
          className="col-12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="col-12">
        <hr />
      </div>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Blood Banks</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Blood Bank Name</th>
                <th>Category</th>
                <th>Avaliable Stock</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {bloodBanks.length > 0 &&
                bloodBanks.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td dangerouslySetInnerHTML={{ __html: item[1] }}></td>
                    <td>{item[2]}</td>
                    {/* <td>{item[3]}</td> */}
                    <td dangerouslySetInnerHTML={{ __html: item[3] }}></td>
                    {/* <td dangerouslySetInnerHTML={{ __html: item[4] }}></td> */}
                    <td>
                      {item[4].includes("live_stock.png") ? (
                        <h6 style={{ color: "green" }}>Live</h6>
                      ) : (
                        item[4]
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodAvailability;
