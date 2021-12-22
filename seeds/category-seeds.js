//Bring in category model
const { Category } = require('../models');

//Seed category data
const categorydata = [
    {
        category_text: 'Pun',
    },
    {
        category_text: 'Dad Joke',
    },
    {
        category_text: 'Knock Knocks',
    },
    {
        category_text: 'Limerick',
    }
];

//Bulkcreate the categories
const seedCategories = () => Category.bulkCreate(categorydata);

//Export categories
module.exports = seedCategories;