import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenTication } from "../_actions/user_action.js";

export default function (SpecificComponent, option, adminRoute = null) {
  //option null => 아무나 출입이 가능한 페이지
  //option true => 로그인한 유저만 출입이 가능한 페이지
  //option false => 로그인한 유저는 출입 불가능한 페이지

  function Hoc(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authenTication()).then(response => {
        console.log("HOC", response);

        if (!response.payload.isAuth) {
          //로그인 하지 않은 상태
          if (option) {
            props.history.push("/Login");
          }
        } else {
          //로그인 한 상태
          if (option === false) {
            console.log("option false");
            props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return withRouter(Hoc);
}
