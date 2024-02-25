require("winston-daily-rotate-file")
const env=require("./env")
const winston=require('winston')
const { createLogger, format }=winston
const { combine, json } = format;

const combineFileTransport = new winston.transports.DailyRotateFile({
    dirname: `${env.LOG_DIR}/combined`,
    filename: `%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxSize: "100m",
});

const errorFileTransport = new winston.transports.DailyRotateFile({
    dirname: `${env.LOG_DIR}/error`,
    filename: `%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxSize: "100m",
    level: "error",
});

const logger = createLogger({
    level: "info",
    format: combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        json(),
        winston.format.json()
    ),
    defaultMeta: { service: "ecommerce-backend" },
    transports: [combineFileTransport, errorFileTransport],
});


if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.json(),
        })
    );
}

module.exports = logger;