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
exports.getDeReceiptByReceiptId = async (ReceiptId) => {
    let data = await deReceiptService.getDeReceiptByReceiptId(ReceiptId);
    if (data) {
        data = data.map((item, index) => {
            item = {
                _id: item._id,
                receipt_id: item.ReceiptId,
                product_id: item.ProductId,
                quantity: item.Quantity,
                price: item.Price
            }
            return item;
            
        })
    }
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
    const data = await deReceiptService.insert(body);
    if (!data) {
        return false;
    }
    return true;
}

exports.delete = async (id) => {
    await deReceiptService.delete(id);
}

exports.update = async (id, set) => {
    await deReceiptService.update(id, set);
}

