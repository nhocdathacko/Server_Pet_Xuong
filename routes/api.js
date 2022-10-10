var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const evaluatedController = require('../components/evaluated/controller');

const authentication = require('../components/middle/authentication');

// http://localhost:3000/api/login

router.post('/login', async function (req, res, next) {
  const { userx, password } = req.body;
  const result = await userController.dangNhap(userx, password);
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


/// evaluated
//author : Tran Quang Dao
router.get('/evaluated', async function (req, res, next) {
  const evaluated = await evaluatedController.getevaluated();
  res.json(evaluated);
});
// insert
router.post('/evaluated/insert', async (req, res, next) => {
  const { id_user, id_product, point } = req.body
  const result = await evaluatedController.insert({ id_user, id_product, point })
  if (result) {
    return res.status(200).json({ status: 200, error: false })
  }
  res.status(200).json({ status: 200, error: true })
})
// xem đánh giá sản phẩm theo user đăng nhập
router.post('/evaluated/get_all_by_id', async (req, res, next) => {
  const { id_user } = req.body
  const result = await evaluatedController.getEvaluateByUser(id_user)
  if (result != null) {
    res.status(200).json({ status: 200, error: false, data: result })
  } else {
    res.status(200).json({ status: 200, error: false, data: [] })
  }
})
//update
router.post('/evaluated/update', async (req, res, next) => {
  const { id, point } = req.body
  const update = await evaluatedController.update(id, point)
  console.log(id, point);
})
module.exports = router;