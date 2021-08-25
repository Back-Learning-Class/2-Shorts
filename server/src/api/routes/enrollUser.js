import express from "express";
// 시퀄라이저 사용 이전
//import model from "../../models/user.js"; // user 객체
//import * as service from "../../services/userService.js"; // db 처리 서비스

// 시퀄라이저 사용 이후
import User from "../../models/userModel.js"; // 시퀄라이저 모델
import { doEncode } from "../../encoder/encoder.js" // 암호화 모듈 

import { logger } from "../../../config/winston.js"; //로거

const router = express.Router();

router.post("/enrollUser", async (req, res) => {
  logger.info("POST / ");
  try {
    // 비밀번호 해싱 
    let hash = await doEncode(req.body.enrollPswd);
    if (hash)
    {
      // DB INSERT
      const insertResult = await User.create({
        // id : 아이디는 자동으로 증가되어 들어감
        email: req.body.enrollId,
        password: hash,
        name: req.body.enrollName,
        admin: 0
      });
      if (insertResult.dataValues) {
        console.log("회원 등록 정보 ");
        console.log(insertResult.dataValues);
        res.send({
          enrollResult: 0 // 등록성공 : 0 , 실패 : -1 , 에러 : -2
        });
      } else {
        console.log("회원 등록 실패!!! ");
        res.send({
          enrollResult: -1 // 등록성공 : 0 , 실패 : -1 , 에러 : -2
        });
      }
    }
    else {
      res.send({
        enrollResult: -2 // 등록성공 : 0 , 실패 : -1 , 에러 : -2
      });
    }
  } catch (error) {
    console.log("에러발생 : router/enrollUser enrollUser");
    console.log(error);
    // 등록 결과 res
    res.send({
      enrollResult: -2 // 등록성공 : 0 , 실패 : -1 , 에러 : -2
    });
  }
  // 시퀄라이저 사용 이전
  /*
  //var user = model;
  let user = new User(req.body.enrollId, req.body.enrollPswd, req.body.enrollName)

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
  */
});

export default router;
