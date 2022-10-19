var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const evaluatedController = require('../components/evaluated/controller');
const authentication = require('../components/middle/authentication');
const favoriteController = require('../components/favorite/favorite');
const receiptController = require('../components/receipt/controller');
const detailreceiptController = require('../components/detiledrececeipt/controller');


// http://localhost:3000/api/get-all-user
router.get('/get-all-user',async function(req,res,next){
  const u = await userController.getAllUser();
  res.send(u)
})

// http://localhost:3000/api/login

router.post('/login', async function (req, res, next) {
  const { userx, password } = req.body;
  const result = await userController.dangNhap(userx, password);
  if (result) {
    // token lấy ở đây
    const token = jwt.sign({ id: result.id, username: result.username }, 'iloveyou');
    res.send({ status: true, result });
  } else {
    res.send({ status: false });
  }
});


// http://localhost:3000/api/register

router.post('/register', async function (req, res, next) {
  const { name, username, email, phone, password } = req.body;
  const result = await userController.register(name, username, email, phone, password);
  if (result) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});

router.get('/favorite',async function(req,res,next){
  const f = await favoriteController.getAllFavorite()
  res.send(f)
})
router.post('/favorite/create', async (req, res, next) => {
  const { user_id, product_id } = req.body
  const f = await favoriteController.insertFavorite({ user_id, product_id })
  if (f) {
    return res.status(200).send({success:true,msg:'insert success!!'})
  }
  res.status(401).send({success:false,msg:'insert failed!!!'})
})

router.delete('/favorite/:id',async function(req,res,next){
  const {id} = req.params
  await favoriteController.deleteFavorite(id)
  return res.send({success:true,msg:'delete success!!'})
})


// http://localhost:3000/api/products
// thêm middle kiểm tra login
// khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/products', [authentication.checkToken], async function (req, res, next) {
  const products = await productController.getProducts();
  res.send(products);
});

// http://localhost:3000/api/products/:id/detail
// thêm middle kiểm tra login
// khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/products/:id/detail', [authentication.checkToken], async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getProductById(id);
  res.send(product);
});


/// evaluated
//author : Tran Quang Dao
router.get('/evaluated', async function (req, res, next) {
  const evaluated = await evaluatedController.getevaluated();
  res.send(evaluated);
});
// insert
router.post('/evaluated/insert', async (req, res, next) => {
  const { id_user, id_product, point } = req.body
  const result = await evaluatedController.insert({ id_user, id_product, point })
  if (result) {
    return res.status(200).send({ status: 200, error: false })
  }
  res.status(200).send({ status: 200, error: true })
})
// xem đánh giá sản phẩm theo user đăng nhập
router.post('/evaluated/get_all_by_id', async (req, res, next) => {
  const { id_user } = req.body
  const result = await evaluatedController.getEvaluateByUser(id_user)
  if (result != null) {
    res.status(200).send({ status: 200, error: false, data: result })
  } else {
    res.status(200).send({ status: 200, error: false, data: [] })
  }
})
//update
router.post('/evaluated/update', async (req, res, next) => {
  const { id, point } = req.body
  const update = await evaluatedController.update(id, point)
  console.log(id, point);
})

// Đinh Quốc Đạt
// Giỏ hàng
// Tạo giỏ hàng và hiện thông tin giỏ hàng
// http://localhost:3000/api/cart/:id
router.get('/cart/:id', async function (req, res, next) {
  const {id} = req.params;
   let cart = await receiptController.getReceiptById(id);
   let data = await detailreceiptController.getDeReceiptByReceiptId(cart.id);
   res.send({ data: data});
  
});
// Đinh Quốc Đạt
// Giỏ hàng
// Thêm sản phẩm vào giỏ gàng
// http://localhost:3000/api/cart/add/:id
router.post('/cart/add/:id', async (req, res, next) => {
  // id user ởđịa chỉ
  const {id} = req.params;
  const cart = await receiptController.getReceiptById(id);
  // body = {ReceiptId, ProductId, Quantity, Price} trong đó ReceiptId trống
  const data = req.body;
  data.ReceiptId = cart._id;
  console.log(cart);
  console.log(data);
  const detailCart = await detailreceiptController.insert(data);
  res.send({ detailCart: detailCart});
})



module.exports = router;
