var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const userController = require('../components/users/controller');
const authentication = require('../components/middle/authentication');

/* GET home page. */

// http://localhost:3000/dang-nhap
// method: get
// detail: hiển thị trang login
// author: Trần Võ Thục Miên
// date: 17/3/2022
router.get('/dang-nhap', [authentication.checkLogin], function (req, res, next) {
  res.render('dangNhap', {});
});

// http://localhost:3000/dang-nhap
// method: post
// detail: thực hiện đăng nhập
// author: Trần Võ Thục Miên
// date: 17/3/2022
router.post('/dang-nhap', async function (req, res, next) {
  const { email, password } = req.body;

  // thực hiện kiểm tra đăng nhập
  // const result = await userController.dangNhap(email, password);

  let result = {
    id: "admin123@gmail.com",
    username: "Adminter"

  }

  if (result) {

    // secret key
    const token = jwt.sign(
      {
        id: result.id, username: result.username
      },
      'iloveyou'
    );
    req.session.token = token;

    //nếu đúng chuyển qua trang thống kê
    res.redirect('/san-pham');
  } else {
    // nếu sai quay trở lại trang đăng nhập
    res.redirect('/dang-nhap');
  }
});

// http://localhost:3000/dang-xuat
// method: post
// detail: thực hiện đăng xuất
// author: Trần Võ Thục Miên
// date: 17/3/2022
router.get('/dang-xuat', [authentication.checkLogin], function (req, res, next) {
  req.session.destroy(function (err) {
    // nếu đăng xuất thành công chuyển qua đăng nhập
    res.redirect('dang-nhap');
  })
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