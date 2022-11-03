const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const evaluatedSchema = new Schema({
    id: { type: ObjectId },
    id_user: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    id_product: { type: Schema.Types.ObjectId, ref: 'product', default: null },
    point: { type: Number },
});

// category: số ít
module.exports = mongoose.model('evaluated', evaluatedSchema);
