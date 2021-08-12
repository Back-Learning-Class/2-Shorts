import express from "express";
import User from "../../models/user.js"; // user 객체
import * as service from "../../services/userService.js"; // db 처리 서비스
import { logger } from "../../../config/winston.js"; //로거

const router = express.Router();

router.post("/selectId", async (req, res) => {
  logger.info("POST /");
  //var user = model;
  var user = new User(req.body.reqId, "", "");

  // req 로 값 받아와서
  // user 객체에 담고
  //user.id = req.body.reqId;

  // db 에 조회
  try {
    let selectResult = await service.selectId(user);
    // 조회 결과 res
    res.send({
      selectResult: selectResult //미중복 : 0 , 중복 : -1 , 에러 : -2
    });
  } catch (error){
    console.log("에러발생 : router/selectId selectId");
    console.log(error);
    let selectResult = -2; // 에러시 
    res.send ({
      selectResult: selectResult // 에러발생 시 res 값 
    })
  }
});

export default router;
