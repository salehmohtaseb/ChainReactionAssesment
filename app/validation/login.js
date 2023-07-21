const Joi = require('joi');

exports.login = ()=> {
    return Joi.object({
        password: Joi.string().required(),
        email: Joi.string()
            .email().required()
    }).required();
} 