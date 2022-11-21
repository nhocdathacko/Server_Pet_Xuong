const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String },
    status: { type: Boolean, default:true },
});

// user số ít
module.exports = mongoose.model('user', userSchema);

// mongodb+srv://admin:<password>@cluster0.bxyai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority