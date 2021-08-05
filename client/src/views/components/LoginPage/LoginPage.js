import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  return (
    <div className="LoginPage">
      <br />
      <InputLoginForm />
    </div>
  );
}

// 로그인 form
function InputLoginForm() {
  let [inId, setInId] = useState(""); // 아이디 입력값
  let [inPswd, setInPswd] = useState(""); // 비밀번호 입력값

  let [loginResult, setLoginResult] = useState(""); // 로그인 요청 리턴값 저장

  // input 값 state에 즉시 반영
  function ifChange(e) {
    if (e.target.id === "inputId") {
      setInId(e.target.value);
    } else if (e.target.id === "inputPswd") {
      setInPswd(e.target.value);
    }
    return;
  }

  // Login 버튼 클릭시
  // submit 전 양식 최종검사
  function chkForm() {
    setLoginResult(""); // 경고메세지 초기화

    // 아이디 or 비밀번호 미입력시
    if (inId.length <= 0) {
      setLoginResult("아이디를 입력해주세요 !!!");
      return;
    } else if (inPswd.length <= 0) {
      setLoginResult("비밀번호를 입력해주세요 !!!");
      return;
    } else {
      // 서버 로그인 요청
      axios
        .post("http://localhost:5000/api/route/user/reqLogin", {
          userId: inId,
          userPswd: inPswd
        })
        .then(function (response) {
          // response
          // 아이디 or 비밀번호 틀렸을경우
          if (response.loginResult === 1) {
            setLoginResult("아이디 또는 비밀번호를 확인해주세요 !!!");
          } else if (response.loginResult === 0) {
            // 로그인 성공 >>> 창 닫기 >>> 부모창 리로드
          }
        })
        .catch(function (error) {
          // 오류발생시 실행
          setLoginResult("로그인 오류 다시 시도해주세요!!!\n" + error);
        })
        .then(function () {
          // 항상 실행
        });
    }
    return;
  }

  // Signup 버튼 클릭시
  // Signup 페이지 호출
  function callSignup() {
    // 부모창 (메인페이지 ) Signup 페이지로 전환

    return;
  }

  return (
    <div className="InputId">
      id (email) : <input id="inputId" type="email" onChange={ifChange}></input>
      <br />
      password :{" "}
      <input id="inputPswd" type="password" onChange={ifChange}></input>
      <br />
      <span style={{ color: "red" }}>{loginResult}</span>
      <br />
      <button type="button" onClick={chkForm}>
        {"Login"}
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" onClick={chkForm}>
        {"Sign up"}
      </button>
      <br />
    </div>
  );
}

export default LoginPage;
