import express from "express";
import * as service from "../../services/userService.js"; // db 처리 서비스
import { logger } from "../../../config/winston.js"; //로거
import jwt from "jsonwebtoken";
import { doCompare } from "../../encoder/encoder.js"; // 암호화 모듈

// 시퀄라이저 적용 전
// import model from "../../models/user.js"; // user 객체
// import User from "../../models/user.js";

// 시퀄라이저 적용 후
import User from "../../models/userModel.js"; // 시퀄라이저 모델
import Token from "../../models/tokenModel.js";
const router = express.Router();

router.post("/reqLogin", async (req, res) => {
  logger.info("POST / ");
  try {
    const selectResult = await User.findAll({
      attributes: ["email", "password", "id"],
      where: {
        email: req.body.userId
      }
    });

    // 성공 0 // id 없음 : -1 // 비밀번호 틀림 : -2 // 에러 -3
    if (selectResult.length != 0) {
      // 암호화 비밀번호 비교
      let compareResult = await doCompare(
        req.body.userPswd,
        selectResult[0].dataValues.password
      );
      console.log("compareResult : " + compareResult);

      if (compareResult === true) {
        //let tokenid = selectResult[0].dataValues.email;
        let accessToken = jwt.sign(
          { tokenId: selectResult[0].dataValues.email },
          "sEcReAt",
          {
            expiresIn: "5m",
            issuer: "2Shorts"
          }
        );

        //RefreshToken 생성
        let refreshToken = jwt.sign({}, "sEcReAt", {
          expiresIn: "7d",
          issuer: "2Shorts"
        });

        //refreshToken DB 저장
        await Token.create({
          user_id: selectResult[0].dataValues.id,
          token_value: refreshToken
        });
        res.cookie("w_auth", accessToken, {
          //expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
          httpOnly: true
        });
        res.cookie("refresh_auth", refreshToken, {
          //expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
          httpOnly: true
        });
        console.log("cookie test", req.cookies);
        res.status(200).json({
          selectResult: 0,
          token: accessToken
          //isAuth: true
        });
      } else {
        console.log("password fail -2");
        res.send({
          selectResult: -2
        });
      }
    } else {
      console.log("Id fail -1");
      res.send({
        selectResult: -1
      });
    }
  } catch (error) {
    console.log("에러발생 : router/loginId");
    console.log(error);
    res.send({
      selectResult: -3 // 에러발생 시 res 값
    });
  }

  // 시퀄라이저 적용 전
  /*
  //let user = model;
  let user = new User(req.body.userId, req.body.userPswd, "");

  //user.id = req.body.userId;
  //user.password = req.body.userPswd;

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
  */
});

export default router;
