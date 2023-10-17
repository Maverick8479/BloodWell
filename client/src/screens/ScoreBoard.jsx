import React, { useEffect, useState } from "react";
import server from "../config";
const ScoreBoard = () => {
  const [score, setScore] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchScore = async () => {
      const res = await fetch(`${server}/api/auth/getScoreBoard`);
      const data = await res.json();
      console.log(data.users);
      setScore(data.users);
      setLoading(false);
    };
    fetchScore();
  }, []);

  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Score Board</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                score.map((user, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.donationCount * 10}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
