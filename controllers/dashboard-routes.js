//Bring in Express & Sequelize
const router = require('express').Router();
const sequelize = require('../config/connection');
//Bring in the models
const { Joke, User, Category, Vote } = require('../models');
const withAuth = require('../utils/auth');

//Set up the GET route for pulling dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Joke.findAll({
        where: {
            user_id: req.session.user_id
        },
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
            res.render('dashboard', { jokes, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Export the api route
module.exports = router;
