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
    Category.findAll({}).then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true }));
        res.render('dashboard', { categories, loggedIn: true });
    })
});

//Export the api route
module.exports = router;
