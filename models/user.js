const {
    Model 
  } = require('sequelize');
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
                    msg: 'Please enter a title, this field cannot be left blank.'
                  }
                }},
        lastName: {type: DataTypes.STRING,
                allowNull: false,
              validate: {
                notEmpty: {
                  msg: 'Please enter an author name, this field cannot be left blank.'
                }
              } },
        emailAddress: DataTypes.STRING,
        password: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'User',
      });

      User.associate = (models) => {
        User.hasMany(models.Course, {foreignKey: 'userId'});
  };
      return User;

};