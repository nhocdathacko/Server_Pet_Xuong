const async = require('hbs/lib/async');
const productService = require('./service');

exports.getProducts = async () => {
    let data = await productService.getProducts();
    data = data.map((item, index) => {
        let nameC = item.category_id;
        // console.log(nameC);
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
            category: nameC.name
        }
        
        return item;
        
    })
    // console.log('controller>>>>>>>>', data);
    return data;
}
exports.getProducts2 = async () => {
    let data = await productService.getProducts();
    return await this.setDataProduct(data);
    
}
exports.getProductIsStop = async (isStop) => {
    let data = await productService.getProductIsStop(isStop);
    return await this.setDataProduct(data);
    
}
exports.getProductsByIsPet = async (state) => {
    let data = await productService.getProductBy(state);
    return await this.setDataProduct(data);
    
}
exports.setDataProduct = async (data) => {
    data = data.map((item, index) => {
        let nameC = item.category_id;
        item = {
            _id: item._id,
            index: index + 1,
            name: item.Name,
            price: item.Price,
            describes: item.Describes,
            evaluate: item.Evaluate,
            quantity: item.Quantity,
            image: item.Image,
            isPet: item.IsPet,
            isStop: item.IsStop,
            category: nameC.name,
            category_id: item.category_id
        }
        
        return item;
        
    })
    return data;
}
exports.setOneDataProduct = async (item) => {
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
            category_id: item.category_id
        }
        
        return item;

}
exports.getProductById2 = async (id) => {
    let product = await productService.getProductById(id);
    return await this.setOneDataProduct(product);
}
exports.getProductById = async (id) => {
    let product = await productService.getProductById(id);
        let nameC = product.category_id;
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
        category: nameC.name,
    }
    return product;
}

exports.insert = async (body) => {
    return await productService.insert(body);
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
// sp theo loại
exports.getProductByCategory = async (category_id) => {
    let products = await productService.getProductByCategory(category_id);
    let data = this.getProductsItems(products);
    return data;
}
exports.getProductsItems = async (data) => {
    data = data.map((item, index) => {
        let nameC = item.category_id;
        // console.log(nameC);
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
            category: nameC.name
        }
        
        return item;
        
    })
    return data;
}


exports.getProductsByTypeAndSoft = async () => {
    let data = await productService.getAccessoriesAndSoft();
    data = data.map((item, index) => {
        let nameC = item.category_id;
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
            category: nameC.name
        }
        
        return item;
        
    })
    return data;
}