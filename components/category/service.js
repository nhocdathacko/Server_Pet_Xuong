const categoryModel = require('./model');

/**
 * lấy danh sách các thể loại danh mục
 * @returns data
 */
exports.getCategories = async () => {
    // return data; 
    const categories = await categoryModel.find();
    return categories;
}




