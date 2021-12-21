//Require all models
const User = require('./User');
const Joke = require("./Joke");
const Vote = require('./Vote');
const Category = require('./Category');

//Setup assocatiations
User.hasMany(Joke, {
    foreignKey: 'user_id'
});

Joke.belongsTo(User, {
    foreignKey: 'user_id',
});

//User / Vote Associations
User.belongsToMany(Joke, {
    through: Vote,
    as: 'voted_jokes',
    foreignKey: 'user_id'
});

Joke.belongsToMany(User, {
    through: Vote,
    as: 'voted_jokes',
    foreignKey: 'joke_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Joke, {
    foreignKey: 'joke_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Joke.hasMany(Vote, {
    foreignKey: 'joke_id'
});

Category.belongsTo(User, {
    foreignKey: 'user_id'
});

Category.belongsTo(Joke, {
    foreignKey: 'joke_id'
});

User.hasMany(Category, {
    foreignKey: 'user_id'
});

Joke.hasMany(Category, {
    foreignKey: 'joke_id'
});

//Export all models
module.exports = { User, Joke, Vote, Category };