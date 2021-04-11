import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styles from "../styles/landing.module.css";
import setAuthToken from "../utils/setAuthToken";

const Landing = () => {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);

  const history = useHistory();

  const endpoint = "https://comp4537-healthtracker-server.herokuapp.com";
  // const endpoint = "http://localhost:5000";

  setAuthToken(localStorage.token);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        endpoint + "/API/v1/patients"
      );

      setPatients(data);
      console.log(data);
    };

    fetchData();
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchBtnSubmit = (e) => {
    e.preventDefault();

    console.log(patients);

    // Check if ID is exist in "patients"
    if (patients.filter((p) => p.patient_id == search).length > 0) {
      // Get patient ID or Name from the form and send it to backend route
      history.push(`/patient/${search}`);
    } else {
      alert("Patient Not Found");
    }
  };

  const registerBtnSubmit = (e) => {
    e.preventDefault();
    history.push(`/register`);
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.fullPage}>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Patient Tracker</h1>
        <form className={styles.formContainer}>
          <div className="form-group">
            <label className={styles.label}>Search Client ID</label>
            <div className={styles.flexContainer}>
              <input
                type="text"
                className={`form-control ${styles.inputStyle}`}
                name="search"
                value={search}
                onChange={(e) => searchHandler(e)}
              />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => searchBtnSubmit(e)}
              >
                Search
              </button>
            </div>
            <button
              type="submit"
              className={`btn btn-secondary ${styles.registerButton} btn-block`}
              onClick={(e) => registerBtnSubmit(e)}
            >
              Register New Patient
            </button>
            {localStorage.getItem("isAdmin") == 1 && (
              <button
                type="submit"
                className={`btn btn-info btn-block`}
                onClick={() => {
                  history.push("/4537/termproject/API/V1/admin");
                }}
              >
                Go to Admin Page
              </button>
            )}
            <button
              className={`btn btn-danger btn-block`}
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Landing;
