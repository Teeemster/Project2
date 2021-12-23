//Setup category seeds
const seedCategories = require('./category-seeds');

//Bring in sequelize
const sequelize = require('../config/connection');

//Wrap seed categories in a function
const seedAll = async () => {
    await seedCategories();
    process.exit(0);
};

//Execute the function
seedAll();