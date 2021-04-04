import con from "./connectDB.js";

const PatientDosage = [
  {
    dosage: "15",
  },
  {
    dosage: "20",
  },
  {
    dosage: "30",
  },
];

const addDosage = () => {
  let id = 4;
  for (let dose of PatientDosage) {
    let sql = `INSERT INTO PatientDosage (medication_id, patient_id, dosage) values (${id},${id},${dose.dosage})`;
    con.query(sql, (err, result) => {
      if (err) throw err;

      console.log("PatientDosage added to database");
    });

    id += 10;
  }
};

addDosage();
