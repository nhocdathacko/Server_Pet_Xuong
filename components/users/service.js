// tầng giao tiếp với database

const userModel = require('./model');

exports.checkEmail = async (email) => {
    const user = await userModel.findOne({ email: email }, 'id name username email phone password');
    return user;
}

exports.checkPhone = async (phone) => {
    const user = await userModel.findOne({ phone: phone },  'id name username email phone password');
    return user;
}
exports.checkUsername = async (username) => {
    const user = await userModel.findOne({ username: username },  'id name username email phone password');
    return user;
}

exports.register = async (name, username, email, phone, password) => {
    const image = "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
    const user = new userModel({ name, image, username, email, phone, password });
    return await user.save();
}
