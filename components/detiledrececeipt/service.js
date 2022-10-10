const deReceiptModel = require('./model');

exports.getDeReceipt = async () => {
    // return data; 
    const deReceipt = await deReceiptModel.find({});
    return deReceipt;
}

exports.getDeReceiptById = async (id) => {
    const deReceipt = await deReceiptModel.findById(id).populate('receipt_id');
    return deReceipt;
}

exports.insert = async (product) => {
    // data.push(product);
    const p = new deReceiptModel(product);
    await p.save();
}

exports.delete = async (id) => {
    await deReceiptModel.findByIdAndDelete(id);
}
exports.update = async (id, set) => {
    const detailedreceipt = await deReceiptModel.findById(id);
    if(!detailedreceipt){
        return "Khong tim thay hoa don";
    }

    const { Quantity } = detailedreceipt;

    if(set == 0){
        const update = await deReceiptModel.findByIdAndUpdate(id, {Quantity: Quantity - 1});
    }else if(set == 1){
        const update = await deReceiptModel.findByIdAndUpdate(id, {Quantity: Quantity + 1});
    }
}