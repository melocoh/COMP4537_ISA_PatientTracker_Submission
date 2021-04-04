import bcrypt from "bcryptjs";
import con from "./connectDB.js";

const staffs = [
  {
    email: "A01234567@gmail.com",
    name: "Jay Han",
    password: bcrypt.hashSync("123456", 10),
    position: "Surgeon",
  },
  {
    email: "A76543210@gmail.com",
    name: "Melody Oh",
    password: bcrypt.hashSync("123456", 10),
    position: "Dermatology",
  },
  {
    email: "A11111111@gmail.com",
    name: "Jieun Yu",
    password: bcrypt.hashSync("123456", 10),
    position: "Psychiatrist",
  },
];

const addStaff = () => {
  for (let staff of staffs) {
    let sql = `INSERT INTO HospitalStaff (staff_email, name, password, position) values ('${staff.email}','${staff.name}','${staff.password}','${staff.position}')`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Staff added to database");
    });
  }
};

addStaff();