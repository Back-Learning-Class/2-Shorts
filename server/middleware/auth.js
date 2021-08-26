import User from "../src/models/userModel.js";
import jwt from "jsonwebtoken";
import Token from "../src/models/tokenModel.js";

let auth = (req, res, next) => {
  let accessToken = req.cookies.w_auth;
  let refreshToken = req.cookies.refresh_auth;
  //let test = req.header.cookie;
  //클라이언트 쿠키에서 토큰을 가져온다

  const access = jwt.verify(accessToken, "sEcReAt");
  const refresh = jwt.verify(refreshToken, "sEcReAt");

  if (accessToken === undefined) throw Error("사용 권한이 없습니다.");
  else if (accessToken) {
    jwt.verify(accessToken, "sEcReAt", async function (err, decode) {
      try {
        let finduser = await User.findAll({
          attributes: ["email", "id"],
          where: {
            email: decode.tokenId // 토큰으로 온 값 을 복호화 후 그 값으로 User 모델에 있는 email 값 찾기
          }
        });
        if (finduser[0].dataValues.email != decode.tokenId) {
          return res.json({
            isAuth: false,
            error: true
          });
        }
        req.user = decode.tokenId;

        console.log("middle auth", refresh);

        //next(); //next를 해줘야  라우터에 다음 부분들을 실행시켜줌
      } catch (error) {
        console.log("에러발생 : moddieware /auth", error);
      }
      //여기서 토큰 검사 및 재발급

      if (access === null) {
        if (refresh === undefined) {
          throw Error("사용 권한이없습니다."); //case 1 : access token 과 refresh token 둘다 만료된 상태
        } else {
          // case 2 : access token 은 만료됬지만, refresh token 은 유효한 경우
          const findOne = await User.findOne({
            where: { email: decode.tokenId },
            attributes: ["email"]
          });
          let newaccessToken = jwt.sign(
            { tokenId: findOne.dataValues.email },
            "sEcReAt",
            {
              expiresIn: "1h",
              issuer: "2Shorts"
            }
          );
          res.cookie("w_auth", newaccessToken);
          req.cookies.w_auth = newaccessToken;
          next();
        }
      } else {
        if (refresh === undefined) {
          //case 3 : access token 은 유효하지만 refresh token 은 만료된 경우
          let newrefreshToken = jwt.sign({}, "sEcReAt", {
            expiresIn: "7d",
            issuer: "2Shorts"
          });

          await Token.create({
            user_id: finduser[0].dataValues.id,
            token_value: newrefreshToken
          });

          res.cookie("refresh_auth", newrefreshToken);
          req.cookies.refresh_auth = newrefreshToken;
          next();
        } else {
          //case 4 : access token 과 refresh token 모두가 유효한 경우
          next();
        }
      }
    });
  }
};

export { auth };
