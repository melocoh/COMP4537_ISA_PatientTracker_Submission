import axios from "axios";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styles from "../styles/auth.module.css";

const Auth = () => {
  const [auth, setAuth] = useState({
    id: "",
    pw: "",
  });

  const history = useHistory();

  const authHandler = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const authSubmit = async (e) => {

    const endpoint = "https://comp4537-healthtracker-server.herokuapp.com";
    // const endpoint = "http://localhost:5000";

    e.preventDefault();

    if (!auth.id.includes("@")) {
      return alert("Not Email Form.");
    }

    if (auth.pw.length < 6) {
      return alert("Password should be at least 6 digits.");
    }

    try {
      const { data } = await axios.post(
        endpoint + "/API/v1/logins",
        {
          email: auth.id,
          password: auth.pw,
        }
      );

      const { token, isAdmin } = data;
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }

      if (localStorage.getItem("isAdmin")) {
        localStorage.removeItem("isAdmin");
      }
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);

      history.push("/landing");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      alert("Credential Invalid");
    }
  };

  // Redirect if user has token
  if (localStorage.getItem("token")) {
    return <Redirect to="/landing" />;
  }

  return (
    <div className={styles.fullPage}>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Patient Tracker</h1>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="id"
              placeholder="Enter email"
              value={auth.id}
              onChange={(e) => authHandler(e)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="pw"
              placeholder="Password"
              value={auth.pw}
              onChange={(e) => authHandler(e)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            onClick={(e) => authSubmit(e)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
