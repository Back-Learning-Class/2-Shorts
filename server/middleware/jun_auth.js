/*import User from "../src/models/userModel.js";
import Token from "../src/models/tokenModel.js";
import jwt from "jsonwebtoken";

// 1. null 일지 undefined 일지
// 2. null 과 undefined 의 차이

// 사용자 토큰 검증
// 로그인한 사용자의 토큰인지 검증
async function ckUserToken(accessToken, refreshToken) {
  // jwt decode 실시
  // 유효성 검사는 처리하지않음

  const decode = jwt.decode(accessToken);
  console.log("14 line", decode);
  // 1. user테이블 조회
  //      >>> user_id 값 get
  let finduser = await User.findOne({
    where: { email: decode.tokenId },
    attributes: ["id"]
  });

  // 2. user_id 를 기준으로 token 테이블 조회
  //      >>> token(refresh)값이 해당 유저의 것인지 확인
  let findToken = await Token.findOne({
    where: { user_id: finduser.dataValues.id },
    attributes: ["token_value"]
  });

  if (refreshToken === findToken.dataValues.token_value) {
    // access 토큰 정보에 있는 유저의
    // refresh 토큰이 맞음
    return refreshToken;
  } else {
    // access 토큰 정보에 있는 유저와
    // refresh 토큰이 불일치
    return false;
  }
}

// access 토큰 유효성 검사
function tokenCheck(Tokens) {

  try {
    // 유효성 검사
    let access = jwt.verify(Tokens, "sEcReAt");
    console.log("ttests tst", access, Tokens);
    return access; // 검사 결과 리턴
  } catch (error) {
    // 유효성 검사 실패 시 : 에러발생
    console.log("토큰 유효성 검사 에러 발생 !!!", error);
    return null; // 실패시 리턴값
  }
}

// 토큰 재발급
//DB 에도 저장해야됨
async function reMkToken(tokenId, expiresIn, cookieName) {
  if (cookieName === "w_auth") {
    let findrefreshMK = await Token.findOne({
      where: { token_value: tokenId },
      attributes: ["user_id"]
    });
    let finduserEmail = await User.findOne({
      where: { id: findrefreshMK.dataValues.user_id },
      attributes: ["email"]
    });
    let newToken = jwt.sign(
      { tokenId: finduserEmail.dataValues.email },
      "sEcReAt",
      {
        expiresIn: expiresIn,
        issuer: "2Shorts"
      }
    );

    return newToken;
  }

  if (cookieName === "refresh_auth") {
    const decode = jwt.decode(accessToken);

    let finduserMK = await User.findOne({
      where: { email: decode.tokenId },
      attributes: ["id"]
    });
    return await Token.create({
      user_id: finduserMK.dataValues.id,
      token_value: newToken
    });
  }
}

let auth = async (req, res, next) => {
  let accessToken = req.cookies.w_auth;
  let refreshToken = req.cookies.refresh_auth;
  console.log("88 test", accessToken);

  //let test = req.header.cookie;
  //클라이언트 쿠키에서 토큰을 가져온다

  //클라이언트에 해당 쿠키가 없을 시
  if (accessToken === undefined || refreshToken === undefined) {
    return res.json({
      isAuth: false,
      error: true
    });
  } else {
    const userToken = ckUserToken(accessToken, refreshToken);
    if (userToken === false) {
      // 유저의 토큰이 불명확
      // 유저의 토큰이 아닐 확률이 높음
      return res.json({
        isAuth: false,
        error: true
      });
    }

    const accTokenVrfy = tokenCheck(accessToken); // access token 유효성검사 실시
    const reTokenVrfy = tokenCheck(refreshToken); // refresh token 유효성 검사 실시
    console.log("111 test", accTokenVrfy, reTokenVrfy);
    // 1. access 토큰 이 만룓된경우
    if (accTokenVrfy === null) {
      // or null
      // 1-1. refresh 토큰이 만료된경우
      if (reTokenVrfy === null) {
        // or null
        // 로그인 페이지로 이동
        return res.json({
          isAuth: false,
          error: true
        });
      }
      // 1-2. refresh 토큰이 유효한 경우
      else {
        //이메일이 들어가야됨
        //accestoken 이면 1시간 refresh 면 1주일
        // access 토큰 재발급
        res.cookie("w_auth", await reMkToken(refreshToken, "5m", "w_auth"));
        next();
      }
    }
    // 2. access 토큰이 유효한 경우
    else {
      console.log("136 test");
      req.user = accTokenVrfy.tokenId;
      // 2-1. refresh 토큰이 만료된 경우
      if (reTokenVrfy === null) {
        // or null
        // 방법 1. 이경우 그냥 next 처리를 한 뒤
        // 사용자가 로그인을 다시 진행할때 refresh 토큰을 발급한다.
        res.cookie(
          //이게 방법 2
          "refresh_auth",
          reMkToken(reTokenVrfy, "7d", "refresh_auth")
        );
        next();

        //next(); //이게 방법 1

        // 방법 2. refresh 토큰 역시 재발급 하여 사용자가 이용하는 동안 계속해서
        // 토큰이 유지되도록 한다 (사용자가 원한다면 무한정 )
        // >>> 이방법이 옳은것인진 모르겟음
        /***
         *  필요시  로직 추가
         *  reMkToken()
         
      }
      // 2-2. refresh 토큰이 유효한 경우
      else {
        next();
      }
    }
  }
};

export { auth };
  
*/
