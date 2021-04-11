import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MedForm from "../components/MedForm";
import styles from "../styles/patient_register.module.css";

const PatientRegister = () => {

  const endpoint = "https://comp4537-healthtracker-server.herokuapp.com";
  // const endpoint = "http://localhost:5000";

  const [info, setInfo] = useState({
    name: "",
    sex: "",
    age: 0,
    weight: 0,
    condition: "",
    prescription: {},
  });

  const [med, setMed] = useState({
    name: "",
    dosage: 0,
  });

  const history = useHistory();

  const infoHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });

    console.log(info);
  };

  const medHandler = (e) => {
    setMed({
      ...med,
      [e.target.name]: e.target.value,
    });

    console.log(med);
  };

  const infoSubmit = async (e) => {
    e.preventDefault();

    setInfo({ ...info, prescription: med });

    if (/\d/.test(info.name)) {
      return alert("Name cannot contain numbers");
    }

    let { data } = await axios.post(
      endpoint + `/API/v1/patients`,
      {
        full_name: info.name,
        sex: info.sex,
        age: parseInt(info.age),
        weight: parseInt(info.weight),
        patient_condition: info.condition,
      }
    );

    console.log(data);

    const id = data.insertId;

    let pId = 4;

    switch (med.name) {
      case "Adderall":
        pId = 4;
        break;
      case "Aspirin":
        pId = 14;
        break;
      case "Methadone":
        pId = 24;
        break;
      case "Ibuprofen":
        pId = 34;
        break;
      case "Codeine":
        pId = 44;
        break;
      case "Hydrocodone":
        pId = 54;
        break;
      case "Corticosteroids":
        pId = 64;
        break;
      case "Xanax":
        pId = 74;
        break;
      default:
        pId = 4;
        break;
    }

    // POST /API/v1/doses/:pId/:mId
    data = await axios.post(
      endpoint + `/API/v1/doses/${id}/${pId}`,
      {
        dosage: parseInt(med.dosage),
      }
    );

    history.push(`/patient/${id}`);
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.pageContainer}>
        {/* Patient Information */}
        <h2 className={styles.title}>Patient Information</h2>
        <form className={styles.formContainer}>
          <div className="form-group">
            <div className={styles.inputContainer}>
              <label className={styles.label}>Full Name:</label>
              <input
                type="text"
                className={`form-control ${styles.inputStyle}`}
                name="name"
                value={info.name}
                onChange={(e) => infoHandler(e)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Sex:</label>
              <select
                id="sex"
                type="text"
                className={`form-control ${styles.inputStyle}`}
                name="sex"
                value={info.sex}
                onChange={(e) => infoHandler(e)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Age:</label>
              <input
                type="number"
                className={`form-control ${styles.inputStyle}`}
                name="age"
                min="0"
                value={info.age}
                onChange={(e) => infoHandler(e)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Weight:</label>
              <input
                type="number"
                className={`form-control ${styles.inputStyle}`}
                name="weight"
                min="0"
                step="0.01"
                value={info.weight}
                onChange={(e) => infoHandler(e)}
              />
              <p className={styles.unit}>Kg</p>
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>Condition:</label>
              <input
                type="text"
                className={`form-control ${styles.inputStyle}`}
                name="condition"
                value={info.condition}
                onChange={(e) => infoHandler(e)}
              />
            </div>
            {/* Medication */}
            <h5 className={styles.subTitle}>Medication Information</h5>

            <MedForm
              name={med.name}
              dosage={med.dosage}
              medHandler={medHandler}
            />

            {/* Submit Button */}
            <div className={styles.registerBtnContainer}>
              <button
                type="submit"
                className={`btn btn-secondary btn-lg ${styles.registerButton}`}
                onClick={(e) => infoSubmit(e)}
              >
                Register
              </button>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                history.push("/landing");
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
