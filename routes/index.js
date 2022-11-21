var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const authentication = require('../components/middle/authentication');

const userController = require('../components/users/controller');
const categoriesController = require('../components/category/controller');
const productController = require('../components/products/controller');
const evaluatedController = require('../components/evaluated/controller');
const favoriteController = require('../components/favorite/favorite');
const receiptController = require('../components/receipt/controller');
const detailreceiptController = require('../components/detiledrececeipt/controller');

/* GET home page. */

// http://localhost:3000/login
// method: get
// detail: hiển thị trang login
// author: Trần Võ Thục Miên
// date: 17/3/2022
router.get('/login', [authentication.checkLogin], function (req, res, next) {
  res.render('login');
});

// http://localhost:3000/login
// method: post
// detail: thực hiện đăng nhập
// author: Trần Võ Thục Miên
// date: 17/3/2022
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  // thực hiện kiểm tra đăng nhập
  // const result = await userController.dangNhap(email, password);

  let result = {
    id: "admin123@gmail.com",
    username: "Adminter"

  }

  if (result && (email === "admin123@gmail.com" & password == "000000")) {

    // secret key
    const token = jwt.sign(
      {
        id: result.id, username: result.username
      },
      'iloveyou'
    );
    req.session.token = token;

    //nếu đúng chuyển qua trang thống kê
    res.redirect('/index');
  } else {
    // nếu sai quay trở lại trang đăng nhập
    res.redirect('/login');
  }
});

// http://localhost:3000/dang-xuat
// method: post
// detail: thực hiện đăng xuất
// author: Trần Võ Thục Miên
// date: 17/3/2022
router.get('/dang-xuat', function (req, res, next) {
  req.session.destroy(function (err) {
    // nếu đăng xuất thành công chuyển qua đăng nhập
    res.redirect('login');
  })
});
// http://localhost:3000/index
router.get('/index',async function (req, res, next) {
  
  res.render('index', { layout: 'layout_index', });
});
// http://localhost:3000/product
router.get('/product',async function (req, res, next) {
  const product = await productController.getProducts2();
  // console.log(">>>>>>>", product);
  res.render('products', { layout: 'layout_index', product: product });
});
// http://localhost:3000/product/:name
router.get('/product/:name',async function (req, res, next) {
  let name = req.params.name;
  let product;
  if(name == "stop"){
    product = await productController.getProductIsStop(true);
  }else if(name == "nonstop"){
    product = await productController.getProductIsStop(false);
  }else{
    product = await productController.getProductsByIsPet(name);
  }
  res.render('products', { layout: 'layout_index', product: product });
});
// http://localhost:3000/product/update/:name
router.post('/product/update/:id', async function(req, res, next) {
 const {id} = req.params;
 console.log(req.body);
 let product = await productController.getProductById(id);
 product = {
  Name: req.body.name,
  Price: req.body.price,
  Describes: req.body.describes,
  Evaluate: req.body.evaluate,
  Quantity: req.body.quantity,
  Image: req.body.image,
  category_id: req.body.category_id,
  IsPet: req.body.isPet,
  IsStop: req.body.isStop,
}
 await productController.update(id, product);
 res.redirect('/product');
});
// http://localhost:3000/product/delete/:name
router.delete('/product/delete/:id', async function(req, res, next) {
  // xóa sản phẩm
 const {id} = req.params;
 await productController.delete(id);
 res.json({result: true});
});
// http://localhost:3000/detail/:id/product
router.get('/detail/:id/product',async function (req, res, next) {
  let id = req.params.id;
  
  let product = await productController.getProductById2(id);
  let result = {
    T: true,
    F: false,
    reprP: product.isPet,
    reprS: product.isStop};
    console.log(result);
  const category = await categoriesController.getCategoriesForOneProduct(product.category_id._id); 
  res.render('detail-product', { layout: 'layout_index', product: product, category: category, result: result });  
});
// http://localhost:3000/category
router.get('/category',async function (req, res, next) {
  const category = await categoriesController.getCategories2();
  res.render('category', { layout: 'layout_index', category: category});
});
// http://localhost:3000/category/:name
router.delete('/category/delete/:id', async function(req, res, next) {
  // xóa sản phẩm
 const {id} = req.params;
 await categoriesController.delete(id);
 res.json({result: true});
});
// http://localhost:3000/user
router.get('/user',async function (req, res, next) {
  const user = await userController.getAllUser();
  res.render('user', { layout: 'layout_index', user: user});  
});
// http://localhost:3000/statistical
router.get('/statistical',async function (req, res, next) {
  res.render('statistical', { layout: 'layout_index'});
});
module.exports = router;



// thuc hien dang nhap
// router.post('/', function (req, res, next) {
//   // body form gui len
//   const { userName, passWord } = req.body;
//   let message = '';
//   if (userName == 'admin' && passWord == '123') {
//     message = 'Dang nhap thanh cong';
//     res.redirect('/products');
//   } else {
//     message = 'Dang nhap that bai';
//     res.render('index', { message: message });
//   }
// });

//api
// router.post('/gui-thong-tin', function (req, res, next) {
//   const {name}=req.body;
//   res.json({name: `Xin chao ban ${name}`});

// });

// req.body: submit form
// req.query: ?a=10&b=20
// req.params: /:id/submit

// dung cho web
// res.render: tai ra 1 trang html, giao dien
// res.redirect: chuyen sang url nao do

// dung cho api: application progaming interface
// res.json: tra ve du lieu dang json/xml

// dua code len host (mua vps, thue host)

/**
 * 1. đăng nhập
 * http://localhost:3000/dang-nhap
 * get: chạy ra login
 * post: thực hiện login
 * 
 * 2. đăng xuất
 * http://localhost:3000/dang-xuat
 * get: chạy đăng xuất
 * 
 * 3. sản phẩm
 * http://localhost:3000/san-pham
 * get: xuất danh sách sản phẩm
 * post: thêm mới sản phẩm
 * 
 * 4. chi tiết 1 sản phẩm
 * http://locahost:3000/san-pham/:id/edit
 * get: lấy thông tin chi tiết 1 sản phẩm
 * put: cập nhật thông tin sản phẩm
 * 
 * 5. xóa sản phẩm
 * http://localhost:3000/san-pham/:id/delete
 * delete: xóa 1 sản phẩm 
 * 
 * 6. thống kê
 * http://localhost:3000/san-pham/thong-ke
 * get: lấy thống kê sản phẩm, vẽ biểu đồ
 * 
 */