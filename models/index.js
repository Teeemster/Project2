const User = require('./User');
const Joke = require("./Joke");
const Vote = require('./Vote');

//Setup assocatiations
//User / Joke Assocations
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

module.exports = { User, Joke, Vote };