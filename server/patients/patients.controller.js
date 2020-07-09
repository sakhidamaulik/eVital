const httpStatus = require("http-status");
const db = require("../config/database");

// getPatients  - should return all the patients
async function getPatients(req, res, next) {
  try {
    const patients = await db.patients.findAll({
      raw: true,
      attributes: [
        "id",
        "name",
        "age",
        "gender",
        "patientId",
        "from",
        "lastMeet",
        "dob",
        "mobileNumber",
      ],
    });
    if (patients) {
      res.json({ status: httpStatus.OK, patients });
    } else {
      res.json({
        status: httpStatus.NOT_FOUND,
        message: "Patients not found",
      });
    }
  } catch (error) {
    next(error);
  }
}

async function createPatient(req, res, next) {
  try {
    console.log("createPatient");
    const {
      name,
      age,
      gender,
      patientId,
      from,
      lastMeet,
      dob,
      mobileNumber,
    } = req.body;

    // Make sure user doesn't already exists
    const patient = await db.patients.findOne({
      where: {
        mobileNumber,
      },
    });
    if (patient) {
      return res.json({
        status: httpStatus.CONFLICT,
        errors: "Patient is already registered",
      });
    }
    await db.patients
      .create({
        name,
        age,
        gender,
        patientId,
        from,
        lastMeet,
        dob,
        mobileNumber,
      })
      .then((patient) => {
        return res.json({ status: httpStatus.OK, patient });
      })
      .catch((error) => {
        return res.json({ status: httpStatus.NOT_FOUND, error });
      });
  } catch (err) {
    next(err);
  }
}

async function updatePatient(req, res, next) {
  const errors = {};
  try {
    if (!req || !req.params) {
      errors.general = "Path must contain user id";
      return res.json({ status: httpStatus.BAD_REQUEST, errors });
    }
    const {
      name,
      age,
      gender,
      patientId,
      from,
      lastMeet,
      dob,
      mobileNumber,
    } = req.body;
    const id = req.params.id;
    const patientDetail = await db.patients.findOne({
      where: {
        id,
      },
    });
    console.log(patientDetail);
    await db.patients
      .update(
        {
          name,
          age,
          gender,
          patientId,
          from,
          lastMeet,
          dob,
          mobileNumber,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((patient) => {
        return res.json({ status: httpStatus.OK, patient });
      })
      .catch((error) => {
        return res.json({ status: httpStatus.NOT_FOUND, error });
      });
  } catch (err) {
    next(err);
  }
}

exports.delete = (userId) => {
  const id = userId;
  User.destroy({
    where: { id: id },
  })
    .then(() => {
      return id;
    })
    .catch(function (err) {
      console.log("delete failed with error: " + err);
      return 0;
      // handle error;
    });
};

async function deletePatient(req, res, next) {
  const errors = {};
  try {
    if (!req || !req.params) {
      errors.general = "Path must contain user id";
      return res.json({ status: httpStatus.BAD_REQUEST, errors });
    }
    const id = req.params.id;
    await db.patients
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((patient) => {
        return res.json({ status: httpStatus.OK, patient });
      })
      .catch((error) => {
        return res.json({ status: httpStatus.NOT_FOUND, error });
      });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
};
