const Sequelize = require('sequelize');    // Import the Sequelize constructor from the library

require('dotenv').config();                // Import the dotenv package

let sequelize;                             // Initialize the connection variable

if (process.env.JAWSDB_URL) {                           // If the environment variable JAWSDB_URL is defined (i.e. we are running in the Heroku cloud environment)
  sequelize = new Sequelize(process.env.JAWSDB_URL);    // Create a new connection to the database using the connection string in the environment variable
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {  // Otherwise, create a new connection to the database using the local MySQL server and the credentials in the .env file
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;                             // Export the connection