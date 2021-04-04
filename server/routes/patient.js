import express from "express";
import con from "../db/connectDB.js";
import auth from "../middleware/auth.js";
import StatReport from "../StatReport.js";

const router = express.Router();

// We can delete later, just wanted to easily see all the values
// @Route    GET /API/v1/patients
// @Access  Private
router.get("/", auth, (req, res) => {
  let sql = `Select * from patient p`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    // increments the counter
    StatReport.statsObj['GET:/API/v1/patients']++;
    console.log("GET: /API/v1/patients: " + StatReport.statsObj['GET:/API/v1/patients']);

    return res.json(result);
  });
});

// @Route    GET /API/v1/patients/:id
// @Access  Private
// router.get("/:id", auth, (req, res) => {
//   let sql = `Select * from patient p where p.patient_id = ${req.params.id}`;

//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);

//     return res.json(result);
//   });
// });

// @Route    GET /API/v1/patients/:id
// @Access  Private
router.get("/:id", auth, (req, res) => {
  let sql =
    `Select distinct * from PatientDosage d ` +
    `inner join Patient p ` +
    `on d.patient_id = p.patient_id ` +
    `inner join Medication m ` +
    `on m.medication_id = d.medication_id ` +
    `where p.patient_id = ${req.params.id}`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    let resJson = {
      patient_id: result[0].patient_id,
      full_name: result[0].full_name,
      medicine_id: result[0].medicine_id,
      sex: result[0].sex,
      age: result[0].age,
      weight: result[0].weight,
      patient_condition: result[0].patient_condition,
      prescription: [],
    };

    for (let i = 0; i < result.length; i++) {
      resJson.prescription.push({
        medication_id: result[i].medication_id,
        name: result[i].name,
        dosage: result[i].dosage,
      });
    }

    // increments the counter
    StatReport.statsObj['GET:/API/v1/patients/:id']++;
    console.log("GET:/API/v1/patients/:id : " + StatReport.statsObj['GET:/API/v1/patients/:id']);

    return res.json(resJson);
  });
});

// @Route    DELETE /API/v1/patients/:id
// @Access  Private
router.delete("/:id", auth, (req, res) => {
  let sql = `Delete from PatientDosage d where d.patient_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    sql = `Delete from Patient p where p.patient_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("Patient Deleted");

      // increments the counter
      StatReport.statsObj['DELETE:/API/v1/patients/:id']++;
      console.log("DELETE:/API/v1/patients/:id : " + StatReport.statsObj['DELETE:/API/v1/patients/:id']);

      return res.json(result);
    });
  });
});

// @Route    POST /API/v1/patients
// @Access  Private
router.post("/", auth, (req, res) => {
  const { fullName, sex, age, weight, patient_condition } = req.body;
  let sql = `INSERT INTO Patient (full_name, sex, age, weight, patient_condition) values ('${fullName}', '${sex}', ${age}, ${weight}, '${patient_condition}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    console.log("Patients added to database");

    // increments the counter
    StatReport.statsObj['POST:/API/v1/patients']++;
    console.log("POST:/API/v1/patients : " + StatReport.statsObj['POST:/API/v1/patients']);

    res.json(result);
  });
});

// @Route    PUT /API/v1/patients/:id
// @Access  Private
router.put("/:id", auth, (req, res) => {
  const { fullName, sex, age, weight, patient_condition } = req.body;
  let sql = `UPDATE Patient p SET full_name = '${fullName}', sex = '${sex}', age = ${age}, weight = ${weight}, patient_condition = '${patient_condition}' where p.patient_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    console.log("Patient updated!");

    // increments the counter
    StatReport.statsObj['PUT:/API/v1/patients/:id']++;
    console.log("PUT:/API/v1/patients/:id : " + StatReport.statsObj['PUT:/API/v1/patients/:id']);

    res.json(result);
  });
});

export default router;
