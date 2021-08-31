import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  //option null => 아무나 출입이 가능한 페이지
  //option true => 로그인한 유저만 출입이 가능한 페이지
  //option false => 로그인한 유저는 출입 불가능한 페이지

  function Hoc(props) {
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/route/status", {
          withCredentials: true
        })
        .then(response => {
          if (!response.data.isAuth) {
            //로그인 안 한 상태

            console.log("autest  false", response.data.isAuth);

            //alert("실패");
          } else {
            //로그인 한 상태

            console.log("autest  true", response.data.isAuth);

            //alert("성공");
          }
        });
    }, [option]);

    return <SpecificComponent />;
  }
  return withRouter(Hoc);
}
