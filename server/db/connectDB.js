// Create DB connection
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const con = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// const con = mysql.createPool({
//   host: "10.0.0.169",
//   user: "weblab",
//   password: "weblab123123",
//   database: "health_tracker",
// });

export default con;
