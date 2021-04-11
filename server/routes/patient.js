import express from "express";
import validator from "express-validator";
import con from "../db/connectDB.js";
import auth from "../middleware/auth.js";
import StatReport from "../StatReport.js";
const { check, validationResult } = validator;
const router = express.Router();

// @Route    GET /API/v1/patients
// @Access  Private
router.get("/", auth, (req, res) => {
  let sql = `Select * from patient p`;
  con.query(sql, (err, result) => {
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // increments the counter
    StatReport.statsObj["GET:/API/v1/patients"]++;
    console.log(
      "GET: /API/v1/patients: " + StatReport.statsObj["GET:/API/v1/patients"]
    );

    return res.json(result);
  });
});

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
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // invalid ID
    if (result.length < 1) {
      return res.sendStatus(404);
    }

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
    StatReport.statsObj["GET:/API/v1/patients/:id"]++;
    console.log(
      "GET:/API/v1/patients/:id : " +
        StatReport.statsObj["GET:/API/v1/patients/:id"]
    );

    return res.json(resJson);
  });
});

// @Route    DELETE /API/v1/patients/:id
// @Access  Private
router.delete("/:id", auth, (req, res) => {
  let sql = `Delete from PatientDosage where patient_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    sql = `Delete from Patient where patient_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
      // server error
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      // invalid ID
      if (!req.params.id || result.affectedRows < 1) {
        return res.sendStatus(404);
      }

      console.log("Patient Deleted");

      // increments the counter
      StatReport.statsObj["DELETE:/API/v1/patients/:id"]++;
      console.log(
        "DELETE:/API/v1/patients/:id : " +
          StatReport.statsObj["DELETE:/API/v1/patients/:id"]
      );

      return res.json(result);
    });
  });
});

// @Route    POST /API/v1/patients
// @Access  Private
router.post("/", auth, (req, res) => {
  const { full_name, sex, age, weight, patient_condition } = req.body;

  // invalid input
  if (
    !full_name ||
    typeof full_name !== "string" ||
    !sex ||
    typeof sex !== "string" ||
    age == null ||
    typeof age !== "number" ||
    weight == null ||
    typeof weight !== "number" ||
    !patient_condition ||
    typeof patient_condition !== "string"
  ) {
    return res.sendStatus(400);
  }

  let sql = `INSERT INTO Patient (full_name, sex, age, weight, patient_condition) values ('${full_name}', '${sex}', ${age}, ${weight}, '${patient_condition}')`;
  con.query(sql, (err, result) => {
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    console.log("Patients added to database");

    // increments the counter
    StatReport.statsObj["POST:/API/v1/patients"]++;
    console.log(
      "POST:/API/v1/patients : " + StatReport.statsObj["POST:/API/v1/patients"]
    );

    // successful creation
    res.status(201).json(result);
  });
});

// @Route    PUT /API/v1/patients/:id
// @Access  Private
router.put("/:id", auth, (req, res) => {
  const { full_name, sex, age, weight, patient_condition } = req.body;

  // invalid input
  if (
    !full_name ||
    typeof full_name !== "string" ||
    !sex ||
    typeof sex !== "string" ||
    age == null ||
    typeof age !== "number" ||
    weight == null ||
    typeof weight !== "number" ||
    !patient_condition ||
    typeof patient_condition !== "string"
  ) {
    return res.sendStatus(400);
  }

  let sql = `UPDATE Patient p SET full_name = '${full_name}', sex = '${sex}', age = ${age}, weight = ${weight}, patient_condition = '${patient_condition}' where p.patient_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // invalid ID
    if (!req.params.id || result.affectedRows < 1) {
      return res.sendStatus(404);
    }

    console.log("Patient updated!");

    // increments the counter
    StatReport.statsObj["PUT:/API/v1/patients/:id"]++;
    console.log(
      "PUT:/API/v1/patients/:id : " +
        StatReport.statsObj["PUT:/API/v1/patients/:id"]
    );

    res.status(200).json(result);
  });
});

export default router;
