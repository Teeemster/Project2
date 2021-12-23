//Require express and set up the category model
const router = require('express').Router();
const { Category } = require('../../models');

//Get all categories
router.get('/', (req, res) => {
    Category.findAll()
        .then(categoryInfo => res.json(categoryInfo))
        .catch(err => {
            res.status(500).json(err);
        });
  
});

//Post a category
router.post('/', (req, res) => {
    Category.create({
        category_text: req.body.category_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(categoryInfo => res.json(categoryInfo))
        .catch(err => {
            res.status(400).json(err);
        });
});

//Export this route
module.exports = router;