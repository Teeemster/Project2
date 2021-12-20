//Bring in sequelize and user/joke model
const sequelize = require('../config/connection');
const { User, Joke } = require('../models');

//Bring in user data
const userdata = [
    {
        username: 'Jay',
        password: 'password123'
    },
    {
        username: 'Angel',
        password: 'password321'
    }
];

//Bulkcreate the users
const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

//Export users
module.exports = seedUsers;