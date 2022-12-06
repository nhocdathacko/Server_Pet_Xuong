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
    const receipts = await receiptModel.find({IsBill: true}).populate('UserId');
    return receipts;
}
exports.getReceiptsByUser = async (UserId) => {
    // return data;
    // select
    const receipts = await receiptModel.find({IsBill: true}, {UserId: UserId});
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
    const receipts = await receiptModel.findById(id).populate('UserId');
    return receipts;
}

exports.getReceiptByDate = async (_date1, _date2) => {
    
    let Day1 = _date1;
    let Month1 = Day1.getMonth()+1;
    let a = Day1.getFullYear() + "-"+ Month1 + "-"+Day1.getDate();
    console.log("server a: ")
    console.log(a)
    let Day2 = _date2;
    let Month2 = Day2.getMonth()+1;
    let b = Day2.getFullYear() + "-" + Month2 + "-" + Day2.getDate();
    console.log("server b: ")
    console.log(b)

    
    const receipts = await receiptModel.find({
        date: 
        {
            $gte: a,
            $lt: b 
        },
        IsBill: true
    }).populate('UserId');
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
    let result;
    await receiptModel.findByIdAndUpdate(id, receipt)
    .then(data => {
        console.log("Thêm thành công" );
        result = true;
      }).catch(err => {
        console.log("thất bại");
        result = false;
      });
    return result;
}