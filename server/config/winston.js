import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import appRoot from "app-root-path";
import moment from "moment-timezone";

const { combine, timestamp, printf } = winston.format;
const date = moment().tz("Asia/Seoul"); // 한국 시간으로 설정
const koreaTime = winston.format(info => {
  // NOTE: 한국 시간으로 하기 위해.. 설정을 안 할 시 에는 UTC 0이 default다.
  info.timestamp = date.format();
  return info;
});

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
    koreaTime(),
    logFormat
  ),
  transports: [
    //info 레벨 로그 저장 파일 설정
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      //dirname: logDir,
      filename: `${appRoot}/server/log/info/%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true
    }),
    // error 레벨 로그 저장 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      //dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `${appRoot}/server/log/error/%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    }),
    // http 레벨 로그 저장 파일 설정
    new winstonDaily({
      level: "http",
      datePattern: "YYYY-MM-DD",
      //dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `${appRoot}/server/log/http/%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ]
});

logger.stream = {
  // morgan wiston 설정
  write: message => {
    logger.log("http", message);
  }
};

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

export default logger;
