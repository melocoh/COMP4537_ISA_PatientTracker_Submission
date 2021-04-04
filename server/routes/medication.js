import express from "express";
import con from "../db/connectDB.js";
import auth from "../middleware/auth.js";
import StatReport from "../StatReport.js";

const router = express.Router();

// We can delete later, just wanted to easily see all the values
// @Route    GET /API/v1/medications
// @Access  Private
router.get("/", auth, (req, res) => {
  let sql = `Select * from medication m`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    // increments the counter
    StatReport.statsObj["GET:/API/v1/medications"]++;
    console.log(
      "GET:/API/v1/medications : " +
        StatReport.statsObj["GET:/API/v1/medications"]
    );

    return res.json(result);
  });
});

// @Route    GET /API/v1/medications/:id
// @Access  Private
router.get("/:id", auth, (req, res) => {
  let sql = `Select * from medication m where m.medication_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    // increments the counter
    StatReport.statsObj["GET:/API/v1/medications/:id"]++;
    console.log(
      "GET:/API/v1/medications/:id : " +
        StatReport.statsObj["GET:/API/v1/medications/:id"]
    );

    return res.json(result);
  });
});

// @Route    DELETE /API/v1/medications/:id
// @Access  Private
router.delete("/:id", auth, (req, res) => {
  let sql = `Delete from PatientDosage d where d.medication_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    sql = `Delete from Medication m where m.medication_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("Medication Deleted");

      // increments the counter
      StatReport.statsObj["DELETE:/API/v1/medications/:id"]++;
      console.log(
        "DELETE:/API/v1/medications/:id : " +
          StatReport.statsObj["DELETE:/API/v1/medications/:id"]
      );

      return res.json(result);
    });
  });
});

// @Route    POST /API/v1/medications
// @Access  Private
router.post("/", auth, (req, res) => {
  const { name } = req.body;

  let sql = `INSERT INTO Medication (name) values ('${name}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    console.log("Medication added to database");

    // increments the counter
    StatReport.statsObj['POST:/API/v1/medications']++;
    console.log("POST:/API/v1/medications : " + StatReport.statsObj['POST:/API/v1/medications']);

    res.json(result);
  });
});

// @Route    PUT /API/v1/medications/:id
// @Access  Private
router.put("/:id", auth, (req, res) => {
  const { name } = req.body;
  let sql = `UPDATE Medication m SET name = '${name}' where m.medication_id = ${req.params.id}`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    console.log("Medication updated!");

    // increments the counter
    StatReport.statsObj['PUT:/API/v1/medications/:id']++;
    console.log("PUT:/API/v1/medications/:id : " + StatReport.statsObj['PUT:/API/v1/medications/:id']);

    res.json(result);
  });
});

export default router;
