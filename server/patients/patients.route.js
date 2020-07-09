const express = require("express");
const patientsCtrl = require("./patients.controller");

const router = express.Router();

router.get("/", patientsCtrl.getPatients);
router.post("/", patientsCtrl.createPatient);
router.put("/:id", patientsCtrl.updatePatient);
router.delete("/:id", patientsCtrl.deletePatient);

module.exports = router;
