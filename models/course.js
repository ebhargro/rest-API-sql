'use strict';

const { Model, DataTypes, ConnectionRefusedError } = require('sequelize');


  module.exports = (sequelize) => {
    class Course extends Model {
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
    Course.init({
        id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {type: DataTypes.STRING, 
                allowNull: false,
                validate: {
                  notEmpty: {
                    msg: 'Please enter a title, this field cannot be left blank.'
                  }
                }},
        description: {type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                notEmpty: {
                  msg: 'Please enter an author name, this field cannot be left blank.'
                }
              } },
        estimatedTime: DataTypes.STRING,
        materialsNeeded: DataTypes.STRING 
      }, {
        sequelize,
        modelName: 'Course',
      });
//Defines association between User and Course models
      Course.associate = (models) => {
            Course.belongsTo(models.User, {foreignKey: 'userId'});
      };

      return Course;

};