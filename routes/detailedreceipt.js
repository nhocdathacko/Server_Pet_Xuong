var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const deReceiptController = require('../components/detiledrececeipt/controller');
const receiptController = require('../components/receipt/controller');

const authentication = require('../components/middle/authentication');

//http://localhost:3000/detailedreceipt/
// method: get
// detail: lấy danh sách sản phẩm
// author: Trung Tien
// date: 01/10/2022
router.get('/', async function (req, res, next) {
  // lấy danh sách sản phẩm từ database
  const data = await deReceiptController.getDeReceipts();

  res.json(data);
});

//http://localhost:3000/san-pham/:id/edit
// method: get
// detail: lấy thông tin chi tiết 1 sản phẩm
// date: 17/3/2022
router.get('/:id/edit', async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const { id } = req.params;
    const deReceipt = await deReceiptController.getDeReceiptById(id);
    const receipt = await receiptController.getReceiptsForOneProduct(deReceipt.receipt_id._id);
    res.render('capNhatHoaDonChiTiet', { deReceipt: deReceipt, receipt: receipt });
  });

//http://localhost:3000/san-pham/:id/edit
// method: post
// detail: cập nhật thông tin chi tiết 1 sản phẩm
// date: 17/3/2022
router.post('/:id/edit', async function (req, res, next) {
    // cập nhật thông tin chi tiết 1 sản phẩm
    const { id } = req.params;
    const { set } = req.body;
    console.log(id, set);
    const responsive = await deReceiptController.update(id, set);
    res.json(responsive);

  });

//insert
router.post('/insert', async function(req, res, next){
  console.log(req.body);
  const data = await deReceiptController.insert(req.body);
  
  res.json(data);
})

//http://localhost:3000/products/:id/delete
// method: delete
// detail: xóa 1 sản phẩm khỏi database
// date: 01/10/2022
router.delete('/:id/delete', async function (req, res, next) {
  // xóa 1 sản phẩm khỏi database
  const { id } = req.params;
  await deReceiptController.delete(id);
  res.json({ result: true });
});



module.exports = router;
