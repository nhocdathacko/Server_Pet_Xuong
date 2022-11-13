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

/**
 * lấy sản phẩm theo loại
 */

 exports.getProductByCategory = async (category_id) => {
    const product = await productModel.find({ category_id: category_id}).populate('category_id');
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

/**
 * lấy thông tin  sản phẩm thuộc phụ kiện
 */
 exports.getAccessories = async () => {
/**
 * Selec id, name, price, descibes, evaluated, category_id, quantity, image, isPet, isStop
 * from product 
 * where isPet = true
 */
    const products = await productModel.find({IsPet: false, IsStop: false}).populate('category_id');
    // console.log(">>>>>>>>   DANH SACH SP TU SERVICE", products);
    return products;
}
/**
 * lấy thông tin  sản phẩm thuộc phụ kiện
 */
 exports.getAllPet = async () => {
        const products = await productModel.find({IsPet: true, IsStop: false}).populate('category_id');
        return products;
}
    


/**
 * lấy thông tin chi tiết 1 sản phẩm trong đó sản phẩm là 1 phụ kiện 
 * và sắp xếp theo điểm đánh giá
 */
 exports.getAccessoriesAndSoft = async () => {
        const products = await productModel.find({IsPet: false, IsStop: false}).sort({point: 1}).populate('category_id');
        return products;
    }
