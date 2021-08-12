import express from "express";
import model from "../../models/user.js"; // user 객체
import * as service from "../../services/userService.js"; // db 처리 서비스
import { logger } from "../../../config/winston.js"; //로거
import User from "../../models/user.js";

const router = express.Router();

router.post("/enrollUser", async (req, res) => {
  //var user = model;
  let user = new User(req.body.enrollId, req.body.enrollPswd, req.body.enrollName)
  logger.info("POST / ");

  // req 로 값 받아와서
  // user 객체에 담고
  //user.id = req.body.enrollId;
  //user.password = req.body.enrollPswd;
  //user.name = req.body.enrollName;

  // db 에 등록
  try {
    let enrollResult = await service.enrollUser(user);
    // 등록 결과 res
    res.send({
      enrollResult: enrollResult // 등록성공 : 0 , 실패 : -1 , 에러 : -2
    });
  } catch (error) {
    let enrollResult = -2;
    console.log("에러발생 : router/enrollUser enrollUser");
    console.log(error);
    // 등록 결과 res
    res.send({
      enrollResult: enrollResult // 등록성공 : 0 , 실패 : -1 , 에러 : -2
    });
  }
});

export default router;

