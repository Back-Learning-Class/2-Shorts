import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.js";
import NavBar from "./components/NavPage/NavPage.js";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
