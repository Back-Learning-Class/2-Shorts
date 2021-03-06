import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action.js";

import { Input } from "antd";

function LoginPage(props) {
  const dispatch = useDispatch();
  /*return (
    <div className="LoginPage">
      <br />
      <InputLoginForm />
    </div>
  );*/

  // 로그인 form
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
      let body = {
        userId: inId,
        userPswd: inPswd
      };
      dispatch(loginUser(body)).then(response => {
        if (response.payload.selectResult === -1) {
          setLoginResult("아이디를 확인해주세요 !!!");
        } else if (response.payload.selectResult === -2) {
          setLoginResult("비밀번호를 확인해주세요 !!!");
        } else if (response.payload.selectResult === 0) {
          // 로그인 성공 >>> 창 닫기 >>> 부모창 리로드
          setLoginResult("성공");
          console.log("성공", response.payload);
          props.history.push("/");
        }
      });

      // response
      // 아이디 or 비밀번호 틀렸을경우

      /* .catch(function (error) {
          // 오류발생시 실행
          setLoginResult("로그인 오류 다시 시도해주세요!!!\n" + error);
        });*/
      /*.then(function () {
          // 항상 실행
        });*/
    }
    return;
  }

  // Signup 버튼 클릭시
  // Signup 페이지 호출
  function callSignup() {
    // 부모창 (메인페이지 ) Signup 페이지로 전환
    props.history.push("/signup");

    return;
  }

  return (
    <div className="LoginPage" style={{ margin: "90px auto" }}>
      <div className="InputId">
        <h3>ID (Email) : </h3>
        <Input
          placeholder="email"
          id="inputId"
          type="email"
          onChange={ifChange}
        />
        <br />
        <h3>Password : </h3>
        <Input
          placeholder="password"
          id="inputPswd"
          type="password"
          onChange={ifChange}
        />
        <br />
        <span style={{ color: "red" }}>{loginResult}</span>
        <br />
        <button type="button" onClick={chkForm}>
          {"Login"}
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" onClick={callSignup}>
          {"Sign up"}
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
