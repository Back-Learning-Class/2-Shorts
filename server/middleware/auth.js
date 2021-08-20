import User from "../src/models/userModel.js";
import jwt from "jsonwebtoken";

let auth = (req, res, next) => {
  let accessToken = req.cookies.w_auth;
  //let test = req.header.cookie;
  //클라이언트 쿠키에서 토큰을 가져온다
  console.log("accesstoken", accessToken);
  if (accessToken) {
    jwt.verify(accessToken, "sEcReAt", async function (err, decode) {
      let finduser = await User.findAll({
        attributes: ["email"],
        where: {
          email: decode
        }
      });
      if (err) throw err;
      if (finduser[0].dataValues.email != decode) {
        return res.json({
          isAuth: false,
          error: true
        });
      }
      req.token = accessToken;
      req.user = finduser[0].dataValues.email;
      next(); //next를 해줘야  라우터에 다음 부분들을 실행시켜줌
    });
  } else {
    res.json({
      isAuth: false,
      error: true
    });
    //next();
  }
};

export { auth };
