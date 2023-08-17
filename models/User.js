// Import required modules and dependencies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User model by extending the Sequelize Model class
class User extends Model {
    // Method to check if a given password matches the stored hashed password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initialize the User model with its attributes and configuration
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8], // Password length must be at least 8 characters
        },
      },
    },
    {
      hooks: {
        // Hook executed before creating a new user
        beforeCreate: async (newUserData) => {
          // Hash the user's password with a salt of 10 rounds
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      sequelize, // Use the Sequelize connection defined earlier
      timestamps: false, // Disable automatic timestamps for this model
      freezeTableName: true, // Use the model name as the table name in database
      underscored: true, // Use snake_case for column names
      modelName: 'user', // Set the model name in singular form
    }
);

// Export the User model for use in other parts of the application
module.exports = User;
