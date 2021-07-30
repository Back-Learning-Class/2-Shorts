import React, { useEffect, useState } from "react";


function LoginPage() {
    return (
        <div>
            // 아이디(이메일형식 )
            <inputId></inputId>
            // 비밀번호 
            <inputPasswd></inputPasswd>
            // 버튼
            <LoginB></LoginB>

        </div>
    );
}

function inputId(){
    
    return(
        <div>
            id : <input id="inputId" type="email"></input>
        </div>
    );
}

function inputPasswd(){
    return(
        <div>
            password : <input id="inputPasswd" type="password"></input>
        </div>
    );
}

function LoginButton(){
    return(
        <div>
            <input type="button" onClick="">Login</input>
            <input type="button" onClick="">Sign up</input>
        </div>
    );
}


export default LoginPage;