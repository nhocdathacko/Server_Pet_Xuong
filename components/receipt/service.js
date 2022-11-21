/**
 * service: tầng giao tiếp với database
 */
const receiptModel = require('./model');

/**
 * lấy danh sách lịch sử giao dịch 
 */

exports.getReceipts = async () => {
    // return data;
    // select
    const receipts = await receiptModel.find({IsBill: true});
    return receipts;
}
/**
 * lấy giỏ hàng
 */

 exports.getReceiptsCart = async (UserId) => {
    // return data;
    // select
    const receipts = await receiptModel.findOne({UserId: UserId, IsBill: false});
    return receipts;
}
/**
 * lấy thông tin chi tiết 
 */

exports.getReceiptById = async (id) => {
    const receipts = await receiptModel.findById(id).populate('');
    return receipts;
}

exports.insert = async (receipt) => {
    const p = new receiptModel(receipt);
    await p.save().then((data) =>{
        return data
    })
    .catch((error) => console.log(error));
}

exports.delete = async (id) => {
    await receiptModel.findByIdAndDelete(id);
}

exports.update = async (id, receipt) => {
    await receiptModel.findByIdAndUpdate(id, receipt);
}