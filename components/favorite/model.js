const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const favoriteSchema = new Schema({
    id: {type:ObjectId},
    user_id: {type:Schema.Types.ObjectId,ref:'user'},
    product_id: {type:Schema.Types.ObjectId,ref:'product'}
})
module.exports = mongoose.model('favorite',favoriteSchema)