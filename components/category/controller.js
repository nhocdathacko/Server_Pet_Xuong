const categoryController = require('./service');

exports.getCategories = async () => {
    return await categoryController.getCategories();
}

exports.getCategoryById = async (id) => {
    return await categoryController.getCategoryById();
}

exports.getCategoriesForOneProduct = async (selectedId) => {
    let categories = await categoryController.getCategories();
    categories = categories.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            image: item.image,
            selected: item._id.toString() == selectedId.toString()
        }
        return item;
    })
    return categories;
}