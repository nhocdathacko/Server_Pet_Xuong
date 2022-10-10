var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const receiptController = require('../components/receipt/controller');

const authentication = require('../components/middle/authentication');

//http://localhost:3000/receipt/
// method: get
// detail: lấy danh sách sản phẩm
// date: 01/10/2022
router.get('/', async function (req, res, next) {
  // lấy danh sách sản phẩm từ database
  const data = await receiptController.getReceipts();

  res.json(data);
});

router.post('/insert', async function(req, res, next){
  console.log(req.body);
  const data = await receiptController.insert(req.body);
  
  res.json(data);
})

//http://localhost:3000/products/:id/delete
// method: delete
// detail: xóa 1 sản phẩm khỏi database
// date: 01/10/2022
router.delete('/:id/delete', async function (req, res, next) {
  // xóa 1 sản phẩm khỏi database
  const { id } = req.params;
  await receiptController.delete(id);
  res.json({ result: true });
});



// //http://localhost:3000/san-pham/:id/edit
// // method: get
// // detail: lấy thông tin chi tiết 1 sản phẩm
// // date: 17/3/2022
// router.get('/:id/edit', [authentication.checkLogin], async function (req, res, next) {
//   // lấy thông tin chi tiết 1 sản phẩm
//   const { id } = req.params;
//   const product = await productController.getProductById(id);
//   const categories = await categoryController.getCategoriesForOneProduct(product.category_id._id);
//   res.render('capNhatPhuKien', { product: product, categories: categories });
// });

// //http://localhost:3000/san-pham/:id/edit
// // method: post
// // detail: cập nhật thông tin chi tiết 1 sản phẩm
// // date: 17/3/2022
// router.post('/:id/edit', [upload.single('image')], async function (req, res, next) {
//   // cập nhật thông tin chi tiết 1 sản phẩm
//   let { body, file, params } = req;
//   delete body.image;
//   if (file) {
//     //nhà
//     // let image = `http://192.168.1.34:3000/images/${file.filename}`;
//     //trường
//     let image = `http://10.82.151.26:3000/images/${file.filename}`;
//     body = { ...body, image: image };
//   }
//   await productController.update(params.id, body);
//   res.redirect('/san-pham');
// });



module.exports = router;
