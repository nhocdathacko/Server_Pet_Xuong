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
        return { _id: userEmail._id, name: userEmail.name, username: userEmail.username, email: userEmail.email, phone: userEmail.phone };
    }
    if(userUsername){
        const checkPassword = await bcrypt.compare(password, userUsername.password);
        if (!checkPassword) return null;
        console.log(userUsername.name  + "userUsername");
        return { _id: userUsername._id, name: userUsername.name, username: userUsername.username, email: userUsername.email, phone: userUsername.phone };
    }
    
    
    
}

exports.register = async (name, username, email, phone, password) => {
    let userEmail = await userService.checkEmail(email);
    let userPhone = await userService.checkPhone(phone);
    let userUsername = await userService.checkUsername(username);
    if(userEmail){
        return {status: false, mess: "Email đã tồn tại"}
    }else if(userPhone){
        return {status: false, mess: "Số điện thoại đã tồn tại"}
    }else if(userUsername){
        return {status: false, mess: "Tên tài khoản đã tồn tại"}
    }
    if (userEmail || userPhone || userUsername) return false;
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(name, username, email, phone, hash);
    return {status: true, mess: "Đăng kí thành công"}
}

exports.getAllUser = async () => {
    let user = await userService.getAllUser();
    user = user.map((item, index) => {
        item = {
            index: index + 1,
            _id: item._id,
            name : item.name,
            username : item.username,
            email : item.email, 
            phone: item.phone,
            image : item.image
        }
        return item;
    })
    return user;
}
