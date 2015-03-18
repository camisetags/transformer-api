module.exports = function (io) {

    var request = require('request');
    var _ = require('underscore');

    var connecteds = [];
    
    io.on('connection', function (socket) {
        
        request({
            uri: api_endpoint+'/api/trans/con/disconnected',
            method: 'GET',
            json: true
        }, function (error, response, body) {
            disconnected = _.findWhere(body.data, { status: 'disconnected' });
            if (disconnected) {
                request({
                    uri: api_endpoint+'/api/trans/'+disconnected._id,
                    method: 'PUT',
                    json: true,
                    form: {
                        status: 'connected'
                    }
                }, function (error, response, body) {
                    console.log(body);
                    connecteds.push({ sock_id: socket.conn.id, trans_id: body._id});
                    socket.emit('con', body);
                    io.sockets.emit('connected sockets', body);
                });
            } else {
                console.log('Não tem transformadores disponíveis....');
            }
        });
        
        socket.on('disconnect', function (data) {
            console.log('desconnectou.. status: '+ data);

            var discId = _.findWhere(connecteds, { sock_id: socket.conn.id });

            request({
                uri: api_endpoint+'/api/trans/con/'+discId.trans_id,
                method: 'PUT',
                json: true,
                form: {
                    status: 'disconnected',
                    balanced: ''
                }
            }, function (error, response, body) {
                console.log('Servidor de id '+ body._id +' foi desconectado...');
                
                var disconn_trans = { message: 'foi desconectado', body: body };
                io.sockets.emit('socket disconnected', disconn_trans);
                
                request({
                    uri: api_endpoint+'/api/trans/con/connected',
                    method: 'GET',
                    json: true
                }, function (error, response, body) {
                    
                });
            });   
        });
    
    });
}
