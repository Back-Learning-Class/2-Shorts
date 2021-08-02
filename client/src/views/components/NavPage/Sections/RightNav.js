import React from "react";
import { Menu } from "antd";

function RightNav() {
  return (
    <Menu>
      <Menu.Item key="login">
        <a href="/login">로그인</a>
      </Menu.Item>
      <Menu.Item key="register">
        <a href="/Signup">회원가입</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightNav;
