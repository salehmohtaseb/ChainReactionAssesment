const loginSchema = require('./login');
const registerSchema = require('./register');
const postsSchema = require('./posts')

exports.schemas = {
    login : loginSchema.login,
    register: registerSchema.register,
    createPost: postsSchema.create,
    getById: postsSchema.getById,
    modifyPost: postsSchema.modify
}