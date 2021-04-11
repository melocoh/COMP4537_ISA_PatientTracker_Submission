import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MedForm from "../components/MedForm";
import styles from "../styles/patient_info.module.css";

const PatientInfo = ({ match }) => {
  const [patient, setPatient] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [med, setMed] = useState({
    name: "",
    dosage: 0,
  });

  const [info, setInfo] = useState({
    name: "",
    sex: "",
    age: 0,
    weight: 0,
    condition: "",
    prescription: {},
  });

  const endpoint = "https://comp4537-healthtracker-server.herokuapp.com";
  // const endpoint = "http://localhost:5000";

  const patientId = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        endpoint + `/API/v1/patients/${patientId}`
      );
      setPatient(data);

      console.log(data);

      setMed({
        name: data.prescription[0].name,
        dosage: data.prescription[0].dosage,
      });

      setInfo({
        name: data.full_name,
        sex: data.sex,
        age: data.age,
        weight: data.weight,
        condition: data.patient_condition,
      });
    };

    fetchData();
  }, [match.params.id, patientId]);

  const editBtnHandler = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const deleteBtnHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        endpoint + `/API/v1/patients/${patientId}`
      );
    } catch (error) {
      console.log(error);
    }

    history.push("/landing");
  };

  const history = useHistory();

  const infoHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const medHandler = (e) => {
    setMed({
      ...med,
      [e.target.name]: e.target.value,
    });
  };

  const editFinishHandler = async (e) => {
    e.preventDefault();

    setInfo({ ...info, prescription: med });

    if (/\d/.test(info.name)) {
      return alert("Name cannot contain numbers");
    }

    await axios.put(
      endpoint + `/API/v1/patients/${patientId}`,
      {
        full_name: info.name,
        sex: info.sex,
        age: parseInt(info.age),
        weight: parseInt(info.weight),
        patient_condition: info.condition,
      }
    );

    console.log(patient);

    try {
      await axios.put(
        endpoint + `/API/v1/doses/${patientId}/${patient.prescription[0].medication_id}`,
        {
          name: med.name,
          dosage: parseInt(med.dosage),
        }
      );
    } catch (error) {
      console.log(error);
    }

    setIsEdit(false);
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.pageContainer}>
        {/* Patient Information */}
        <h2 className={styles.title}>Patient Information - ID: {patientId}</h2>
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disable={!isEdit}
              />
            </div>
            {/* Medication */}
            <h5 className={styles.subTitle}>Medication Information</h5>

            <MedForm
              name={med.name}
              dosage={med.dosage}
              medHandler={medHandler}
              disable={!isEdit}
            />

            {/* Submit Button */}
            {isEdit && (
              <div className={styles.btnContainer}>
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.editBtn}`}
                  onClick={(e) => editFinishHandler(e)}
                >
                  UPDATE
                </button>
              </div>
            )}
            {!isEdit && (
              <div className={styles.btnContainer}>
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.editBtn}`}
                  onClick={(e) => editBtnHandler(e)}
                >
                  EDIT
                </button>
                <button
                  type="submit"
                  className={`btn btn-secondary btn-lg ${styles.deleteBtn}`}
                  onClick={(e) => deleteBtnHandler(e)}
                >
                  Delete Patient
                </button>
              </div>
            )}
            <button
              className={`btn btn-danger ${styles.backBtn}`}
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

export default PatientInfo;
