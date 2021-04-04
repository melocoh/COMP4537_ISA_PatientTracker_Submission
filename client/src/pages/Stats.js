import React, { useEffect, useState } from "react";
import axios from "axios";

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
    </>
  );
};

export default Stats;
