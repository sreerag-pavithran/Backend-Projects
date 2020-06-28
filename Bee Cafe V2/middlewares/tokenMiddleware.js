const jwt = require('jsonwebtoken');
let secret = `kjsd635d4f63sd54df63@4&sd565ds+dd54d4*&s54sd6ad`;

module.exports = (req, res, next)=>{
    const token = req.cookies['auth-token'];
    if(!token){
        return res.render('403');
    }
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (error) {
        console.log('JWT Error', error)
    }
}