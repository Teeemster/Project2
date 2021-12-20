//Bring in sequelize for ORM
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Extend Category Off Model
class Category extends Model { }

//Setup data columns
Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_text: {
            type: DataTypes.STRING,
            allowNull: false
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
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
);

//Export Category
module.exports = Category;