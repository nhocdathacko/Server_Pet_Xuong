const favoriteModel = require('./model')
exports.getFavoriteByUser = async function(){
    return await favoriteModel.find().populate('user_id')
}
exports.getAllFavorite = async function(){
    return await favoriteModel.find()
}
exports.insertFavorite = async function(favorite){
    const f = new favoriteModel(favorite)
    return await f
    .save()
    .then((data) =>{
        return data._id
    })
    .catch((error) => console.log(error))
}
exports.updateFavorite = async function(id){
    await favoriteModel.findOneAndUpdate({_id:id})
}
exports.deleteFavorite = async function(id){
    await favoriteModel.deleteOne({_id:id})
}