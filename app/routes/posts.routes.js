/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - recipients
 *         - subject
 *         - body
 *       properties:
 *         subject:
 *           type: string
 *           descripton: Post subject
 *         body:  
 *           type: string 
 *           descripton: Post body
 *       example:
 *         subject: Post subject
 *         body: Post body
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Posts
 *    description: CRUD operations for blog posts
 */

const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validation');
const { schemas } = require('../validation');
 
 module.exports = (router, app) => {
    const postsController = require("../controllers/posts.controller.js");
      
    router.post('/', authenticate, validate(schemas.createPost()), postsController.create);
    router.get('/', authenticate,  postsController.findAll);
    router.get('/:id([a-f0-9-]{32,36})', authenticate, validate(schemas.getById()), postsController.getById);
    router.delete('/:id([a-f0-9-]{32,36})', authenticate, validate(schemas.getById()), postsController.delete);
    router.patch('/:id([a-f0-9-]{32,36})', authenticate, validate(schemas.modifyPost()), postsController.update);

    app.use("/api/v1/posts" , router)
 
 };
 