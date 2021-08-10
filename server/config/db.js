import mysql from "mysql";

/*export const host = process.env.MYSQL_HOST;
export const user = process.env.MYSQL_USER;
export const password = process.env.MYSQL_PASS;
export const database = process.env.MYSQL_DB;*/
import dotenv from "dotenv";

dotenv.config();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user"
  /*dialect: mysql,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }*/
});

/*con.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected");
  let sql = "SELECT * FROM lock_extension";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});*/

export default con;
