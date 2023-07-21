const db = require("../models");
const { encrypt, compare } = require('../utils/crypto');

const Op = db.Sequelize.Op;
const Users = db.User;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: To login to the system
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Credentials are valid and you are loged in 
 *         headers: 
 *           Set-Cookie:
 *             schema: 
 *               type: string
 *               example: JSESSIONID=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401: 
 *          description: Credentials are invalid
 *       500:
 *         description: Some server error

 */

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        Users.findOne({
            attributes: {
                exclude: ['role_id', 'created_at', 'updated_at']
            },
            where: {
                email: {
                    [Op.iLike]: email
                }
            },
        }).then(user => {

            if(!user) {
                res.status(404).send({ message: "Not Found" });
            }

            const passwordComnparing = compare(password, user.password);

            if(!passwordComnparing) {
                res.status(400).send({ message: "Invalid credentials" });
            }
            
            req.session.user = {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            };

            res.send(req.session.user);
        })
    } catch(e) {
        console.log(e)
        res.status(500).send({ error: "Internal Server Error" })
    }
};

/**
* @swagger
* /auth/me:
*   get:
*     security:
*       - cookieAuth: []
*     summary: To return the details for the loggedIn user
*     tags: [Authentication]
*     responses:
*       200:
*         description: Logout successfully!
*       500:
*         description: Some server error
*/

exports.me = (req, res) => {
    try {
        return res.send(req.session.user);
    } catch(e) {
        console.log(e)
        res.status(500).send({ error: "Internal Server Error" })
    }
}

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: To logout from the system
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout sucessfully!
 *       500:
 *         description: Some server error
 */

exports.logout = async(req, res) => {
    try {
        req.session.destroy();
        res.send({ message: "Logout successful" });
    } catch(e) {
        console.log(e)
        res.status(500).send({ error: "Internal Server Error" })
    }
}


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: To register to the system
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User has been registered successfully 
 *         headers: 
 *           Set-Cookie:
 *             schema: 
 *               type: string
 *               example: JSESSIONID=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error

 */

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        Users.count({
            where: {
                email: {
                    [Op.iLike]: email
                }
            },
        }).then(async count => {

            if(count) {
                return res.status(404).send({ message: "This email already in use" });
            }

            const encryptedPassword = await encrypt(password)
            await Users.create({
               email,
               first_name: firstName,
               last_name: lastName,
               password: encryptedPassword
            });

            res.send({ message: "Registration successful" });
        })
    } catch(e) {
        console.log(e)
        res.status(500).send({ error: "Internal Server Error" })
    }
};