/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email 
 *         password:
 *           type: string
 *           descripton: Password
 *       example:
 *         email: tester@cReaction.com
 *         password: test-cReaction-1234
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           description: Email 
 *         password:
 *           type: string
 *           description: Password
 *         firstName:
 *           type: string
 *           description: firstName 
 *         lastName:
 *           type: string
 *           description: lastName 
 *       example:
 *         email: tester@cReaction.com
 *         password: test-cReaction-1234
 *         firstName: 'tester'
 *         lastName: 'tester'
 */
/**
 * @swagger
 *  tags:
 *    name: Authentication
 *    description: Api for authentication (login, logout, me, register)
 */

const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validation');
const { schemas } = require('../validation');

module.exports = (router, app) => {
  const authController = require("../controllers/auth.controller.js");
   
  router.post("/login", validate(schemas.login()), authController.login);
  router.get("/logout", authenticate, authController.logout);
  router.get("/me", authenticate, authController.me);
  router.post('/register', validate(schemas.register), authController.register);

  app.use("/api/v1/auth" , router);
};
