import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function Hoc() {
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/route/status", {
          withCredentials: true
        })
        .then(response => {
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
    return <SpecificComponent />;
  }
  return Hoc;
}
