module.exports = function (app) {
    var trans = app.controllers.TransformerController;
    
    app.get('/api/trans', trans.index);
    app.get('/api/trans/:id', trans.show);
    app.post('/api/trans', trans.store);
    app.put('/api/trans/:id', trans.update);
    app.delete('/api/trans/:id', trans.delete);
    
    app.get('/api/trans/con/:connection', trans.get_connected);
}
