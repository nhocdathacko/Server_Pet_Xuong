/**
 * service: tầng giao tiếp với database
 */
const receiptModel = require('./model');

/**
 * lấy danh sách sản phẩm
 */

exports.getReceipts = async () => {
    // return data;
    // select
    const receipts = await receiptModel.find();
    return receipts;
}

/**
 * lấy thông tin chi tiết 
 */

exports.getReceiptById = async (id) => {
    const receipts = await receiptModel.findById(id).populate('');
    return receipts;
}

exports.insert = async (product) => {
    // data.push(product);
    const p = new receiptModel(product);
    await p.save();
}

exports.delete = async (id) => {
    await receiptModel.findByIdAndDelete(id);
}

exports.update = async (id, product) => {
    await receiptModel.findByIdAndUpdate(id, product);
}