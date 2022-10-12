var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const productController = require('../components/products/controller');
const categoryController = require('../components/category/controller');

const upload = require('../components/middle/capNhat');
const authentication = require('../components/middle/authentication');

//http://localhost:3000/products/
// method: get
// detail: lấy danh sách sản phẩm
// author: Duy Tin 
// date: 01/10/2022
router.get('/', async function (req, res, next) {
  // lấy danh sách sản phẩm từ database
  const data = await productController.getProducts();

  //test xem dữ liệu đã về được chưa? RỒI
  res.json(data);
  // mở trang sản phẩm
  //res.render('danhSach', { danhSach: data });
});


//http://localhost:3000/products/insert/
// method: post
// detail: thêm mới sản phẩm
// author: Duy Tin 
// date: 01/10/2022
router.post('/insert', [upload.single('image')], async function (req, res, next) {
  let { body, file } = req;
  let image = '';
  if (file) {
    image = `http://192.168.100.125:3000/images/${file.filename}`;
  }
  body = { ...body, image: image }
  await productController.insert(body);
  res.redirect('products');
});


//http://localhost:3000/products/:id/delete
// method: delete
// author: Duy Tin
// detail: xóa 1 sản phẩm khỏi database
// date: 01/10/2022
router.delete('/:id/delete', async function (req, res, next) {
  // xóa 1 sản phẩm khỏi database
  const { id } = req.params;
  await productController.delete(id);
  res.json({ result: true });
});

//http://localhost:3000/products/:id/edit
// method: get
// detail: lấy thông tin chi tiết 1 sản phẩm
// author: Duy Tin
// date: 05/10/2022
router.get('/:id/edit', async function (req, res, next) {
  // lấy thông tin chi tiết 1 sản phẩm
  const { id } = req.params;
  const product = await productController.getProductById(id);
  const categories = await categoryController.getCategoriesForOneProduct(product.category_id._id);
  
  //test xem dữ liệu đã về được chưa? RỒI
  res.json(product);

  //mở trang chi tiết của 1 sản phẩm
  //res.render('capNhatPhuKien', { product: product, categories: categories });
  
});

//http://localhost:3000/products/:id/edit
// method: post
// detail: cập nhật thông tin chi tiết 1 sản phẩm
// author: Duy Tin
// date: 05/10/2022
router.post('/:id/edit', [upload.single('image')], async function (req, res, next) {
  // cập nhật thông tin chi tiết 1 sản phẩm
  let { body, file, params } = req;
  delete body.image;
  if (file) {
    let image = `http://192.168.100.125:3000/images/${file.filename}`;
    body = { ...body, image: image };
  }
  await productController.update(params.id, body);

  // mở lại trang sản phẩm
  res.redirect('/products');
});


//http://localhost:3000/products/accessories
// method: get
// detail: lấy tất cả sản phẩm trong đó mỗi sản phẩm là một phụ kiện và phụ kiện đó vẫn còn đang bán
// author: Duy Tin
// date: 12/10/2022
router.get('/accessories', async function (req, res, next) {
  // lấy danh sách sản phẩm từ database
  const data = await productController.getProductsByType(0);

  //test xem dữ liệu đã về được chưa? RỒI
  res.json(data);
});























//http://localhost:3000/san-pham/thong-ke
// method: get
// detail: thống kê sản phẩm
router.get('/thong-ke', function (req, res, next) {
  // thêm mới sản phẩm vào database
  res.render('products');
});

//http://localhost:3000/san-pham/them-moi
// method: get
// detail: hiển thị thêm mới sản phẩm
router.get('/them-moi', async function (req, res, next) {
  // thêm mới sản phẩm vào database
  const categories = await categoryController.getCategories();
  res.render('themMoi', { categories: categories });
});

module.exports = router;
