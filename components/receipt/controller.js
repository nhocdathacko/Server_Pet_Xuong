const receiptService = require('./service');
const date = require('../../utils/date');
const async = require('hbs/lib/async');
const detailreceiptController = require('../detiledrececeipt/controller');


// lấy thông tin lịch sử giao dịch
exports.getReceipts = async () => {
    let data = await receiptService.getReceipts();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            userid: item.UserId,
            date: item.Date,
            summoney: item.SumMoney,
            isbill: item.IsBill,
            index: index + 1
        }

        return item;

    })
    console.log('controller>>>>>>>>', data);
    return data;
}

// lấy thông tin giỏ hàng nếu không có giỏ hàng thì sẽ tạo giỏi hàng mới
exports.getReceiptById = async (id) => {
    let receipt = await receiptService.getReceiptsCart(id);
    if (!receipt) {
       await this.insert(id);
       receipt = await receiptService.getReceiptsCart(id);
    }
    console.log("<>>2<><>"+receipt+"><><><><>");
    return receipt;
}


exports.getReceiptsForOneProduct = async (selectedId) => {
    let receipts = await receiptService.getReceipts();
    receipts = receipts.map(item => {
        item = {
            _id: item._id,
            quantity: item.quantity,
            price: item.price,
            selected: item._id.toString() == selectedId.toString()
        }
        return item;
    })
    return receipts;
}

// lấy thông tin giỏ hàng theo user
exports.getReceiptsCart = async (id) => {
    let item = await receiptService.getReceiptsCart(id);
    console.log(item);
    if (item) {
        item = {
            _id: item._id,
            userid: item.UserId,
            date: item.date,
            summoney: item.SumMoney,
            isbill: item.IsBill
        }
    };
    return item;
}
exports.insert = async (UserId) => {
    let date = new Date();
    let IsBill = false;
    let SumMoney = 0;
    let body = { UserId, date, SumMoney, IsBill }
    const data = await receiptService.insert(body);
    return data;
}

exports.delete = async (id) => {
    await receiptService.delete(id);
}

exports.update = async (id, receipt) => {
    return await receiptService.update(id, receipt);
}