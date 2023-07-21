const Joi = require('joi');

exports.create = ()=> {
    return Joi.object({
        subject: Joi.string().required(),
        body: Joi.string().required(),
    }).required();
} 

exports.getById = ()=> {
    return Joi.object({
        id: Joi.string().guid().required()
    }).required();
}

exports.modify = () => {
    return Joi.object({
        id: Joi.string().guid().required(),
        subject: Joi.string().required(),
        body: Joi.string().required(),
    }).required();
}