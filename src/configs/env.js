require("dotenv").config()
const { z } = require("zod");

const envSchema = z.object({
  PORT: z.preprocess(
    (x) => +x,
    z.number({
      required_error: "port is required in environment variable",
      invalid_type_error: "port must be a number",
    })
  ),
  DB_PASS: z.string({
    required_error: "DB_PASS is required in environment variable",
    invalid_type_error: "DB_PASS must ber string",
  }),

  DB_NAME: z.string({
    required_error: "DB_NAME is required in environment variable",
    invalid_type_error: "DB_NAME must be a string",
  }),

  DB_HOST: z.string({
    required_error: "DB_HOST is required  in environment variable",
    invalid_type_error: "DB_HOST must be a string",
  }),

  DB_USER: z.string({
    required_error: "DB_USER is required in environment variable",
    invalid_type_error: "DB_USER must be a string",
  }),

  REDIS_PORT: z.preprocess(
    (x) => +x,
    z.number({
      required_error: "REDIS_PORT is required",
      invalid_type_error: "REDIS_PORT must be a number",
    })
  ),
  REDIS_HOST: z.string({
    required_error: "REDIS_HOST is required",
    invalid_type_error: "REDIS_HOST must be a string",
  }),
  LOG_DIR: z.string({
    required_error: "LOG_DIR is required",
  }),
  JWT_ACCESS_TOKEN_EXPIRED: z.string({
    required_error:
      "JWT_ACCESS_TOKEN_EXPIRED must be present in environment variable",
  }),
  JWT_REFRESH_TOKEN_EXPIRED: z.string({
    required_error:
      "JWT_REFRESH_TOKEN_EXPIRED must be present in environment variable",
  }),
  API_VERSION: z.string({
    required_error: "API_VERSION must be present in environment variable",
  }),
  NODE_ENV: z.string({
    required_error: "NODE_ENV must be present in environment variable",
  }),
  EMAIL_PASSWORD: z.string({
    required_error: "EMAIL_PASSWORD must be present in environment variable",
  }),
  EMAIL_SERVICE: z.string({
    required_error: "EMAIL_SERVICE must be present in environment variable",
  }),
});

const env=Object.freeze(envSchema.parse(process.env))
module.exports=env;
