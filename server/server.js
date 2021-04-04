import express from "express";
import cors from "cors";
import medicationRouter from "./routes/medication.js";
import patientRouter from "./routes/patient.js";
import doseRouter from "./routes/dose.js";
import authRouter from "./routes/auth.js";

// Swagger documentation imports
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(cors());

app.use(express.json({extended: false}));
app.use('/API/v1/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/API/v1/patients", patientRouter);
app.use("/API/v1/medications", medicationRouter);
app.use("/API/v1/doses", doseRouter);
app.use("/API/v1/logins", authRouter);

app.get("*", (req, res) => {
  res.json("Not Found");
});

// PORT CONNECTION
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
