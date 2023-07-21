const { Sequelize } = require("../models");
const db = require("../models");
const { defaultPagination } = require('../../config').httpConfig

const Op = db.Sequelize.Op;
const Users = db.User;
const Posts = db.Post;

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: To create a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       200:
 *         description: the email object
 *         headers: 
 *           Set-Cookie:
 *             schema: 
 *               type: string
 *               example: JSESSIONID=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       400: 
 *          description: Bad Request
 *       500:
 *         description: Some server error

 */

exports.create = async (req, res) => {
    try {
        const { subject, body } = req.body;
        await Posts.create({
            creator_id: req.session.user.id,
            subject: subject,
            body: body,
            flags: 0
        });

        res.send({ message: "Post created" });
    } catch(e) {
        console.log(e)
        res.status(500).send({ error: "Internal Server Error" })
    }
};

/**
 * @swagger
 * /posts:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: To get a list of the all posts for the user
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: the limit of rows 
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: the offset to start
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering by which column
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: list of all posts
 *       500:
 *         description: Some server error
 */

exports.findAll = async (req, res) => {
    const sort = req.query.order || 'created_at'
    const offset = req.query.offset || defaultPagination.offset
    const limit = req.query.limit || defaultPagination.limit
    const emails = await Posts.findAll({
        include: [{
            model: Users,
            as: "creator",
            attributes: ["id", "first_name", "last_name"]
        }],
        where: {
            creator_id : req.session.user.id
        },
        limit,
        offset,
        order: [[sort, 'desc']],
        paranoid: true 
    })

    return res.send({ data: emails });
} 


/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     summary: To delete an existing post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           pattern: ^[a-f0-9-]{32,36}
 *         required: true
 *         description: uuid of the post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       500:
 *         description: Some server error
 */
exports.delete = async (req, res) => {
    const whereObject = {
        id: req.params.id,
        creator_id: req.session.user.id
    }

    const post = await Posts.findOne({
        attributes: ['id'],
        where: whereObject
    });

    if (!post) {
        return res.status(400).send({ error: "Post not found" });
    }

    await post.destroy();

    res.send({ message: "Post deleted" });
}

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: To get a post by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           pattern: ^[a-f0-9-]{32,36}
 *         required: true
 *         description: uuid of the post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The post row if exist
 *       500:
 *         description: Some server error
 */
exports.getById = async (req, res) => {
    const post = await Posts.findOne({
        where: {
            id: req.params.id,
            creator_id: req.session.user.id
        },
        include: [{
            model: Users,
            as: "creator",
            attributes: ["id", "first_name", "last_name"]
        }]
    })

    res.send({ data: post });
}

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     security:
 *       - cookieAuth: []
 *     summary: To update an existing post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           pattern: ^[a-f0-9-]{32,36}
 *         required: true
 *         description: uuid of the post
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/Posts'
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Post modified successfully
 *       500:
 *         description: Some server error
 */

exports.update = async (req, res) => {
    const {subject, body} = req.body
    const post = await Posts.findOne({
        where: {
            id: req.params.id,
            creator_id : req.session.user.id
        },
    })

    if (!post) {
        return res.status(400).send({ error: "Post not found" });
    }

    post.subject = subject
    post.body = body
    await post.save()

    res.send({ message: "Post updated successfully" });

}