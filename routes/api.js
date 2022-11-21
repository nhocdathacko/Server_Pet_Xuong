var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const categoriesController = require('../components/category/controller');
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



// http://localhost:3000/api/login/username
router.post('/login/username', async function (req, res, next) {
  const { username, password } = req.body;
  const result = await userController.dangNhap(username, password);
  if (result) {
    // token lấy ở đây
    const token = jwt.sign({ id: result.id, username: result.username }, 'iloveyou');
    res.json({ status: true, result: result });
  } else {
    res.json({ status: false});
  }
});
// http://localhost:3000/api/login/email
router.post('/login/email', async function (req, res, next) {
  const { email, password } = req.body;
  const result = await userController.dangNhap(email, password);
  if (result) {
    // token lấy ở đây
    const token = jwt.sign({ id: result.id, username: result.username }, 'iloveyou');
    res.json({ status: true,result: result });
  } else {
    res.json({ status: false});
  }
});

// http://localhost:3000/api/register
router.post('/register', async function (req, res, nconext) {
  const { name, username, email, phone, password } = req.body;
  const result = await userController.register(name, username, email, phone, password);
  if (result.status) {
    res.json({ status: result.status, message: result.mess});
  } else {
    res.json({ status: result.status, message: result.mess });
  }
});

// http://localhost:3000/api/get-all-category
router.get('/get-all-category', async function (req, res, next) {
  const data = await categoriesController.getCategories();
  res.json(data);
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
router.get('/products', async function (req, res, next) {
  const products = await productController.getProducts();
  res.json(products);
});

// http://localhost:3000/api/products/:id/detail
// thêm middle kiểm tra login
router.get('/products/:id/detail', async function (req, res, next) {
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
   console.log(">>>>>>>>><<<<<<<<<<"+cart._id);
   let data = await detailreceiptController.getDeReceiptByReceiptId(cart._id);
   res.json({ data: data});
});
// Đinh Quốc Đạt
// Giỏ hàng
// Thêm sản phẩm vào giỏ gàng
// http://localhost:3000/api/cart/add/:id
router.post('/cart/add/:id', async (req, res, next) => {
  // id của user ở địa chỉ
  let {id} = req.params;
  let cart = await receiptController.getReceiptById(id);

  let data = req.body;
    // req.body gồm:
  //   ReceiptId: null,
  //   ProductId: { type: ObjectId},
  //   Quantity: { type: Number },
  //   Price: {type: Number},
  data = {
    ReceiptId: cart._id, 
    ProductId: data.ProductId,
    Quantity: data.Quantity,
    Price: data.Price
  }
  console.log(data)
  const detailCart = await detailreceiptController.insert(data);
  res.json({ detailCart: detailCart});
})

// Đinh Quốc Đạt
// Giỏ hàng
// Thanh toán giỏ gàng
// http://localhost:3000/api/cart/buy
router.post('/cart/buy', async (req, res, next) => {

  //  giá trị isBill = true là hoàn thành
  const data = req.body;
  const cart = await receiptController.getReceiptById(data.id);
  cart.IsBill = data.isBill;
  cart.SumMoney = data.sumMoney;
  const result = await receiptController.update(cart._id, cart);

  res.json({ result: result});
})
// Đinh Quốc Đạt
// Giỏ hàng
// delete giỏ gàng
// http://localhost:3000/api/cart/delete
router.delete('/cart/delete/:id', async (req, res, next) => {
  const {id} = req.params;
  let result = await detailreceiptController.delete(id);
  res.json({ result: result});
})
// update giỏ gàng
// http://localhost:3000/api/cart/delete
router.post('/cart/update', async (req, res, next) => {
  let data = req.body;
  data = {
    _id: data._id,
    ReceiptId: data.ReceiptId, 
    ProductId: data.ProductId,
    Quantity: data.Quantity,
    Price: data.Price
  }
  let result = await detailreceiptController.update2(data._id, data);
  res.json({ result: result});
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

// Xuất ds sp theo loại
// http://localhost:3000/api/product/category/:category_id
router.get('/product/category/:category_id', async function (req, res, next) {
 const category_id2 = req.params.category_id;
 console.log(category_id2);
  const data = await productController.getProductByCategory(category_id2);
   res.json({ data: data});
});

module.exports = router;
