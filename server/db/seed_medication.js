import con from "./connectDB.js";

const medication = [
  {
    name: "Advil",
  },
  {
    name: "Tyrenol",
  },
  {
    name: "Centrom",
  },
];

const addMedication = () => {
  for (let med of medication) {
    let sql = `INSERT INTO Medication (name) values ('${med.name}')`;
    con.query(sql, (err, result) => {
      if (err) throw err;

      console.log("Medication added to database");
    });
  }
};

addMedication();
