import User from "../src/models/userModel.js";
import jwt from "jsonwebtoken";

let auth = (req, res, next) => {
  let accessToken = req.cookies.w_auth1;
  console.log("auth - 쿠키 값 확인 ");
  console.log(accessToken);
  // JWT 검증 
  jwt.verify(accessToken, "sEcReAt", async function (err, decode) {
    const findUser = await User.findAll({
      attributes: ["email", "password"],
      where: {
        email: decode
      }
    });
    if (err) throw err;
    if (!findUser) {
      return res.json({
        isAuth: false,
        error: true
      });
    }
    req.token = accessToken;
    req.user = decode;
    next(); //next를 해줘야  라우터에 다음 부분들을 실행시켜줌
  });
  console.log("auth test", accessToken);
};

export { auth };
