const Joi = require('joi');

exports.register = ()=> {
    return Joi.object({
        password: Joi.string().required(),
        email: Joi.string()
            .email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    }).required();
} 