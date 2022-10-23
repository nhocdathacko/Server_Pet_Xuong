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
 *             $ref: '#/components/schemas/register'
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

/**
 * @swagger
 * /api/product/not-pet:
 *   get: 
 *     summary: Lấy dữ liệu sản phẩm là phụ kiện
 *     tags: [TestSwagger]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/product'
 */
/**
 * @swagger
 * /api/product/is-pet:
 *   get: 
 *     summary: Lấy dữ liệu sản phẩm là thú cưng
 *     tags: [TestSwagger]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/product'
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
 *         email: user123@gmail.com
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
 *         - userx
 *         - password
 *       properties:
 *         userx:
 *           type: string
 *           description: name's login of user 
 *         password:
 *           type: string
 *           description: pass of user 
 *       example:
 *         userx: "user321@gmail.com"
 *         password: "123456"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: tên của người chơi
 *         username:
 *           type: string
 *           description: tên đăng nhập
 *         email:
 *           type: string
 *           description: mật khẩu
 *         phone:
 *           type: string
 *           description: số điện thoại
 *         password:
 *           type: string
 *           description: mật khẩu
 *       example:
 *         name: "uso"
 *         username: "user321"
 *         email: "user321@gmail.com"
 *         phone: "0324221311"
 *         password: "123456"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - price
 *         - describes
 *         - evaluate
 *         - quantity
 *         - image
 *         - isPet
 *         - isStop
 *       properties:
 *         _id:
 *           type: string
 *           description: mã sản phẩm
 *         name:
 *           type: string
 *           description: tên sản phẩm
 *         price:
 *           type: Double
 *           description: Giá
 *         describes:
 *           type: string
 *           description: Mô tả sản phẩm
 *         evaluate:
 *           type: Double
 *           description: Đánh giá sản phẩm
 *         quantity:
 *           type: Int
 *           description: Số lượng sản phẩm
 *         image:
 *           type: string
 *           description: hình ảnh
 *         isPet:
 *           type: Boolean
 *           description: có phải thú cưng hay không
 *         isStop:
 *           type: Boolean
 *           description: Đã ngừng bán chauw
 *       example:
 *         _id: "asavdgfhjghfbvghng1231241312w0"
 *         name: "user321"
 *         price: user321@gmail.com
 *         describes: "0324221311"
 *         evaluate: 3.4
 *         quantity: 55
 *         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQBQQfBzEsqTN91MHwdukq0yaBxWIcn5RjUw&usqp=CAU"
 *         isPet: true
 *         isStop: false
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
