import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.js";
import MainPage from "./components/MainPage/MainPage.js";
import NavBar from "./components/NavPage/NavPage.js";
import SignupPage from "./components/SignupPage/SignupPage.js";
import Authpage from "../hoc/Auth.js";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Login" component={LoginPage} />
          <Route exact path="/Signup" component={SignupPage} />
          <Route exact path="/Auth" component={Authpage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
