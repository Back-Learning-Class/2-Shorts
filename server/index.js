import express from "express";
// express 버전 4.17.1
import cors from "cors";

import { logger } from "./config/winston.js"; // 로거
import dbSeq from "./src/models/sequelize.js"; // 시퀄라이저
import cookieParser from "cookie-parser";

//라우터 가져오기
import getData from "./src/api/routes/getYoutube.js";
import enrolluser from "./src/api/routes/enrollUser.js";
import selectid from "./src/api/routes/selectId.js";
import loginuser from "./src/api/routes/loginId.js";

//import postUser from "./src/api/routes/user.js";

const PORT = process.env.PORT || 5000;
//서버 세팅
const app = express();
//https://medium.com/sjk5766/express-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8-cookie-%EA%B3%B5%EC%9C%A0%ED%95%98%EA%B8%B0-1587c63ac24a
app.use(cors({ origin: true, credentials: true })); //서버 쪽에선 HTTP 헤더의 Access-Control-Allow-Credentials, Access-Control-Allow-Origin 헤더를 true로 설정합니다. 클라이언트 측에선 ajax 통신 할 때 withCredentials 옵션을 추가하면 됩니다.

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// 시퀄라이저 호출
// 빼먹으면 데이터베이스에 연결이 되지 않는다.
// sequelize.sync() 를 통해 데이터베이스에 연결이 된다.
dbSeq.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(error => {
    console.log(error);
  });

app.use("/api/route/", getData);
app.use("/api/route/", enrolluser);
app.use("/api/route/", selectid);
app.use("/api/route/", loginuser);
//app.use("/api/route/user", postUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info("server running");
});
