import React from "react";
import styles from "../styles/med_form.module.css";

const MedForm = ({ name, dosage, medHandler, disable = false }) => {
  console.log(name);
  return (
    <div className={styles.medicationForm}>
      <div className={styles.medContainer}>
        <div className={styles.medInfoContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.medLabel}>Medication Name:</label>
            <select
              id="sex"
              type="text"
              className={`form-control ${styles.inputStyle}`}
              name="name"
              value={name}
              onChange={(e) => medHandler(e)}
              disabled={disable}
            >
              <option>Adderall</option>
              <option>Aspirin</option>
              <option>Methadone</option>
              <option>Ibuprofen</option>
              <option>Codeine</option>
              <option>Hydrocodone</option>
              <option>Corticosteroids</option>
              <option>Xanax</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.medLabel}>Dosage:</label>
            <input
              type="number"
              min="0"
              className={`form-control ${styles.inputStyle}`}
              name="dosage"
              value={dosage}
              onChange={(e) => medHandler(e)}
              disabled={disable}
            />
            <p className={styles.dosage}>mg/day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedForm;
