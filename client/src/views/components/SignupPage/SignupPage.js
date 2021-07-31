import React, { useEffect, useState } from "react";


function SignupPage() {

    return (
        <div className="SignupPage">
            <br />
            <InputForm />
            <br />
        </div>
    );
}

function InputForm(){

    // id 
    let [ inId , setInId] = useState("");
    const [ idLength , setIdLength ] = useState(320); // 아이디(이메일) 최대 길이

    // password
    let [ inPswd , setInPswd ] = useState("");
    const [ pswdLength , setPswdLength ] = useState(20); // 비밀번호 최대 길이

    // name
    let [ inName , setInName ] = useState("");
    const [ nameLength , setNameLength ] = useState(20); // 이름 최대 길이


    let [ sltIdResult, setSltIdResult ] = useState(0); // id 조회 결과 
    // 0 : 중복검사 미실시
    // 1 : 중복
    // 2 : 중복없음 >>> 가능

    // 아이디 검사 결과 
    let [ idChkResult, setIdChkResult] = useState("");

    // 비밀번호 검사 결과
    let [ pswdChkResult, setPswdChkResult] = useState("");
    
    // 이름 검사 결과 
    let [ nameChkResult, setNameChkResult] = useState("");

    // input 값 state에 즉시 반영 
    function ifChange(e){

        if (e.target.id === "inputId")
        {
            setSltIdResult(0);
            setInId(e.target.value);
        }
        else if (e.target.id === "inputPassword")
        {
            setInPswd(e.target.value);
        }
        else if (e.target.id === "inputName")
        {
            setInName(e.target.value);   
        }
        return;
    }

    // 중복검사
    /* db 에 id를 조회해 id 검색결과를 반환해 주는 함수 */
    function selectId(){

        setIdChkResult("");
        var mail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        var mailResult = mail.test(inId);
        // 형식에 맞는경우 true

        if ( inId.length === 0)
        {
            setIdChkResult("아이디(이메일)를 입력해주세요 !!!");
            return;
        }
        else if( inId.length > idLength)
        {
            setIdChkResult("아이디(이메일)의 길이가 지나치게 깁니다 !!!");
            return;
        }
        else if (mailResult === false)
        {
            setIdChkResult("이메일 형식을 확인해주세요 !!!");
            return;
        }

        // 중복검사 

        setSltIdResult(2);
        return ;
    }

    // 비밀번호 양식검사 
    function chkPswd(){
        /*
            (최소 8자리 이상) <br />
            (영어, 숫자, 특수문자 중 2종류 조합)<br /> <br />
        */
        var num = inPswd.search(/[0-9]/g); // 숫자 
        var eng = inPswd.search(/[a-z]/ig); // 영어
        var spe = inPswd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); // 특수문자

        setPswdChkResult(""); // 비밀번호 경고 초기화 

        if (inPswd.length === 0)
        {
            setPswdChkResult("비밀번호를 입력해주세요 !!! ");
            return 1;
        }
        else if ( inPswd.length <  8 || inPswd.length > pswdLength)
        {
            setPswdChkResult("비밀번호를 8자리 이상, 20자리 이하로 설정해주세요 !!! ");
            return 1;
        }
        else if ( inPswd.includes(" " || "/\s/"))
        {
            setPswdChkResult("비밀번호는 공백없이 입력해주세요 !!! ");
            return 1;
        }
        else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0))
        {
            setPswdChkResult("영어, 숫자, 특수문자 중 2종류 이상을 조합해주세요 !!! ");
            return 1;
        }
        return 0;
    }

    // db 등록 전 최종양식검사 
    function chkForm(){

        var chkResult = 0; // 검사 결과 // 초기값 0 전체 성공시 1 
        setIdChkResult("");
        setPswdChkResult("");
        setNameChkResult("");


        if (sltIdResult === 0) // id 중복검사 미실시 
        {
            setIdChkResult("중복검사를 실시해주세요.");
            chkResult = 1;
            return;
        }

        var pswdResult = chkPswd(); // 비밀번호 검사 
        if (sltIdResult === 1) // id 중복 문제 미해결  
        {
            setIdChkResult("해당 id 가 이미 존재합니다. 중복검사를 다시 실시해주세요.");
            chkResult = 1;
            return;
        }
        else if ( inName.length === 0) // 이름 미입력 
        {
            setNameChkResult("이름을 입력해주세요 !!! ");
            chkResult = 1;
            return;
        }
        else if ( inName.length > nameLength) // 이름 길이 초과 
        {
            setNameChkResult("이름은 " + nameLength + "자리 이하로 설정해주세요 !!!");
            chkResult = 1;
            return;
        }
        else if ( pswdResult == 1) // 비밀번호 양식 문제 
        {
            chkResult = 1;
            return;
        }

        // 회원가입등록처리 
        if (chkResult === 1)
        {

        }
    }

    return(
        <div className="InputFom">
            id (email) : <input id='inputId' type='email'  onChange={ ifChange }></input>&nbsp;&nbsp;
            <button type='button' onClick={ selectId } >{ "중복확인" }</button><br />
            <span style={{ color : 'red'}}>{ idChkResult }</span><br />
            password : <input id='inputPassword' type='password' onChange={ ifChange }></input><br /><span style={{ color : 'red'}}>{ pswdChkResult }</span>
            (최소 8자리 이상) <br />
            (영어, 숫자, 특수문자 중 2종류 조합)<br /> <br />
            name : <input id='inputName' type='text' onChange={ ifChange }></input><br /><span style={{ color : 'red'}}>{ nameChkResult }</span><br /><br />

            <button type='button' onClick={ chkForm }>{ "Enroll" }</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type='button' >{ "Cancle" }</button>
        </div>
    );
}

export default SignupPage;