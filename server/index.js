import express from "express";
// express 버전 4.17.1
import cors from "cors";

import { logger } from "./config/winston.js"; // 로거 
import dbSeq from "./src/models/sequelize.js" // 시퀄라이저 

//라우터 가져오기
import getData from "./src/api/routes/getYoutube.js";
import enrolluser from "./src/api/routes/enrollUser.js";
import selectid from "./src/api/routes/selectId.js";
import loginuser from "./src/api/routes/loginId.js";

//import postUser from "./src/api/routes/user.js";

const PORT = process.env.PORT || 5000;
//서버 세팅
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 시퀄라이저 호출 
// 빼먹으면 데이터베이스에 연결이 되지 않는다. 
// sequelize.sync() 를 통해 데이터베이스에 연결이 된다.
dbSeq.sequelize.sync({force : false})
  .then(()=>{
    console.log("데이터베이스 연결 성공");
  })
  .catch((error)=>{
    console.log(error);
  })


app.use("/api/route/", getData);
app.use("/api/route/", enrolluser);
app.use("/api/route/", selectid);
app.use("/api/route/", loginuser);
//app.use("/api/route/user", postUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info("server running");
});
