import express from "express";
// express 버전 4.17.1
import cors from "cors";

import { logger } from "./config/winston.js";

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

app.use("/api/route/", getData);
app.use("/api/route/", enrolluser);
app.use("/api/route/", selectid);
app.use("/api/route/", loginuser);
//app.use("/api/route/user", postUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info("server running");
});
