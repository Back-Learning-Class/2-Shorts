import React from "react";
import RightNav from "./Sections/RightNav.js";

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
      <div className="menu__container">
        <div className="menu_rigth">
          <RightNav mode="horizontal" />
        </div>
      </div>
    </nav>
  );
}

export default NavPage;
