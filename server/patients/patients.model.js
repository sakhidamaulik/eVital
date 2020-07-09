module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "patients",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      patientId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastMeet: {
        type: DataTypes.DATE,
      },
      dob: {
        type: DataTypes.DATE,
      },
      mobileNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Patient;
};
