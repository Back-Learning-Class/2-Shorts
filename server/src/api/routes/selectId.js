import express from "express";

// 시퀄라이저 사용 이전
// import User from "../../models/user.js"; // user 객체
// import * as service from "../../services/userService.js"; // db 처리 서비스

// 시퀄라이저 사용 이후 
import User from "../../models/userModel.js"; // 시퀄라이저 모델 

import { logger } from "../../../config/winston.js"; //로거

const router = express.Router();

router.post("/selectId", async (req, res) => {
  logger.info("POST /");
  // 시퀄라이저 사용 
  try{
    const selectResult = await User.findAll({
      attributes:['id'],
      where: {
        email: req.body.reqId
      }
    })
    // selectResult //미중복 : 0 , 중복 : -1 , 에러 : -2
    if (selectResult.length === 0)
    {
      console.log("사용가능 !!! 중복되는 아이디가 없습니다.");
      res.send({
        selectResult: 0
      })
    }
    else {
      console.log("중복아이디 검색 : " + selectResult[0].dataValues.id);
      res.send({
        selectResult: -1
      })
    }
  }
  catch (error) {
    console.log("에러발생 : router/selectId selectId");
    console.log(error);
    res.send ({
      selectResult: -2 // 에러발생 시 res 값 
    })
  }



  // 시퀄라이저 사용 이전   
  /*
  // var user = model; // model class 이전 
  // let user = new User(req.body.reqId, "", ""); // model class 적용 
  // user.id = req.body.reqId;
  
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
  */
});

export default router;
