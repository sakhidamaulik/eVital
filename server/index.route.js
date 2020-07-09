const express = require("express");
const patientRoutes = require("./patients/patients.route");
const router = express.Router();

router.use("/patients", patientRoutes);

module.exports = router;
