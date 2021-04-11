import express from "express";
import validator from "express-validator";
import con from "../db/connectDB.js";
import auth from "../middleware/auth.js";
import StatReport from "../StatReport.js";
const { check, validationResult } = validator;
const router = express.Router();

// @Route    GET /API/v1/doses/:pId/:mId
// @Access  Private
router.get("/:pId/:mId", auth, (req, res) => {
  let sql = `Select * from PatientDosage d where d.patient_id = ${req.params.pId} and d.medication_id = ${req.params.mId}`;
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

    // increments the counter
    StatReport.statsObj["GET:/API/v1/doses/:pId/:mId"]++;
    console.log(
      "GET:/API/v1/doses/:pId/:mId : " +
        StatReport.statsObj["GET:/API/v1/doses/:pId/:mId"]
    );

    return res.json(result);
  });
});

// @Route    DELETE /API/v1/doses/:pId/:mId
// @Access  Private
router.delete("/:pId/:mId", auth, (req, res) => {
  let sql = `Delete from PatientDosage where patient_id=${req.params.pId} and medication_id=${req.params.mId}`;
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

    console.log("Dosage Deleted");

    // increments the counter
    StatReport.statsObj["DELETE:/API/v1/doses/:pId/:mId"]++;
    console.log(
      "DELETE:/API/v1/doses/:pId/:mId : " +
        StatReport.statsObj["DELETE:/API/v1/doses/:pId/:mId"]
    );

    return res.json(result);
  });
});

// @Route    PUT /API/v1/doses/:pId/:mId
// @Access  Private
router.put("/:pId/:mId", auth, (req, res) => {
  const { dosage, name } = req.body;

  // invalid input
  if (
    dosage == null ||
    typeof dosage !== "number" ||
    !name ||
    typeof name !== "string"
  ) {
    return res.sendStatus(400);
  }

  let sql = `UPDATE PatientDosage SET dosage = '${dosage}' where medication_id=${req.params.mId} and patient_id=${req.params.pId}`;
  con.query(sql, (err, result) => {
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // invalid ID
    if (result.affectedRows < 1) {
      return res.sendStatus(404);
    }

    let sql = `UPDATE Medication SET name = '${name}' where medication_id=${req.params.mId}`;
    con.query(sql, (err, result) => {
      // server error
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      console.log("Patient's medication dosage updated!");

      // increments the counter
      StatReport.statsObj["PUT:/API/v1/doses/:pId/:mId"]++;
      console.log(
        "PUT:/API/v1/doses/:pId/:mId : " +
          StatReport.statsObj["PUT:/API/v1/doses/:pId/:mId"]
      );

      res.json(result);
    });
  });
});

// Valid: isdigit
// @Route    POST /API/v1/doses/:pId/:mId
// @Access  Private
router.post("/:pId/:mId", auth, (req, res) => {
  const { dosage } = req.body;

  // invalid input
  if (dosage == null || typeof dosage !== "number") {
    return res.sendStatus(400);
  }

  let sql = `INSERT INTO PatientDosage (patient_id, medication_id, dosage) values (${req.params.pId},${req.params.mId},${dosage})`;
  con.query(sql, (err, result) => {
    // server error
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // invalid ID
    if (result.affectedRows < 1) {
      return res.sendStatus(404);
    }

    console.log("PatientDosage added to database");

    // increments the counter
    StatReport.statsObj["POST:/API/v1/doses/:pId/:mId"]++;
    console.log(
      "POST:/API/v1/doses/:pId/:mId : " +
        StatReport.statsObj["POST:/API/v1/doses/:pId/:mId"]
    );

    // successful creation
    res.status(201).json(result);
  });
});

export default router;
