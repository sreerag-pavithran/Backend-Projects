const Item = require('../models/itemModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
var Cart = require('../models/cartModel');
let jwt_decode = require('jwt-decode')

let admin = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email }, (err, data)=>{
        if(err){
            console.log('Error Occured')
        }else{
            if(data){
                bcrypt.compare(password, data.password, (err, result)=>{
                    if(err){
                        console.log('Error Occured', err)
                    }else{
                        if(result === true)
                        res.render('admin')
                    }
                })
            }
        }
    })
}

let addItem = async(req, res, next)=>{
    let item = new Item({ 
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        file: req.body.file
     });
    try {
        await item.save()
        res.redirect('/admin/add')
    } catch (error) {
        console.log('Error Occured', error)
    }
}

let manage = async(req, res, next)=>{
    let items = await Item.find()
    res.render('food', {
        items: items
    })
}

let users = async(req, res, next)=>{
    let allUsers = await User.find()
    res.render('users', {
        users: allUsers
    });
}

let products = async(req, res, next)=>{
    let items =  await Item.find()
    res.render('products', {
        items: items
    });
};

let addToCart = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    let user = await User.find({ _id: decoded._id });
    let userid = decoded._id;
    let id = req.query.id;
    let qty = 0;
    let data;
    let finddata = await Cart.findOne({ prdtid: id, userid: userid })
    if(finddata)
        qty = (finddata.qty)+1
    else{
        data = new Cart({
            prdtid: id,
            userid: userid,
            qty: 1
        })
        
    }
    try{
        if(qty == 0){
            await data.save()
        }else{
            await Cart.updateOne({ prdtid: id, userid: userid }, {qty: qty})
        }
        // res.redirect('/mycart');
        res.redirect('/home')
    }catch(error){
        console.log('Error')
        res.send(error)
    }
}

let viewCart = async(req, res, next)=>{
    const arr = [];
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    let allcart = await Cart.find({ userid: decoded._id })
    let cartNum = allcart.length;
    for (i in allcart){
        let products = await Item.findById({ _id: allcart[i].prdtid })
        arr.push(products)
    }
    let user = await User.findOne({ _id: decoded._id })
    try {
        res.render('cart', {
            user: user,
            allcart: allcart,
            products: arr,
            cartNum: cartNum
        })
    } catch (error) {
        console.log(error)
    }
}

let deleteCart = async(req, res, next)=>{
    const token = req.cookies['auth-token'];
    let decoded = jwt_decode(token);
    let userid = decoded._id;
    let id = req.query.id;
    let product = await Cart.deleteOne({ prdtid: id, userid: userid });
    res.redirect('/cart');
}

module.exports = {
    admin, addItem, manage, users, products, addToCart, viewCart, deleteCart
}