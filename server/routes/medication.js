import express from "express";
import con from "../db/connectDB.js";

const router = express.Router();

// @Route    GET /API/v1/medications/:id
// @Access  Private
router.get("/:id", (req, res) => {
  let sql = `Select * from medication m where m.medication_id = ${req.params.id}`;
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
    StatReport.statsObj["GET:/API/v1/medications/:id"];
    console.log(
      "GET:/API/v1/medications/:id : " +
        StatReport.statsObj["GET:/API/v1/medications/:id"]
    );

    return res.json(result);
  });
});

export default router;
