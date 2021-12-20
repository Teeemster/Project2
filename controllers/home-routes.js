//Bring in express and sequelize
const router = require('express').Router();
const sequelize = require('../config/connection');
//Bring in ther models
const { Joke, User, Category, Vote } = require('../models');

//Set up API route for home page
router.get('/', (req, res) => {
    console.log('======================');
    Joke.findAll({
        attributes: [
            'id',
            'punchline',
            'message',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE joke.id = vote.joke_id)'), 'vote_count']
        ],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_text', 'joke_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(jokeData => {
            const jokes = jokeData.map(joke => joke.get({ plain: true }));

            res.render('homepage', {
                jokes,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Setup redirect route for login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//Export api routes to router
module.exports = router;
