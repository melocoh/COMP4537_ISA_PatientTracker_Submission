import con from "./connectDB.js";

const patients = [
  {
    fullName: "Jason Jin",
    sex: "Male",
    age: "23",
    weight: "60.4",
    patient_condition: "Bleeding on the shoulder",
  },
  {
    fullName: "Tyler Lee",
    sex: "Male",
    age: "21",
    weight: "65.2",
    patient_condition: "Nightmare",
  },
  {
    fullName: "Katy Kim",
    sex: "Female",
    age: "26",
    weight: "52.8",
    patient_condition: "Eczema",
  },
];

const addPatients = () => {
  for (let patient of patients) {
    let sql = `INSERT INTO Patient (full_name, sex, age, weight, patient_condition) values ('${patient.fullName}', '${patient.sex}', ${patient.age}, ${patient.weight}, '${patient.patient_condition}')`;
    con.query(sql, (err, result) => {
      if (err) throw err;

      console.log("Patients added to database");
    });
  }
};

addPatients();
