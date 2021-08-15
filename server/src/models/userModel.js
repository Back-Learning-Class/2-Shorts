import Sequelize from "sequelize";

//const Sequelize = require('sequelize');

// User 는 모델이름(시퀄라이저에서) === 테이블이름(MySql)
export default class User extends Sequelize.Model {
  static init(sequelize) {
    // *** 시퀄라이저는 자료형의 명칭이나 표현에서 약간의 차이가 있음
    // *** 여러개의 DB 를 동시에 지원하기때문에 발생하는 상황
    // super.init(컬럼 정의 , 모델 설정 )
    return super.init(
      {
        // id 는 없어도 시퀄라이저가 자동으로 생성해준다
        // 따라서 id 는 생략한 모습
        /*
        id : {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        */
        email: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        admin: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize, // 연결객체인 sequelize 를 인자로 받아 모델과 mysql을 연결
        timestamps: false, // createAt, updateAt 관련
        underscored: false, // 컬럼 네이밍 snake_case: ex) create_at 언더바
        modelName: "User", // 모델이름 // JS 에서 사용
        tableName: "user", // 테이블이름 : 기본적으로 시퀄라이저에서 모델이름의 복수형을 자동생성 // SQL 에서 사용
        paranoid: false, // 제거한 날짜까지 추가 deletedAt처리 >>> soft delete // 후에 복구용이하게 하기 위함
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
  /* 유저가 comment 를 여러개 가질 수 있다는 관계표현 : hasMany
  // 
  static associate(db) {
      // Commet의 commenter 라는 컬럼이 외래키로 User 의 id 를 참조하고 있다. 
      // Comment 측에서는 db.Comment.belongsTo 와 같이 표현됨 (~~에 속해있다.)
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
  */
}
