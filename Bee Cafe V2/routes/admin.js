const express = require('express');
const router = express.Router();
const adminController = require('../controllers/itemController');

// Admin Login Get
router.get('/', (req, res, next)=>{
    res.render('adminLogin');
})

// Admin Login POST
router.post('/', adminController.admin);

// Food Manage GET
router.get('/manage', adminController.manage);

// Food add GET
router.get('/add', (req, res, next)=>{
    res.render('add');
});

// Add Food POST
router.post('/add', adminController.addItem);

// GET Users View All
router.get('/users', adminController.users);

// GET Products View All
router.get('/products', adminController.products);



module.exports = router;