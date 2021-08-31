import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.js";
import MainPage from "./components/MainPage/MainPage.js";
import NavBar from "./components/NavPage/NavPage.js";
import SignupPage from "./components/SignupPage/SignupPage.js";
//import DetailPage from "./components/DetailPage/DetailPage.js";
import Hoc from "../hoc/Hoc.js";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Hoc(MainPage, null)} />
          <Route exact path="/Login" component={Hoc(LoginPage, false)} />
          <Route exact path="/Signup" component={Hoc(SignupPage, false)} />
          {/*<Route exact path="/Detail" component={Hoc(DetailPage, null)} />*/}
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
