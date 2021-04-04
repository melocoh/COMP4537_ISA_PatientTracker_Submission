import express from "express";
import con from "../db/connectDB.js";
import auth from "../middleware/auth.js";
import StatReport from "../StatReport.js";

const router = express.Router();

// We can delete later, just wanted to easily see all the values
// @Route    GET /API/v1/doses
// @Access  Private
router.get("/", auth, (req, res) => {
  let sql = `Select * from PatientDosage d`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    // increments the counter
    StatReport.statsObj['GET:/API/v1/doses']++;
    console.log("GET:/API/v1/doses : " + StatReport.statsObj['GET:/API/v1/doses']);

    return res.json(result);
  });
});

// @Route    GET /API/v1/doses/:pId/:mId
// @Access  Private
router.get("/:pId/:mId", auth, (req, res) => {
  let sql = `Select * from PatientDosage d where d.patient_id = ${req.params.pId} and d.medication_id = ${req.params.mId}`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    // increments the counter
    StatReport.statsObj['GET:/API/v1/doses/:pId/:mId']++;
    console.log("GET:/API/v1/doses/:pId/:mId : " + StatReport.statsObj['GET:/API/v1/doses/:pId/:mId']);

    return res.json(result);
  });
});

// @Route    DELETE /API/v1/doses/:pId/:mId
// @Access  Private
router.delete("/:pId/:mId", auth, (req, res) => {
  let sql = `Delete from PatientDosage d where d.patient_id = ${req.params.pId} and d.medication_id = ${req.params.mId}`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("Dosage Deleted");

    // increments the counter
    StatReport.statsObj['DELETE:/API/v1/doses/:pId/:mId']++;
    console.log("DELETE:/API/v1/doses/:pId/:mId : " + StatReport.statsObj['DELETE:/API/v1/doses/:pId/:mId']);

    return res.json(result);
  });
});

// @Route    POST /API/v1/doses/:pId/:mId
// @Access  Private
router.post("/:pId/:mId", auth, (req, res) => {
  const { dosage } = req.body;

  let sql = `INSERT INTO PatientDosage (patient_id, medication_id, dosage) values (${req.params.pId},${req.params.mId},${dosage})`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    console.log("PatientDosage added to database");

    // increments the counter
    StatReport.statsObj['POST:/API/v1/doses/:pId/:mId']++;
    console.log("POST:/API/v1/doses/:pId/:mId : " + StatReport.statsObj['POST:/API/v1/doses/:pId/:mId']);

    res.json(result);
  });
});

export default router;
