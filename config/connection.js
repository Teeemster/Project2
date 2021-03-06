//Import Sequelize
const Sequelize = require('sequelize');

//Require .env
require('dotenv').config();

//Create the Database Connection
//Uses JAWSDB for remote database which has been setup on heroku
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });

//Exports the sequelize connection
module.exports = sequelize;