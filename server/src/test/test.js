import ejs from "ejs"; // 테스트를 위한 ejs 

import express from "express";
// express 버전 4.17.1
import cors from "cors";

import getData from "../api/routes/getYoutube.js";
import enrolluser from "../api/routes/enrollUser.js";
import selectid from "../api/routes/selectId.js";
import loginuser from "../api/routes/loginId.js";

const PORT = process.env.PORT || 5000;
//서버 세팅
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false })); // 중첩된 객체표현 허용에 관한 옵션
app.use(express.json());

// ################################################################
// 테스트 설정 
// ################################################################
app.set('view engine', 'ejs'); // ejs라는 템플릿
app.engine('html', ejs.renderFile);
// ################################################################


app.use("/api/route/", getData);
app.use("/api/route/", enrolluser);
app.use("/api/route/", selectid);
app.use("/api/route/", loginuser);
//app.use("/api/route/user", postUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ################################################################
// 테스트 항목 구성 
// ################################################################
app.get("/test", async (req, res) => {
    res.render("testShow.ejs")
})
