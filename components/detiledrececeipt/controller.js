const deReceiptService = require('./service');
const date = require('../../utils/date');
const async = require('hbs/lib/async');

exports.getDeReceipts = async () => {
    let data = await deReceiptService.getDeReceipt();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            receipt_id: receipt.receipt_id,
            product_id: receipt.product_id,
            quantity: receipt.quantity,
            price: receipt.price,
            index: index + 1
        }
        return item;
        
    })
    console.log('controller>>>>>>>>', data);
    return data;
}

exports.getDeReceiptById = async (id) => {
    let receipt = await deReceiptService.getDeReceiptById(id);
    receipt = {
        _id: receipt._id,
        receipt_id: receipt.receipt_id,
        product_id: receipt.product_id,
        quantity: receipt.quantity,
        price: receipt.price,
    }
    return receipt;
}


exports.insert = async (body) => {
    await deReceiptService.insert(body);
}

exports.delete = async (id) => {
    await deReceiptService.delete(id);
}

exports.update = async (id, set) => {
    await deReceiptService.update(id, set);
}

