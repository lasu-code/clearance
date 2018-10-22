var express = require('express');
var router = express.Router();
let studentController = require('../controllers/studentController.js');

/* GET home page. */
router.get('/', studentController.home);

router.get('/login', studentController.login);

router.get('/profile', studentController.profile);

router.get('/students', studentController.students);

router.get('/main', studentController.main);

router.get('/bursarylogin', studentController.bursarylogin);

router.get('/bursary', studentController.bursary);





module.exports = router;