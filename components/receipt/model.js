const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const receiptSchema = new Schema({
    id: { type: ObjectId },
    UserId: { type: ObjectId },
    Date: { type: Date },
    SumMoney: {type: Number},
    IsBill: {type: Boolean}, 
});

module.exports = mongoose.model('receipt', receiptSchema);