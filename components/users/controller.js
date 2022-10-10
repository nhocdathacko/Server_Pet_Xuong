// tầng giao tiếp xử lý data

const userService = require('./service');

const bcrypt = require('bcryptjs');

exports.dangNhap = async (userx, password) => {
    
    let userEmail = await userService.checkEmail(userx);
    let userUsername = await userService.checkUsername(userx);
    if(!userEmail && !userUsername ) return null;
    if(userEmail){
        const checkPassword = await bcrypt.compare(password, userEmail.password);
        if (!checkPassword) return null;
        console.log(userEmail.name  + "userEmail");
        return { _id: userEmail._id, name: userEmail.name, username: userEmail.username, username: userEmail.username, phone: userEmail.username };
    }
    if(userUsername){
        const checkPassword = await bcrypt.compare(password, userUsername.password);
        if (!checkPassword) return null;
        console.log(userUsername.name  + "userUsername");
        return { _id: userUsername._id, name: userUsername.name, username: userUsername.username, username: userUsername.username, phone: userUsername.username };
    }
    
    
    
}

exports.register = async (name, username, email, phone, password) => {
    let userEmail = await userService.checkEmail(email);
    let userPhone = await userService.checkPhone(phone);
    let userUsername = await userService.checkUsername(username);
    if (userEmail || userPhone || userUsername) return false;
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(name, username, email, phone, hash);
    return true;
}


