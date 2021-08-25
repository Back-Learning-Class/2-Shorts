import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";

function RightNav(props) {
  const [Access, setAccess] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/route/status", {
        withCredentials: true
      })
      .then(response => {
        setAccess(response.data.isAuth);
      });
  }, [Access]);

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

  if (!Access) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/Signup">회원가입</a>
        </Menu.Item>
      </Menu>
    );
  } else {
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
