// Import required modules and dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Define the Match model by extending the Sequelize Model class
class Match extends Model {}

// Initialize the Match model with its attributes and configuration
Match.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // References the User model
                key: 'id' // References the primary key 'id' in the User model
            }
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // References the User model
                key: 'id' // References the primary key 'id' in the User model
            }
        }
    },
    {
        sequelize, // Use the Sequelize connection defined earlier
        timestamps: false, // Disable automatic timestamps for this model
        freezeTableName: true, // Use the model name as the table name in the database
        underscored: true, // Use snake_case for column names
        modelName: 'match', // Set the model name in singular form
    }
);

// Export the Match model for use in other parts of the application
module.exports = Match;
