var express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    load         = require('express-load'),
    morgan       = require('morgan'),
    mongoose     = require('mongoose'),
    app          = express();

global.db = mongoose.connect('mongodb://localhost:27017/transformer');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    next();
});

app.get('/', function (req, res) {
    res.json({
        'message': 'api no ar!'
    });
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(3000, function () {
    console.log('Transformper-api rodando na porta 3000!');
});
