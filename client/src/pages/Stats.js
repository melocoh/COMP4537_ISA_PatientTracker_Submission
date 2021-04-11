import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Stats = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://comp4537-healthtracker-server.herokuapp.com/API/v1/logins/stats"
      );
      setStats(data);
    };
    fetchData();
  }, []);

  const history = useHistory();

  if (localStorage.getItem("isAdmin") == 0) {
    return <Redirect to="/landing" />;
  }

  return (
    <>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Route</th>
            <th style={{ border: "1px solid black" }}>Requests</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((key) => (
            <tr key={key}>
              <td style={{ border: "1px solid black" }}>{key}</td>
              <td style={{ border: "1px solid black" }}>{stats[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className={`btn btn-danger`}
        onClick={() => {
          history.push("/landing");
        }}
      >
        Back
      </button>
    </>
  );
};

export default Stats;
