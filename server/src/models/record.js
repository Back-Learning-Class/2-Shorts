"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Record.init(
    {
      Record_id: DataTypes.INTEGER,
      Record_date: DataTypes.STRING,
      Record_videoid: DataTypes.STRING,
      Record_videotitle: DataTypes.STRING,
      Record_thumbnail: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Record"
    }
  );
  return Record;
};
