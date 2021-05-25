'use strict'

const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    };
    //Adding Sequelize ORM validation and appropriate error messages to ensure the title and author values cannot be empty
    User.init({
        firstName: {type: DataTypes.STRING, 
                allowNull: false,
                validate: {
                  notEmpty: {
                    msg: 'Please enter a first name, this field cannot be left blank.'
                  }
                }},
        lastName: {type: DataTypes.STRING,
                allowNull: false,
              validate: {
                notEmpty: {
                  msg: 'Please enter an lasr name, this field cannot be left blank.'
                }
              } },
        emailAddress: { type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: 'This email address is already in use.'
          },
          validate: {
            notEmpty: {
              msg: 'Please enter an email address.'
            },
            isEmail: {
              msg: 'This email address is not valid.'
            }
          }
        },
        password: { type: DataTypes.STRING, 
          allowNull: false,
          set(val) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue("password", hashedPassword);
          },
          validation: {
            notEmpty: {
              msg: 'Please enter a password.'
            }
          }
        }
      }, {
        sequelize,
        modelName: 'User',
      });
//Defines association between User and Course models
      User.associate = (models) => {
        User.hasMany(models.Course, {foreignKey: 'userId', allowNull: false});
  }; 
      return User;

};