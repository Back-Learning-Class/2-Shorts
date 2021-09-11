import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightNav(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios
      .get("http://localhost:5000/api/route/logout", { withCredentials: true })
      .then(response => {
        console.log("logouttest");
        if (response.status === 200) {
          console.log("logout test", response.data.isAuth);
          props.history.push("/login");
        } else {
          alert("Log Out Failed");
        }
      });
  };

  if (user.userData && !user.userData.isAuth) {
    //redux 스토어 에서 값을 가져와 로그인 한 상태인지 찾는다
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/Signup">회원가입</a>
        </Menu.Item>
        <Menu.Item key="history">
          <a href="/record">기록</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    //로그인 한 상태면
    return (
      <Menu>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
        <Menu.Item>
          <h1>사용자</h1>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightNav);
