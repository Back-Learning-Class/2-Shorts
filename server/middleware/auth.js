import User from "../src/models/userModel.js";
import jwt from "jsonwebtoken";

let auth = (req, res, next) => {
  let accessToken = req.cookies.w_auth;

  jwt.verify(accessToken, "sEcReAt", function (err, decode) {
    const findUser = User.findAll({
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
