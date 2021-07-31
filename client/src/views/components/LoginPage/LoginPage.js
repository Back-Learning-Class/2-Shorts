import React, { useEffect, useState } from "react";


function LoginPage() {
    return (
        <div className="LoginPage">
            <br />
            <InputId />
            <br />
            <InputPasswd />
            <br />
            <LoginButton />
            <br />
        </div>
    );
}

function InputId(){
    return(
        <div className="InputId">
            id (email) : <input id='inputId' type='email'></input>
        </div>
    );
}

function InputPasswd(){
    return(
        <div>
            password : <input id='inputPasswd' type='password'></input>
        </div>
    );
}

// 버튼 구성 
function LoginButton(){
    return(
        <div>
            <button type='button' >{ "Login" }</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type='button' >{ "Sign up" }</button>
        </div>
    );
}


export default LoginPage;