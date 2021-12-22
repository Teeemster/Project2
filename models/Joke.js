//Import Models and sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Extend Joke Off the Model
class Joke extends Model {
    //Indicates upvote is based on post model and not an instance method
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            joke_id: body.joke_id
        }).then(() => {
            return Joke.findOne({
                where: {
                    id: body.joke_id
                },
                attributes: [
                    'id',
                    'punchline',
                    'title',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE joke.id = vote.joke_id)'), 'vote_count']
                ]
            });
        });
    }
}

//Establish Joke Data
Joke.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        punchline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'joke'
    }
);

//Export Joke
module.exports = Joke;