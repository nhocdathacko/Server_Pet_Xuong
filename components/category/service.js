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

exports.getCategoryById = async (_id) => {
  // return data; 
  console.log("id: "+_id);
  const categorie = await categoryModel.findById(_id);
  return categorie;
}

exports.insert = async (category) => {
    // return data; 
    const categories = await categoryModel(category);
    await categories.save()
    .then(data => {
        console.log("thành công" + data);
        result = true;
      }).catch(err => {
        console.log("thất bại");
        result = false;
      });
    return result;
}
exports.delete = async (id) => {
  let result;
  await categoryModel.findByIdAndDelete(id).then(data => {
      console.log("Thành công" + data);
      result = true;
    }).catch(err => {
      console.log("thất bại");
      result = false;
    });
  return result;
}




