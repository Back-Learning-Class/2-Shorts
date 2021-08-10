import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import appRoot from "app-root-path";

const { combine, timestamp, printf } = winston.format;

//로그 출력 포맷 정의
const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

//error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    logFormat
  ),
  transports: [
    //info 레벨 로그 저장 파일 설정
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      //dirname: logDir,
      filename: `${appRoot}/log/info/%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true
    }),
    // error 레벨 로그 저장 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      //dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `${appRoot}/log/error/%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      )
    })
  );
}

export { logger };
