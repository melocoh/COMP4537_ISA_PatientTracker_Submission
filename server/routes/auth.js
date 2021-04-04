import express from "express";
import validator from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import con from "../db/connectDB.js";
import StatReport from "../StatReport.js";

const router = express.Router();
const {check, validationResult} = validator;

dotenv.config();

// @Route   POST api/v1/logins
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      let sql = `Select id, password from hospitalstaff h where h.staff_email = '${email}'`;
      con.query(sql, async (err, result) => {
        if (err) throw err;
        console.log(result);

        if (result.length === 0) {
          return res
            .status(400)
            .json({errors: [{msg: "Invalid Credentials"}]});
        }

        const isMatch = await bcrypt.compare(password, result[0].password);

        if (!isMatch) {
          return res
            .status(400)
            .json({errors: [{msg: "Invalid Credentials"}]});
        }

        // Return jsonwebtoken
        const payload = {
          user: {
            id: result[0].id
          }
        };

        jwt.sign(
          payload,
          process.env.JWTTOKEN,
          {expiresIn: 360000},
          (err, token) => {
            if (err) throw err;

            res.json({token});
          }
        );
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Can we change where this is located? I think it should be in admin.js
// @Route   POST api/v1/logins/stats
// @access  Public
router.get("/stats", (req, res)=>{

  res.json(StatReport.statsObj);

});

export default router;