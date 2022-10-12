const receiptService = require('./service');
const date = require('../../utils/date');
const async = require('hbs/lib/async');

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

exports.getReceiptById = async (id) => {
    let receipt = await receiptService.getReceiptById(id);
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
    await receiptService.update(id, receipt);
}