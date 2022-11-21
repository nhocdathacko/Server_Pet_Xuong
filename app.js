
// import library
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
var logger = require('morgan');
const cors = require("cors");

const session = require('express-session');
const mongoose = require('mongoose');
require('./components/users/model');
require('./components/category/model');
require('./components/products/model');
require('./components/detiledrececeipt/model');
require('./components/receipt/model');

//routes
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var apiRouter = require('./routes/api');
var categoriesRouter = require('./routes/categories');
var receiptsRouter = require('./routes/receipt');
var dereceiptsRouter = require('./routes/detailedreceipt');
var swaggerRouter = require('./routes/swagger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

mongoose.connect('mongodb+srv://admin:123@cluster0.9znjp.mongodb.net/XuongPet?retryWrites=true&w=majority', {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err));


//routes
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/api', apiRouter);
app.use('/categories', categoriesRouter);
app.use('/receipt', receiptsRouter);
app.use('/detailedreceipt', dereceiptsRouter);
app.use('/swagger', swaggerRouter);


// swagger
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000/",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
// swagger

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
