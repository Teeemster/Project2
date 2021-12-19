const router = require('express').Router();
const { Category } = require('../../models');

router.get('/', (req, res) => {
    Category.findAll()
        .then(categoryInfo => res.json(categoryInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

router.post('/', (req, res) => {
    Category.create({
        category_text: req.body.category_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(categoryInfo => res.json(categoryInfo))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//Export
module.exports = router;