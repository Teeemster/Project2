//Bring in the vote category model
const { Vote } = require('../models');

//Seed vote data
const votedata = [
    {
        user_id: 1,
        joke_id: 2
    },
    {
        user_id: 2,
        joke_id: 1
    }
];

//Bulkcreate the votes
const seedVotes = () => Vote.bulkCreate(votedata);

//Export the votes
module.exports = seedVotes;