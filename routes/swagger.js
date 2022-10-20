var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: login user
 *     tags: [TestSwagger]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công dữ liệu trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Đăng nhập thất bại dữ liệu trả về
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/statusF'
 */




/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: register user
 *     tags: [TestSwagger]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Đăng ki thành công dữ liệu trả về
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/statusT'
 *       500:
 *         description: Đăng kí thất bại dữ liệu trả về
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/statusF'
 */













// ---------------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - username
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: id of user
 *         name:
 *           type: string
 *           description: name of user
 *         image:
 *           type: string
 *           description: image of user
 *         username:
 *           type: string
 *           description: name's login of user 
 *         email:
 *           type: string
 *           description: email of user 
 *         phone:
 *           type: string
 *           description: telephone number of user 
 *         password:
 *           type: string
 *           description: pass of user 
 *       example:
 *         id: obg123124124124hahbgn214120
 *         name: Swagger
 *         image: https://photo2.tinhte.vn/data/attachment-files/2021/07/5557920_CV.jpg
 *         username: testswagger
 *         email: testswagger@gmail.com
 *         phone: "0123456789"
 *         password: nahncjanvianvahvav=yuav$bK^BVC*bhcv
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: name's login of user 
 *         password:
 *           type: string
 *           description: pass of user 
 *       example:
 *         username: testswagger
 *         password: nahncjanvianvahvav=yuav$bK^BVC*bhcv
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     statusT:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           description: status 
 *       example:
 *         status: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     statusF:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           description: status 
 *       example:
 *         status: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     statusT:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           description: status 
 *       example:
 *         status: true
 */

/**
  * @swagger
  * tags:
  *   name: TestSwagger
  *   description: The TestSwagger managing API
  */











module.exports = router;
