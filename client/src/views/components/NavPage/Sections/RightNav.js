import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";

function RightNav(props) {
  const logoutHandler = () => {
    axios.get("http://localhost:5000/api/route/logout").then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">로그인</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/Signup">회원가입</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={logoutHandler}>로그아웃</a>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(RightNav);
