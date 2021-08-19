import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

//export default function (SpecificComponent, option, adminRoute = null) {
function Auth() {
  useEffect(() => {
    axios.get("http://localhost:5000/api/route/auth").then(response => {
      if (!response.data.isAuth) {
        //props.history.push("/");
        console.log("autest  false", response.data.isAuth);
        alert("실패");
      } else {
        console.log("autest  true", response.data.isAuth);
        alert("성공");
      }
    });
  }, []);
  return <h1>auth 테스트</h1>;

  //return <SpecificComponent />;
}

export default Auth;
//}
