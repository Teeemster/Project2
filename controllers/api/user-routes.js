//Require express and import the user model
const router = require('express').Router();
const { User } = require('../../models');

//CRUD ROUTES: READ
//Get All Users And Exclude Password
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(allUserInfo => res.json(allUserInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get A User By ID And Exclude Password
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(singleUserInfo => {
            if (!singleUserInfo) {
                res.status(404).json({ message: 'I cannot locate a user with this ID.' });
                return;
            }
            res.json(singleUserInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//CRUD ROUTES: POST
//Post Method to Create a User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(createUser => res.json(createUser))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Post Method For Login Route Authentication
router.post('/login', (req, res) => {

    //Queries the user table to find the user info
    User.findOne({
        where: {
            username: req.body.username
        }
        //If user is not found, send a message back as a response to the client
    }).then(userNameInfo => {
        if (!userNameInfo) {
            res.status(400).json({ message: 'There is no user with this username!' });
            return;
        }

        //Use the User.js model check pass function to verify the password matches the encrypted password
        const correctPassword = userNameInfo.checkPass(req.body.password);
        if (!correctPassword) {
            res.status(400).json({ message: 'This is the correct password!' })
            return;
        }

        res.json({ user: userNameInfo, message: 'You have been logged in!' });
    });
});

//Export
module.exports = router;