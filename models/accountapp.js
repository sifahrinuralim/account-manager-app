'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountApp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AccountApp.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    position: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccountApp',
    hooks: {
      beforeCreate: async (accountapp) => {
        console.log('Encrypting password...')
        accountapp.password = await bcrypt.hash(accountapp.password, saltRounds)
      },
      afterCreate: async (accountapp) => {
        console.log('Create Success!');
      }
    }
  });
  return AccountApp;
};