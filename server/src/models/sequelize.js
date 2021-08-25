import Sequelize from "sequelize";
import User from "./userModel.js"; // User 모델
import Token from "./tokenModel.js";

// json 파일 가져오기
// import seqConfig from "../../config/seqConfig.json";
import { readFile } from "fs/promises"; // json 파일을 읽기 위한 모듈
const seqConfig = JSON.parse(
  await readFile(new URL("../../config/seqConfig.json", import.meta.url))
);

const env = process.env.NODE_ENV || "development";
const config = seqConfig[env];
const db = {};

// 데이터베이스를 여러개 생성하여 연결도 가능하다. sequelize01 = new Sequelize~~~
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const sequelize1 = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.sequelize1 = sequelize1;

// db.Sequelize02 = new 새로 생성할 데이터베이스

db.User = User;
db.Token = Token;

User.init(sequelize); // 연결객체에 모델을 연결 // User 모델에 sql을 연결
Token.init(sequelize1);

export default db;
