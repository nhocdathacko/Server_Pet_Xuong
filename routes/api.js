var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const authentication = require('../components/middle/authentication');

// http://localhost:3000/api/login

router.post('/login', async function (req, res, next) {
  const { username, email, password } = req.body;
  const result = await userController.dangNhap(username, email, password);
  if (result) {
    // token lấy ở đây
    const token = jwt.sign({ id: result.id, username: result.username }, 'iloveyou');
    res.json({ status: true, result, token });
  } else {
    res.json({ status: false });
  }
});


// http://localhost:3000/api/register

router.post('/register', async function (req, res, next) {
  const { name, username, email, phone, password } = req.body;
  const result = await userController.register(name, username, email, phone, password);
  if (result) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});




// http://localhost:3000/api/products
// thêm middle kiểm tra login
// khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/products', [authentication.checkToken], async function (req, res, next) {
  const products = await productController.getProducts();
  res.json(products);
});

// http://localhost:3000/api/products/:id/detail
// thêm middle kiểm tra login
// khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/products/:id/detail', [authentication.checkToken], async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getProductById(id);
  res.json(product);
});

module.exports = router;