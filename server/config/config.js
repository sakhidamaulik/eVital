const Joi = require("joi");
require("dotenv").config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  PORT: Joi.number().default(8081),
  MYSQL_HOST: Joi.string().required().description("MySQL DB host url"),
  MYSQL_USERNAME: Joi.string().required().description("MySql DB user"),
  MYSQL_PASSWORD: Joi.string().required().description("MySql DB user password"),
  MYSQL_DATABASE: Joi.string().required().description("MySql DB database"),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    username: envVars.MYSQL_USERNAME,
    password: envVars.MYSQL_PASSWORD,
    database: envVars.MYSQL_DATABASE,
  },
};

module.exports = config;
