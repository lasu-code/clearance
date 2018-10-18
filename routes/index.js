var express = require('express');
var router = express.Router();

const clearanceController = require('../controllers/clearanceControllers');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', clearanceController.homepage);
router.get('/unitSignup', clearanceController.signup);
router.post('/units',  clearanceController.units);
router.get('/units',  clearanceController.units);

router.get('/authentication', clearanceController.authentication);
router.get('/studentDashboard', clearanceController.studentDashboard);
router.post('/studentDashboard', clearanceController.studentDashboard);
router.get('/bursary', clearanceController.bursary);



module.exports = router;
