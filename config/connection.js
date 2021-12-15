//Import Sequelize
const Sequelize = require('sequelize');

//Require .env
require('dotenv').config();

//Create the Database Connection
//Uses JAWSDB for remote database
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });

module.exports = sequelize;