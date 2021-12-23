//Bring in express and sequelize
const router = require('express').Router();
const sequelize = require('../config/connection');
//Bring in the models
const { Joke, User, Category, Vote } = require('../models');
const withAuth = require('../utils/auth');

//Set up API route for home page
router.get('/', withAuth, (req, res) => {
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
                attributes: ['id', 'category_text', 'created_at'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(jokeData => {
            const jokes = jokeData.map(joke => joke.get({ plain: true }));
            res.render('homepage', {jokes, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
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
