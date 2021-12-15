//Require Express For Servers
const express = require('express');
const app = express();
//Require Path For Joining File Paths
const path = require('path');
//Require Express Session For Tracking User Login Sessions
const session = require('express-session');
//Require Handlebars used to generate HTML templates
const exphbs = require('express-handlebars');
//Setup the Server Port
const PORT = process.env.PORT || 3001;
//Require Sequelize To Allow JavaScript for SQL
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Middleware for Handlebars
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Session variable that allows us to push a var into cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//Middleware for verifying user is still logged in
app.use(session(sess));
//Middleware for servers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

//Starts the Server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});