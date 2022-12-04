const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const receiptdetailSchema = new Schema({
    id: { type: ObjectId },
    ReceiptId: { type: ObjectId, ref: 'receipt'},
    ProductId: { type: ObjectId, ref: 'product' },
    Quantity: { type: Number },
    Price: {type: Number},

});

module.exports = mongoose.model('detailedreceipt', receiptdetailSchema);