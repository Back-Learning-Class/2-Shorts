// 시퀄라이저 사용시 사용되지 않음 
import db from "../../config/db.js";

// id 중복검사
export async function selectId(user) {
  var query = "SELECT id FROM user WHERE email = '" + user.id + "'";

  return new Promise((resolve, reject) => {
    db.query(query, (error, rows, fields) => {
      if (error) {
        console.log("에러발생 : services/userService select error !!!");
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
  console.log(user.id);
  console.log(user.name);
  console.log(user.password);
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
        // db 처리 에러
        console.log("에러발생 : services/userService insert error !!!");
        reject(new Error(error));
      } else {
        // insert 성공시 OkPacket 반환
        // OkPacket 가진 정보 참고
        if (rows.serverStatus) {
          // 등록 성공
          resolve(0);
        } else {
          // 등록 실패
          resolve(-1);
        }
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
