module.exports = function (app) {

    var Transformer = new db.Schema({
        status: String,
        datas: [{
            description: String,
            date: { type: Date, default: Date.now}
        }],
        problems: [{
            name: String,
            description: String
        }]
    });

    return db.model('Transformer', Transformer);
}
