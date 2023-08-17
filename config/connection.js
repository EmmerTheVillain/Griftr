// Import the Sequelize library, which is used to interact with databases
const Sequelize = require('sequelize');

// Load environment variables from a .env file
require('dotenv').config();

// Declare a variable to hold the Sequelize instance
let sequelize;

// Check if the environment variable JAWSDB_URL is present (used in deployment platforms like Heroku with JawsDB)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is present, create a Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not present, create a Sequelize instance using local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,       // Database name
    process.env.DB_USER,       // Database user
    process.env.DB_PASSWORD,   // Database password
    {
      host: 'localhost',       // Database host (in this case, local machine)
      dialect: 'mysql',         // Database dialect (type of database being used)
      port: 3306               // Database port (default port for MySQL)
    }
  );
}

// Export the created Sequelize instance to be used in other parts of the application
module.exports = sequelize;
