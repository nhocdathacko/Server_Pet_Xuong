const categoryController = require('./service');

exports.getCategories = async () => {
    return await categoryController.getCategories();
}
exports.getCategories2 = async () => {
    let category =  await categoryController.getCategories();
    category = category.map((item, index)=> {
        item = {
            _id: item._id,
            name: item.name,
            image: item.image,
            index: index + 1
        }
        return item;
    })
    return category;
}
exports.getCategoriesForOneProduct = async (selected) => {
    let categories = await categoryController.getCategories();
    categories = categories.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            image: item.image,
            selected: item._id.toString() == selected.toString()
        }
        return item;
    })
    return categories;
}
exports.getCategoryById = async (id) => {
    return await categoryController.getCategoryById(id);
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

exports.insert = async (categories) => {
    let result = await categoryController.insert(categories);
    return result;
}
exports.delete = async (id) => {
    let result = await categoryController.delete(id);
    return result;
}