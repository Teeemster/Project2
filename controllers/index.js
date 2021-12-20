//Group all api routes together
const router = require('express').Router();

//Bring in general API routes, home routes, and dashboard routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js')

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

//Export all api routes under router
module.exports = router;
