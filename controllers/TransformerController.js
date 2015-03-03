module.exports = function (app) {
    var mongoose = require('mongoose');
    var Transformer = app.models.Transformer;

    var TransformerController = {
        index: function (req, res) {
            var page = 0;

            if (req.query.page) {
                page = req.query.page == 1 ? 0 : req.query.page * 6 - 6;
            }

            Transformer.find({}, {}, { skip: page, limit: 6 }, function (err, docs) {
                if (err) {
                    res.json({
                        code: 500,
                        data: 'Opa, olha o erro: ' + err
                    });
                } else {
                    res.json({
                        code: 200,
                        data: docs
                    });
                }
            });
        },

        store: function (req, res) {

            if (req.body.description && req.body.problem) {
                var trans = Transformer(req.body);

                trans.save(function (err, doc) {
                    if (err) {
                        res.json({
                            code: 500,
                            data: 'Opa, olha o erro: ' + err
                        });
                    } else {
                        res.json({
                            code: 200,
                            data: doc
                        });
                    }
                });
            } else {
                res.json({
                    code: 400,
                    data: {
                        'description': 'deve ser preenchida',
                        'problem': 'deve ser preenchido'
                    }
                });
            }
        },

        show: function (req, res) {

            Transformer.findById(req.params.id, 'problem description', function (err, doc) {
                if (err) {
                    res.json({
                        code: 500,
                        data: 'Opa, olha o erro: ' + err
                    });
                } else if (!doc) {
                    res.json({
                        code: 404,
                        data: 'Transformer não foi encontrado!'
                    });
                } else {
                    res.json({
                        code: 200,
                        data: doc
                    });
                }
            });
        },

        update: function (req, res) {

            Transformer.findById(req.params.id, function (err, doc) {
                if (err) {
                    res.json({
                        code: 500,
                        data: 'Opa, olha o erro: ' + err
                    });
                } else if (!doc) {
                    res.json({
                        code: 404,
                        data: 'Transformer não foi encontrado!'
                    });
                } else {

                    doc.description = req.body.description;
                    doc.problem = req.body.problem;
                    doc.save();

                    res.json({
                        code: 200,
                        data: doc
                    });
                }
            });
        },

        delete: function (req, res) {
            
            Transformer.findByIdAndRemove(req.params.id, function (err, doc) {
                if (err) {
                    res.json({
                        code: 500,
                        data: 'Opa, olha o erro: ' + err
                    });
                } else if (!doc) {
                    res.json({
                        code: 404,
                        data: 'Transformer não foi encontrado!'
                    });
                } else {
                    res.json({
                        code: 200,
                        data: {
                            message: 'removido com sucesso',
                            obj: doc
                        }
                    });
                }
            });
        }
    };

    return TransformerController;

}
