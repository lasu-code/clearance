var express = require('express');
var router = express.Router();

const clearanceController = require('../controllers/clearanceControllers');
const unitsController = require('../controllers/dashboardControllers');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', clearanceController.homepage);

router.get('/bursery', unitsController.bursery);
router.get('/library', unitsController.library);
router.get('/sportsCentre', unitsController.sportsCentre);
router.get('/studentAffairs', unitsController.studentAffairs);
router.get('/faculties', unitsController.faculties);
router.get('/internalAudits', unitsController.internalAudits);


module.exports = router;
