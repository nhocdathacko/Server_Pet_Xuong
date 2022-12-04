const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    Name: { type: String },
    Price: { type: Number },
    Describes: {type: String},
    Evaluate: {type: Number, default: 0},
    category_id: { type: String, ref: 'category' },
    Quantity: { type: Number },
    Image: { type: String },
    IsPet: {type: Boolean},
    IsStop: {type: Boolean},
    
});

module.exports = mongoose.model('product', productSchema);