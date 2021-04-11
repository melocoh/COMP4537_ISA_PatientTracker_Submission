import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import styles from "../styles/landing.module.css";

const NotFound = () => {
  const history = useHistory();

  if (!localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  const toLanding = (e) => {
    e.preventDefault();
    history.push("/landing");
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.pageConatiner}>
        <h1 className={styles.title}>Not Found</h1>
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={(e) => toLanding(e)}
        >
          Back to Landing Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
