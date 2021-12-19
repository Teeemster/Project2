//Import Models, bcrypt, and sequelize
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//Extend User Off the Model
class User extends Model {
    //Function that checks the password of the user against the hashed password
    checkPass(loginPass) {
        return bcrypt.compareSync(loginPass, this.password);
    }
}

//Establish User Data
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },

            async beforeUpdate(updatedUser) {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

//Export User
module.exports = User;