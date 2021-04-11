import express from "express";
import validator from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import con from "../db/connectDB.js";
import auth from "../middleware/auth.js";
import StatReport from "../StatReport.js";

const router = express.Router();
const { check, validationResult } = validator;

dotenv.config();

// @Route   POST api/v1/logins
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let sql = `Select id, password, isAdmin from hospitalstaff h where h.staff_email = '${email}'`;
      con.query(sql, async (err, result) => {
        if (err) throw err;
        console.log(result);

        const adminRes = result[0].isAdmin;

        if (result.length === 0) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, result[0].password);

        if (!isMatch) {
          return res
            .status(401)
            .json({ errors: [{ msg: "Unauthorized User" }] });
        }

        // Return jsonwebtoken
        const payload = {
          user: {
            id: result[0].id,
            isAdmin: adminRes
          },
        };

        jwt.sign(
          payload,
          process.env.JWTTOKEN,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;

            res.json({ token, isAdmin: adminRes });
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @Route   GET api/v1/logins/stats
// @access  Private
router.get("/stats", auth, (req, res) => {

  if(req.user.isAdmin === 0){
    return res.sendStatus(403);
  }

  res.sendStatus(200).json(StatReport.statsObj);
});

export default router;
