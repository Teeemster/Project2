//Bring in category model
const { Category } = require('../models');

//Seed category data
const categorydata = [
    {
        category_text: 'Dad Joke',
        user_id: 1,
        joke_id: 1
    },
    {
        category_text: 'Dad Joke',
        user_id: 2,
        joke_id: 2
    }
];

//Bulkcreate the categories
const seedCategories = () => Category.bulkCreate(categorydata);

//Export categories
module.exports = seedCategories;