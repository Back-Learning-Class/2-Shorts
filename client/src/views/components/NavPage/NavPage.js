import React from "react";
import { Drawer, Button } from "antd";
import RightNav from "./Sections/RightNav";

import "./Sections/Navbar.css";

function NavPage() {
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/" style={{ color: "black" }}>
          2-Shorts
        </a>
      </div>
      <div className="menu_rigth">
        <RightNav mode="horizontal" />
      </div>
    </nav>
  );
}

export default NavPage;
