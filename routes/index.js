const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', user: req.user });
  });  

router.get('/sign-up', user_controller.user_create_get);
router.post('/sign-up', user_controller.user_create_post);
  
router.get('/log-in', user_controller.user_login_get);
router.post('/log-in', user_controller.user_login_post);
  
router.get('/log-out', user_controller.user_logout_get);

module.exports = router; 
