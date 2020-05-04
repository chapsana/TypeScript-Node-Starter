import dotenv from "dotenv";
import Joi from "@hapi/joi";
import fs from "fs";

if (fs.existsSync("./../../.env")) {
  // logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: "./../../.env" });
  console.log("using .env");
} else {
  // logger.debug(
  //   "Using .env.example file to supply config environment variables"
  // );
  console.log("using .env.examnple");
  dotenv.config({ path: "./../../.env.example" }); // you can delete this after you create your own .env file!
}

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    SECRET: Joi.string()
      .default("some-very-bad-cats")
      .description("Application secret"),
    PORT: Joi.number().default(3000),
    MONGODB_URI: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export = {
  ENVIRONMENT: envVars.NODE_ENV,
  port: envVars.PORT,
  SESSION_SECRET: envVars.SECRET,
  MONGODB_URI: envVars.MONGODB_URI,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
// export const ENVIRONMENT = process.env.NODE_ENV;
// const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
// export const SESSION_SECRET = process.env["SESSION_SECRET"];
// export const MONGODB_URI = prod
//   ? process.env["MONGODB_URI"]
//   : process.env["MONGODB_URI_LOCAL"];
