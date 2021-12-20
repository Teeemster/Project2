//Bring in joke model
const { Joke } = require('../models');

//Seed joke data
const jokedata = [
    {
        message: 'I am afraid for the calendar.',
        punchline: 'The days are numbered.',
        user_id: 1
    },
    {
        message: 'My wife said I should do lunges to stay in shape.',
        punchline: 'It would be a big step forward.',
        user_id: 2
    }
];

//Bulkcreate the jokes
const seedJokes = () => Joke.bulkCreate(jokedata);

//Export jokes
module.exports = seedJokes;
