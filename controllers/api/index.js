//Hooking Up Our Server
//Require Express
const router = require('express').Router();

//Add our user routes and link the folder
const userRoutes = require('./user-routes');
const jokeRoutes = require('./joke-routes');
router.use('/users', userRoutes);
router.use('/jokes', jokeRoutes);

//Export
module.exports = router;