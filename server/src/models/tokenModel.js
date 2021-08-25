import Sequelize from "sequelize";

export default class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        token_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: Sequelize.INTEGER, // 자료형
          references: { model: "user", key: "id" }, // 외래키 설정
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
        token_value: {
          type: Sequelize.TEXT
        }
      },
      {
        sequelize, // 연결객체인 sequelize 를 인자로 받아 모델과 mysql을 연결
        timestamps: false, // createAt, updateAt 관련
        underscored: false, // 컬럼 네이밍 snake_case: ex) create_at 언더바
        modelName: "Token", // 모델이름 // JS 에서 사용
        tableName: "token", // 테이블이름 : 기본적으로 시퀄라이저에서 모델이름의 복수형을 자동생성 // SQL 에서 사용
        paranoid: false, // 제거한 날짜까지 추가 deletedAt처리 >>> soft delete // 후에 복구용이하게 하기 위함
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
}
