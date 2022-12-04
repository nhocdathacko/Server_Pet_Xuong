const deReceiptModel = require('./model');

exports.getDeReceipt = async () => {
    // return data; 
    const deReceipt = await deReceiptModel.find().populate('ReceiptId').populate('ProductId');
    return deReceipt;
}

exports.getDeReceiptById = async (id) => {
    const deReceipt = await deReceiptModel.findById(id);
    return deReceipt;
}
exports.getDeReceiptByReceiptId = async (ReceiptId) => {
    const deReceipt = await deReceiptModel.find({ReceiptId: ReceiptId});
    return deReceipt;
}

exports.insert = async (product) => {
    // data.push(product);
    const p = new deReceiptModel(product);
    await p.save().then((data) =>{
        return data
    })
    .catch((error) => console.log(error));;
}

exports.delete = async (id) => {
    let result;
    await deReceiptModel.findByIdAndDelete(id).then(data => {
        console.log(">>>>>" + data);
        result = true;
      }).catch(err => {
        console.log("thất bại");
        result = false;
      });
    return result;
}
exports.update = async (id, set) => {
    const detailedreceipt = await deReceiptModel.findById(id);
    if(!detailedreceipt){
        return "Khong tim thay hoa don";
    }

    const { Quantity } = detailedreceipt;
    let result;
    if(set == 0){
        result = await deReceiptModel.findByIdAndUpdate(id, {Quantity: Quantity});
    }else if(set == 1){
        result = await deReceiptModel.findByIdAndUpdate(id, {Quantity: Quantity});
    }
}
exports.update2 = async (id, detailCart) => {
    let result;
    await deReceiptModel.findByIdAndUpdate(id, detailCart).then(data => {
        console.log(">>>>>" + data);
        result = true;
      }).catch(err => {
        console.log("thất bại");
        result = false;
      });
    return result;
}