//Import Models and sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Extend Vote Off the Model
class Vote extends Model { }

//Establish Vote Data
Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        joke_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'joke',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

//Export Vote
module.exports = Vote;
