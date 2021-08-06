// import e from "express";
import express from "express";
// express 버전 4.17.1
import reqProm from "request-promise";
// reqProm 버전 4.2.6
import ejs from "ejs";

import cors from "cors";

import model from "../models/user.js" // user 객체 
import * as service from "../services/userService.js" // db 처리 서비스 

// 서버 세팅
const app = express();
app.use(cors());
app.set('view engine', 'ejs'); // ejs라는 템플릿
app.engine('html', ejs.renderFile);

app.use(express.urlencoded({ extended: false })); // 중첩된 객체표현 허용에 관한 옵션
// 객체 안에 객체를 파싱할 수 있게하려면 true.
app.use(express.json());

// server 구성
var port = 5000; // 사용할 포트 번호를 port 변수에 넣습니다.
app.listen(port, function () {
  // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log("server on! http://localhost:" + port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});



/** 위쪽으로는 다른 파일에 구성해야함 - index.js ? 
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * 아래쪽 내용은 각각 /routes/selectId 와 /routes/enrollUser 로 가야함 
 */ 
app.get("/", async (req, res) => {
    res.render("testShow.ejs")
})

app.post("/selectId", async (req, res) => {
    var user = model;
    // req 로 값 받아와서
    // user 객체에 담고 
    user.id = req.body.reqId;

    console.log(user);

    // db 에 조회 
    let selectResult =  await service.selectId(user);

    console.log("최종 조회 결과 selectResult");
    console.log(selectResult);

    // 조회 결과 res 
    res.send({
        selectResult : selectResult
    });
});


app.post("/enrollUser", async (req, res) => {
    var user = model;
    
    // req 로 값 받아와서
    // user 객체에 담고 
    user.id = req.body.reqId;
    user.password = req.body.reqPassword;
    user.name = req.body.reqName;
    console.log(user);

    // db 에 등록
    let enrollResult = await service.enrollUser( user );
    console.log(enrollResult);
    console.log("최종 등록 결과 enrollResult : " + enrollResult );

    // 등록 결과 res 
    res.send({
        enrollResult : enrollResult
    })
});
