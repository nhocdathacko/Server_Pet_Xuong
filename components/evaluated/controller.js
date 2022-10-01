const EvaluatedSer = require('./service')


const getEvaluateByUser = async (id_user) => {
    return await EvaluatedSer.getevaluatedbyiduser(id_user)
}
const insert = async (evaluated) => {
    return await EvaluatedSer.insert(evaluated)
}
const getevaluated = async () => {
    try {
        let evaluated = await EvaluatedSer.getevaluated();
        evaluated = evaluated.map((item, index) => {
            item = {

                _id: item._id,

                id_user: item.id_user,
                id_product: item.id_product,
                point: item.point,
                index: index + 1
            }
            return item;
        })

        return evaluated;
    } catch (error) {
        console.log('error ' + error);
        return []
    }
}



const update = async (id, point) => {
    try {
        await EvaluatedSer.update(id, point)
        return true
    } catch (error) {
        return false
    }
}
const deleteee = async (id) => {
    try {
        EvaluatedSer.deletee(id);

    } catch (error) {

    }
}

module.exports = { getEvaluateByUser, insert, getevaluated, deleteee, update }
