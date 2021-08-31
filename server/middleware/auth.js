import User from "../src/models/userModel.js";
import Token from "../src/models/tokenModel.js";
import jwt from "jsonwebtoken";

// 사용자 토큰 검증
// 로그인한 사용자의 토큰인지 검증
function ckUserToken(accessToken, refreshToken) {
  return new Promise(async function (resolve, reject) {
    console.log("-----------------function ckUserToken------------------");
    // jwt decode 실시
    // 유효성 검사는 처리하지않음

    const decode = jwt.decode(accessToken);

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
      resolve([true, decode.tokenId]);
    } else {
      // access 토큰 정보에 있는 유저와
      // refresh 토큰이 불일치
      resolve([false, decode.tokenId]);
    }
  });
}

//토큰 유효성 검사
function tokenCheck(Tokens) {
  console.log("-----------------function tokenCheck------------------");
  try {
    // 유효성 검사
    let vrfyToken = jwt.verify(Tokens, "sEcReAt");
    return vrfyToken; // 검사 결과 리턴
  } catch (error) {
    // 유효성 검사 실패 시 : 에러발생
    console.log("토큰 유효성 검사 에러 발생 !!!", error);
    return null; // 실패시 리턴값
  }
}

// access Token 토큰 재발급
// tokenID === 사용자 email
function reMkAccToken(tokenId) {
  console.log("-----------------function reMkAccToken------------------");
  console.log("Access Token 재생성 ");
  let newToken = jwt.sign({ tokenId: tokenId }, "sEcReAt", {
    expiresIn: "2m",
    issuer: "2Shorts"
  });
  return newToken;
}

// refresh Token 재발급
// tokenID === 사용자 email
async function reMkRefToken(tokenId) {
  console.log("-----------------function reMkRefToken------------------");
  console.log("refresh Token 재생성 ");
  // user id 획득
  let userId = await User.findOne({
    where: { email: tokenId },
    attributes: ["id"]
  });

  // refresh 토큰 생성
  let newToken = jwt.sign({ tokenId: tokenId }, "sEcReAt", {
    expiresIn: "1m",
    issuer: "2Shorts"
  });

  // DB 에 refresh Token 저장
  // 생성은 loginId 에서 담당하므로
  // 재생성은 db에 update 한다.
  await Token.update(
    { token_value: newToken },
    {
      where: {
        user_id: userId.dataValues.id
      }
    }
  );

  return newToken;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let auth = async (req, res, next) => {
  let accessToken = req.cookies.w_auth;
  let refreshToken = req.cookies.refresh_auth;

  console.log("\n\n---------------first---------------");
  console.log("accessToken is : " + accessToken);
  console.log("refreshToken is : " + refreshToken);
  console.log("-----------------------------------");

  //클라이언트에 해당 쿠키가 없을 시
  if (accessToken === undefined || refreshToken === undefined) {
    console.log("토큰 정보 없음 ");
    res.json({
      isAuth: false,
      error: true
    });
    next();
  }
  // 클라이언트에 쿠키가 있는경우
  else {
    let userToken; //true or false
    let tokenId; // tokenId === email

    // 유저의 토큰인지 확인
    //const [userToken, tokenId] = await ckUserToken(accessToken, refreshToken);
    await ckUserToken(accessToken, refreshToken)
      .then(function (value) {
        userToken = value[0];
        tokenId = value[1];
        console.log("---------------ckUserToken result ---------------");
        console.log("userToken : " + userToken);
        console.log("tokenId : " + tokenId);
        console.log("---------------------------------------------");
      })
      .catch(function (error) {
        console.log("function ckUserToken error !!!");
        console.log(error);
        // 실패처리
        res.json({
          isAuth: false,
          error: true
        });
        next();
      });

    // 사용자토큰확인 실패
    if (userToken === false) {
      console.log("ckUserToken result is false !!!");
      // 유저의 토큰이 불명확
      // 유저의 토큰이 아닐 확률이 높음
      res.json({
        isAuth: false,
        error: true
      });
      next();
    } // 사용자토큰확인 합격
    else {
      const accTokenVrfy = tokenCheck(accessToken); // access token 유효성검사 실시
      const reTokenVrfy = tokenCheck(refreshToken); // refresh token 유효성 검사 실시

      console.log("accTokenVrfy : " + accTokenVrfy);
      console.log("reTokenVrfy : " + reTokenVrfy);

      // 1. access 토큰 이 만료된경우
      if (accTokenVrfy === null) {
        // 1-1. refresh 토큰이 만료된경우
        if (reTokenVrfy === null) {
          // 로그인 페이지로 이동
          res.json({
            isAuth: false,
            error: true
          });
          next();
        }
        // 1-2. refresh 토큰이 유효한 경우
        else {
          //이메일이 들어가야됨
          // accestoken 이면 1시간 refresh 면 1주일
          // access 토큰 재발급
          let newAccToken = reMkAccToken(tokenId);
          console.log("newAccToken : " + newAccToken);
          res.cookie("w_auth", newAccToken).json({
            isAuth: true,
            error: false
          });
          next();
        }
      }
      // 2. access 토큰이 유효한 경우
      else {
        // 2-1. refresh 토큰이 만료된 경우
        if (reTokenVrfy === null) {
          // 방법 1. 이경우 그냥 next 처리를 한 뒤
          // 사용자가 로그인을 다시 진행할때 refresh 토큰을 발급한다.

          // 방법 2. refresh 토큰 역시 재발급 하여 사용자가 이용하는 동안 계속해서
          // 토큰이 유지되도록 한다 (사용자가 원한다면 무한정 )
          // >>> 이방법이 옳은것인진 모르겟음
          let newRefToken = await reMkRefToken(tokenId);
          console.log("newRefToken : " + newRefToken);
          res.cookie("refresh_auth", newRefToken).json({
            isAuth: true,
            error: false
          });
          next();
        }
        // 2-2. refresh 토큰이 유효한 경우
        else {
          res.json({
            isAuth: true,
            error: false
          });
          next();
        }
      }
    }
  }
};
export { auth };

/**
 * < 시작 - 로그인페이지 >
 * 메인화면 요청(사용자가 로고를 클릭 하여 메인페이지 요청 )
 *
 * >>> 문제 발생 부분
 * front-route("/") >>> Hoc >>> status >>> auth(1회) 실행 >>> 토큰 정보 없음(isAuth:false) >>> Hoc 조건에서 "/login" 이동요청
 * 동시에 MainPage 실행 >>> 서버에 GET "/" 요청 >>> server-route("/")
 * auth(3회) 실행 >>> 토큰 정보 없음 >>> NavPage에서 요청하는 status로 인한것으로 추정
 * 동시에 front-route("/login") >>> Hoc >>> status >>> auth(2회) 실행 >>> 토큰 정보 없음 (isAuth:false) >>> "/login" 이동요청
 * auth(4회) 실행 >>> 토큰 정보 없음 >>> NavPage에서 요청하는 status로 인한것으로 추정
 */
