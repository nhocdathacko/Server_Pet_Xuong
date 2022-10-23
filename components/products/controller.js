const async = require('hbs/lib/async');
const productService = require('./service');

exports.getProducts = async () => {
    let data = await productService.getProducts();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            name: item.Name,
            price: item.Price,
            describes: item.Describes,
            evaluate: item.Evaluate,
            quantity: item.Quantity,
            image: item.Image,
            isPet: item.IsPet,
            isStop: item.IsStop,
            category_id: item.category_id,
            index: index + 1
        }
        
        return item;
        
    })
    console.log('controller>>>>>>>>', data);
    return data;
}

exports.getProductById = async (id) => {
    let product = await productService.getProductById(id);
    product = {
        _id: product._id,
        name: product.Name,
        price: product.Price,
        describes: product.Describes,
        evaluate: product.Evaluate,
        quantity: product.Quantity,
        image: product.Image,
        isPet: product.IsPet,
        isStop: product.IsStop,
        category_id: product.category_id,
    }
    return product;
}

exports.insert = async (body) => {
    await productService.insert(body);
}

exports.delete = async (id) => {
    await productService.delete(id);
}

exports.update = async (id, product) => {
    await productService.update(id, product);
}


// lấy sản phẩm thuộc phụ kiện
exports.getProductsByType = async () => {
    let products = await productService.getAccessories();
    let data = this.getProductsItems(products);
    return data;
}
// lấy sản phẩm thuộc thú cưng
exports.getProductsIsPet = async () => {
    let products = await productService.getAllPet();
    let data = this.getProductsItems(products);
    return data;
}
exports.getProductsItems = async (data) => {
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            name: item.Name,
            price: item.Price,
            describes: item.Describes,
            evaluate: item.Evaluate,
            quantity: item.Quantity,
            image: item.Image,
            isPet: item.IsPet,
            isStop: item.IsStop,
            category_id: item.category_id,
        }
        
        return item;
        
    })
    return data;
}