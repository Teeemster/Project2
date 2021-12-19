//Require express server and models
const router = require('express').Router();

//Bring in Joke model and User Model (User is brought in to retrieve info on person that posted, and with user_id we can do a JOIN)
const { Vote, Joke, User, Category } = require('../../models');

//Get all jokes
router.get('/', (req, res) => {
    //Use the findall SQL function to query all jokes
    Joke.findall({
        //Pull ID, URL, message, category, created at attributes, and votes
        attributes: [
            'id',
            'joke_url',
            'message',
            'category_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE joke.id = vote.joke_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        //Include the User that posted
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['id', 'category_text', 'joke_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        //Get ther joke data
        .then(userJokeData => res.json(userJokeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Post a new joke
//The slash links to index.js to api folder, which then links to index.js in controller file, which then links to server.js
router.post('/', (req, res) => {
    //User .create Sequelize function to form a joke with a message, url, category, and links to user id
    Joke.create({
        message: req.body.message,
        joke_url: req.body.joke_url,
        user_id: req.body.user_id,
        category_id: req.body.category_id
    })
        //Post the joke data
        .then(userJokeData => res.json(userJokeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Allow the user to upvote jokes via /api/jokes/upvote
router.put('/upvote', (req, res) => {
//Create a vote using .create
    Vote.create({
        user_id: req.body.user_id,
        joke_id: req.body.joke_id
    }).then(() => {
        //Return jokes, where attributes id, url, title, created at, and vote count are included
        return Joke.findOne({
            where: {
                id: req.body.joke_id
            },
            attributes: [
                'id',
                'joke_url',
                'message',
                'created_at',
                [
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE joke.id = vote.joke_id)'),
                    'vote_count'
                ]
            ]
        })
            //Post the joke data
            .then(userJokeData => res.json(userJokeData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });
});

//Export
module.exports = router;