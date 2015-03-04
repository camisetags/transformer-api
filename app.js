var express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    load         = require('express-load'),
    morgan       = require('morgan'),
    mongoose     = require('mongoose'),
    swig         = require('swig');
    app          = express(),
    server       = require('http').Server(app),
    io           = require('socket.io')(server);

global.db = mongoose.connect('mongodb://localhost:27017/transformer');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static('public'));

app.use( function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

    next();
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

load('sockets')
    .into(io);

server.listen(3000, function () {
    console.log('Transformper-api rodando na porta 3000!');
});



// io.listen(4500, function () {
//     console.log('socket.io rodando na porta 4500');
// });
