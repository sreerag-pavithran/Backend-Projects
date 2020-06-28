var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');
const verify = require('../middlewares/tokenMiddleware');
let itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Login Page
router.get('/login', (req, res, next)=>{
  res.render('login');
});

// GET Signup Page
router.get('/signup', (req, res, next)=>{
  res.render('signup');
});

// POST Signup Page
router.post('/signup', userController.register);

// POST Login Page
router.post('/login', userController.login);

// GET Main Page
router.get('/home', verify, userController.home);

// GET Logout 
router.get('/logout', (req, res, next)=>{
  res.clearCookie("auth-token");
  res.redirect('/');
});

// GET Profile Page
router.get('/profile',verify, userController.profile);

// POST Profile Page
router.post('/profile', userController.upadteProfile);

// GET Address Page
router.get('/address', verify, userController.address);

// POST Address Page
router.post('/address', userController.upadteProfile);

// POST Add to cart
router.post('/add', itemController.addToCart);

// GET View Cart
router.get('/cart', verify,  itemController.viewCart);

// Get Delete Cart Items
router.get('/delete', itemController.deleteCart);

module.exports = router;
