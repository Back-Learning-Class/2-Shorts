'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    // password 칼럼 자료형 변경 
    await queryInterface.changeColumn('user', 'password', {type: Sequelize.STRING(100)})
    .then( async function (){
      // 테이블 생성 
      await queryInterface.createTable('token', {
        token_id : {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement : true
        },
        user_id : {
          type : Sequelize.INTEGER, // 자료형 
          references:{model: 'user', key: 'id'}, // 외래키 설정 
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        token_value : {
          type : Sequelize.TEXT
        }
      })
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.changeColumn('user', 'password', {type: Sequelize.STRING(45)})
     .then (async function () {
       await queryInterface.dropTable('token')
     })
  }
};
