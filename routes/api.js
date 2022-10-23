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
  res.json(u)
})

router.get('/abc', async function (req, res, next) {
   const data = "gehooooo";
   res.json({ data: data});
  
});

// http://localhost:3000/api/login
router.post('/login', async function (req, res, next) {
  const { userx, password } = req.body;
  const result = await userController.dangNhap(userx, password);
  if (result) {
    // token lấy ở đây
    const token = jwt.sign({ id: result.id, username: result.username }, 'iloveyou');
    res.json({ status: true, result });
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

router.get('/favorite',async function(req,res,next){
  const f = await favoriteController.getAllFavorite()
  res.json(f)
})
router.post('/favorite/create', async (req, res, next) => {
  const { user_id, product_id } = req.body
  const f = await favoriteController.insertFavorite({ user_id, product_id })
  if (f) {
    return res.status(200).json({success:true,msg:'insert success!!'})
  }
  res.status(401).json({success:false,msg:'insert failed!!!'})
})

router.delete('/favorite/:id',async function(req,res,next){
  const {id} = req.params
  await favoriteController.deleteFavorite(id)
  return res.json({success:true,msg:'delete success!!'})
})


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

// Đinh Quốc Đạt
// Giỏ hàng
// Tạo giỏ hàng và hiện thông tin giỏ hàng
// http://localhost:3000/api/cart/:id
router.get('/cart/:id', async function (req, res, next) {
  const {id} = req.params;
   let cart = await receiptController.getReceiptById(id);
   let data = await detailreceiptController.getDeReceiptByReceiptId(cart.id);
   res.json({ data: data});
  
});
// Đinh Quốc Đạt
// Giỏ hàng
// Thêm sản phẩm vào giỏ gàng
// http://localhost:3000/api/cart/add/:id
router.post('/cart/add/:id', async (req, res, next) => {
  // id user ởđịa chỉ
  const {id} = req.params;
  const cart = await receiptController.getReceiptById(id);
  const data = req.body;
  data.ReceiptId = cart._id;
  const detailCart = await detailreceiptController.insert(data);
  res.json({ detailCart: detailCart});
})

// Đào Duy Tín
// Sản phẩm
// Xuất ds sp là phụ kiện
// http://localhost:3000/api/product/not-pet
router.get('/product/not-pet', async function (req, res, next) {
  const data = await productController.getProductsByType();
   res.json({ data: data});
});
// Nguyễn Trọng Trường
// Sản phẩm
// Xuất ds sp là thú cưng
// http://localhost:3000/api/product/is-pet
router.get('/product/is-pet', async function (req, res, next) {
  const data = await productController.getProductsIsPet();
   res.json({ data: data});
});



module.exports = router;
