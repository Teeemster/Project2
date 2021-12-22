//Group all seeds together
const seedUsers = require('./user-seeds');
const seedJokes = require('./joke-seeds');
const seedCategories = require('./category-seeds');
const seedVotes = require('./vote-seeds');

//Bring in sequelize
const sequelize = require('../config/connection');

//Group all seeds together in async function
const seedAll = async () => {
    // await sequelize.sync({ force: true });
    // console.log('--------------');
    // await seedUsers();
    // console.log('--------------');

    // await seedJokes();
    // console.log('--------------');

    await seedCategories();
    console.log('--------------');

    // await seedVotes();
    // console.log('--------------');

    process.exit(0);
};

//Execute the function
seedAll();