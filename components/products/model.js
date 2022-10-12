const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    Name: { type: String },
    Price: { type: Number },
    Describes: {type: String},
    Evaluate: {type: Number},
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    Quantity: { type: Number },
    Image: { type: String },
    IsPet: {type: Boolean},
    IsShop: {type: Boolean},    
    
});

module.exports = mongoose.model('product', productSchema);