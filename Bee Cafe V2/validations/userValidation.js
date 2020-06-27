const Joi = require('@hapi/joi');

const signupValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required(),
        number: Joi.number().required(),
        addressOne: Joi.string().required(),
        addressTwo: Joi.string().required(),
        city: Joi.string().required(),
        zip: Joi.number().required(),
        cart: Joi.string()
    })
    return schema.validate(data)
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;