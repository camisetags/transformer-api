module.exports = function (app) {

    var Transformer = app.models.Transformer;

    var TransformerController = {
        index: function (req, res) {
            var page = 0;

            if (req.query.page) {
                page = req.query.page == 1 ? 0 : req.query.page * 5 - 5;
            }

            Transformer.find({}, {}, { skip: page, limit: 5 }, function (err, transformers) {
                if (err) {
                    res.json({
                        type: false,
                        data: 'Opa deu erro! ' + err
                    });
                } else {
                    res.json({
                        type: true,
                        data: transformers
                    });
                }
            });
        },

        store: function (req, res) {

            if (req.body.description && req.body.problem) {
                var trans = Transformer(req.body);

                trans.save(function (err, tra) {
                    if (err) {
                        res.json({
                            type: false,
                            data: 'Opa deu erro! ' + err
                        });
                    } else {
                        res.json({
                            type: true,
                            data: tra
                        });
                    }
                });
            } else {
                res.json({
                    type: false,
                    data: {
                        'description': 'deve ser preenchida',
                        'problem': 'deve ser preenchido'
                    }
                });
            }
        },

        show: function (req, res) {

        },

        update: function (req, res) {

        },

        delete: function (req, res) {

        }
    };

    return TransformerController;

}
