import User from "../src/models/userModel.js";
import jwt from "jsonwebtoken";

let auth = (req, res, next) => {
  let accessToken = req.cookies.w_auth;
  //let test = req.header.cookie;
  //클라이언트 쿠키에서 토큰을 가져온다
  console.log("accesstoken", accessToken);
  if (accessToken) {
    jwt.verify(accessToken, "sEcReAt", async function (err, decode) {
      try {
        let finduser = await User.findAll({
          attributes: ["email"],
          where: {
            email: decode
          }
        });
        if (finduser[0].dataValues.email != decode) {
          return res.json({
            isAuth: false,
            error: true
          });
        }

        req.user = decode;
        console.log("middle auth", req.user);
        next(); //next를 해줘야  라우터에 다음 부분들을 실행시켜줌
      } catch (error) {
        console.log("에러발생 : moddieware /auth", error);
      }
    });
  }
};

export { auth };
