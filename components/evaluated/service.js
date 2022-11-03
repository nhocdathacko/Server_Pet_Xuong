
const evaluatedmodel = require('./model');
// lấy đánh giá theo người dùng
const getevaluatedbyiduser = async (id_user) => {
    const evaluated = await evaluatedmodel.find({ id_user })
    return evaluated
}
// insert
const insert = async (evaluated) => {
    const p = new evaluatedmodel(evaluated)
    return await p.save()
}
// all đánh giá
const getevaluated = async () => {
    return await evaluatedmodel.find()
};
// delete
const deletee = async (id) => {
    await evaluatedmodel.findByIdAndDelete(id);

}
//update
const update = async (id, point) => {
    await evaluatedmodel.findOneAndUpdate(
        { _id: id },
        {
            $set:
            {
                point: point,

            }
        }
    )
}

module.exports = { getevaluatedbyiduser, insert, deletee, getevaluated, update }







