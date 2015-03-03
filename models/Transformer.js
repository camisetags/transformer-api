module.exports = function (app) {

    var Transformer = new db.Schema({
        problem: String,
        description: String
    });

    return db.model('Transformer', Transformer);
}
