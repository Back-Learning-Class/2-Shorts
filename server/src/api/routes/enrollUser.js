import express from "express";
import model from "../../models/user.js"; // user 객체
import * as service from "../../../services/userService.js"; // db 처리 서비스
import { logger } from "../../../config/winston.js"; //로거

const router = express.Router();

router.post("/enrollUser", async (req, res) => {
  var user = model;
  logger.info("POST / ");

  // req 로 값 받아와서
  // user 객체에 담고
  user.id = req.body.enrollId;
  user.password = req.body.enrollPswd;
  user.name = req.body.enrollName;

  // db 에 등록
  let enrollResult = await service.enrollUser(user);
  console.log("최종 등록 결과 enrollResult : " + enrollResult);

  // 등록 결과 res
  res.send({
    enrollResult: enrollResult
  });
});

export default router;
