const User = require('../models/userModel');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const Item = require('../models/itemModel');
const Cart = require('../models/cartModel');
const { signupValidation, loginValidation } = require('../validations/userValidation');
require('dotenv');


let register = async(req, res, next)=>{
    const { error } = signupValidation(req.body);
    if(error){
        let message = error.details[0].message;
        console.log(message)
        return res.send(message);
    }

    const mailExist = await User.findOne({ email: req.body.email });
    if(mailExist){
        return res.send('<script type="text/javascript"> alert("Email Already Exists!"); </script>');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        number: req.body.number,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        city: req.body.city,
        zip: req.body.zip,
        cart: req.body.cart
    })
    try {
        await user.save()
        res.send('<script type="text/javascript"> alert("User Registered Successfully!"); window.location= "/login"; </script>');
    } catch (error) {
        console.log('Error Occured Here', error);
    }
};

let login = async(req, res, next)=>{
    const { error } = loginValidation(req.body);
    if(error){
        res.send(error)
    };

    const user = await User.findOne({ email: req.body.email });
    if(!user){
        res.send('<script type="text/javascript"> alert("Email Doesnt exists!");</script>');
    };

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        res.send('<script type="text/javascript"> alert("Wrong Password");</script>');
    };

    let userName = user.name;
    let secret = `kjsd635d4f63sd54df63@4&sd565ds+dd54d4*&s54sd6ad`;
    const token = jwt.sign({ _id: user._id }, secret);

    let items = await Item.find();
    return res.cookie('auth-token', token, {
        maxAge: new Date(Date.now() + 10*60*60),
        secure: false,
        httpOnly: true
    }).redirect('/home');
};


let profile = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = String(decoded._id);
    let user = await User.findOne({ _id: userId })
    return res.cookie('user', user, {
        maxAge: new Date(Date.now() + 10*60*60),
        secure: false
    }).render('profile', {
        user: user
    })
};

let upadteProfile = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = String(decoded._id);
    let user = await User.findOne({ _id: userId })
    let updatedUser = { ...req.body }
    let updated = await User.findByIdAndUpdate(userId, updatedUser)
    try {
        res.render('updatedUser', {
            user: updated
        })
    } catch (error) {
        console.log(error)
    }
}

let home = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    let user = await User.find({ _id: decoded._id });
    let snacks = await Item.find({ category: "Snacks" })
    let cart = await Cart.find({ userid: decoded._id });
    let cartNum = cart.length;
    let items = await Item.find()
    try {
        res.render('home', {
            items: items,
            snacks: snacks,
            user: user,
            cart: cart,
            cartNum: cartNum
        })
    } catch (error) {
        console.log('Error Occured')
    }
}


let address = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    let userId = String(decoded._id);
    let user = await User.findOne({ _id: userId })
    res.render('address', {
        user: user
    })
};

let updateAddress = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    let userId = String(decoded._id);
    let user = await User.findOne({ _id: userId })
    let updatedUser = { ...req.body }
    let updated = await User.findByIdAndUpdate(userId, updatedUser )
    try {
        res.render('address', {
            user: updated
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    register, login, profile, upadteProfile, address, updateAddress, home
}