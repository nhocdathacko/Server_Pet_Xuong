/**
 * service: tầng giao tiếp với database
 */
const productModel = require('./model');

/**
 * lấy danh sách sản phẩm
 */

exports.getProducts = async () => {
    // return data;
    // select id, name, price, quantity,... from products
    const products = await productModel.find().populate('category_id');
    return products;
}

/**
 * lấy thông tin chi tiết 1 sản phẩm
 */

exports.getProductById = async (id) => {
    const product = await productModel.findById(id).populate('category_id');
    return product;
}

exports.insert = async (product) => {
    const p = new productModel(product);
    await p.save();
}

exports.delete = async (id) => {
    await productModel.findByIdAndDelete(id);
}

exports.update = async (id, product) => {
    await productModel.findByIdAndUpdate(id, product);
}
