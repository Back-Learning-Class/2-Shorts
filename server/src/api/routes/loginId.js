import express from "express";
import model from "../../models/user.js"; // user 객체
import * as service from "../../services/userService.js"; // db 처리 서비스
import { logger } from "../../../config/winston.js"; //로거

const router = express.Router();

router.post("/reqLogin", async (req, res) => {
  logger.info("POST / ");
  let user = model;

  user.id = req.body.userId;
  user.password = req.body.userPswd;

  let checkResult = await service.loginUser(user);
  console.log("ttest", checkResult);

  if (checkResult === 1 || checkResult === 2) {
    res.json({
      loginResult: checkResult
    });
  } else {
    res.status(200).json({
      loginResult: checkResult
    });
  }
});

export default router;
