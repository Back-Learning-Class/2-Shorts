//import mysql from "mysql";
import db from "../../config/db.js";
/*const connection = mysql.createConnection({
  host: "localhost",
  user: "admin", // DB 접속 계정 id
  password: "adminadmin", // DB 접속 계정 비밀번호
  database: "2Shorts", // 접속 데이터베이스
  dateStrings: "date"
});*/

/** 위쪽으로는 다른 파일에 구성해야함 - config 로 구성
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 * ////////////////////////////////////////////////////////////////
 */

// 테스트
// --------------------------------------------------------------------
/*
connection.query("select * from user",(error, rows, fields) =>
{
    if(error)
    {
        throw error;
    }
    else
    {
        console.log(rows);
        console.log("--------------------------------------");
        console.log(rows[0]);
        console.log("--------------------------------------");
        console.log(rows[0].email);
        console.log("--------------------------------------");
    }
});
console.log("--------------------------------------");
selectId({
    id : "kimjung@naver.com",
    password : "",
    name : ""
});
console.log("--------------------------------------");
enrollUser({
    id : "home@home.com",
    password : "home",
    name : "마이홈"
});
*/
// --------------------------------------------------------------------

// id 중복검사
export async function selectId(user) {
  var query = "SELECT id FROM user WHERE email = '" + user.id + "'";

  return new Promise((resolve, reject) => {
    db.query(query, (error, rows, fields) => {
      if (error) {
        console.log("select error !!!");
        reject(new Error(error));
      } else {
        // 존재하지않는 경우 : 빈값
        if (rows[0] === undefined) {
          console.log("해당 아이디는 중복되지 않습니다.");
          console.log("조회값이 없습니다. ");
          resolve(0);
        }
        // 존재하는 경우
        else {
          console.log("중복되는 아이디가 검색되었습니다.");
          console.log("중복 되는 아이디의 id 값 : " + rows[0].id);
          resolve(-1);
        }
      }
    });
  });
}

// 회원등록 처리
export async function enrollUser(user) {
  var enrollResult = "";
  var query =
    "INSERT INTO user (`id`, `email`, `name`, `password`, `admin`) VALUES ( (SELECT MAX(id)+1 FROM user AS id) , '" +
    user.id +
    "', '" +
    user.name +
    "','" +
    user.password +
    "', 0)";

  return new Promise((resolve, reject) => {
    db.query(query, (error, rows, fields) => {
      if (error) {
        console.log("insert error !!!");
        reject(new Error(error));
      } else {
        resolve(rows);
      }
    });
  });
}

//로그인을 위한 아이디 비밀번호 확인
export async function loginUser(user) {
  //let chkid = "SELECT * FROM user WHERE email = '" + user.id + "'";

  //추후 비밀번호 암호화 후 설정 다시 변경 해야함
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT email, password FROM user WHERE email =? ",
      [user.id],
      (err, rows) => {
        if (err) {
          reject(new Error(err));
        }

        if (rows.length === 0) {
          resolve(1, console.log("Id fail 1 ", user));
        } else if (rows[0].password != user.password) {
          resolve(2, console.log("password fail 2 ", rows[0].email));
        } else if (rows[0].password == user.password) {
          resolve(0, console.log("suceess 0  ", rows));
        }
      }
    );
  });
}
