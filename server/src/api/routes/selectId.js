import express from "express";
import model from "../../models/user.js"; // user 객체
import * as service from "../../../services/userService.js"; // db 처리 서비스

const router = express.Router();

router.post("/selectId", async (req, res) => {
  var user = model;

  // req 로 값 받아와서
  // user 객체에 담고
  user.id = req.body.reqId;

  // db 에 조회
  let selectResult = await service.selectId(user);
  console.log("최종 조회 결과 selectResult");
  console.log(selectResult);

  // 조회 결과 res
  res.send({
    selectResult: selectResult
  });
});

export default router;
