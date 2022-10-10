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


exports.insert = async (body) => {
    await receiptService.insert(body);
}

exports.delete = async (id) => {
    await receiptService.delete(id);
}

exports.update = async (id, product) => {
    await receiptService.update(id, product);
}