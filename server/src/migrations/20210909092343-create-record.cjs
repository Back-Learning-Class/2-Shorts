"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Records", {
      Record_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Record_date: {
        type: Sequelize.STRING
      },
      Record_videoid: {
        type: Sequelize.STRING
      },
      Record_videotitle: {
        type: Sequelize.STRING
      },
      Record_thumbnail: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Records");
  }
};
