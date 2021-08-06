import db from "../config/db.js";

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

// 로그인 처리 
export async function loginUser(user) {

  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user WHERE email =? ", [user.id], (err, rows) => {
      if (err) {
        reject(console.log(err));
      }

      resolve(console.log("success", rows));
    });
  });
}
