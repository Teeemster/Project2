//Hooking Up Our Server
//Require Express
const router = require('express').Router();

//Add our user routes and link the folder
const userRoutes = require('./user-routes');
const jokeRoutes = require('./joke-routes');
const categoryRoutes = require('./category-routes');
router.use('/users', userRoutes);
router.use('/jokes', jokeRoutes);
router.use('/categories', categoryRoutes);

//Export
module.exports = router;