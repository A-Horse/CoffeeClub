var express = require('express'),
    http = require('http'),
    https = require('https'),
    morgan = require('morgan'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    cookieParser = require('cookie-parser'),
    captcha = require('captcha');

var app = express(),
    setting = require('./setting');


/***********************************************
 * Important Note:!
 * Warning: "Corss Damin" very dangerous
 * Must only in develpment env
 ***********************************************/
var cors = require('cors');
app.use(cors({
    credentials: true
}));


/***********************************************
 * Configure
 ***********************************************/
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    store: new RedisStore(setting.redis_session),
    secret: 'LoveRaspberryPi',
    name: 'sessionid22',
    resave: false,
    saveUninitialized: false
}));


/****************************************************
 * Router
 ****************************************************/
var Coffeer = require('./routes/coffeer'),
    ErrorHandler = require('./routes/error');

app.use('/coffeer', Coffeer);
app.use(ErrorHandler);

/***********************************************
 * Run
 * Choose https or http by setting.https(boolean)
 ***********************************************/
if (setting.https) {
    https.createServer({
        key: fs.readFileSync('cert/test/server.key'),
        cert: fs.readFileSync('cert/test/server.crt'),
        passphrase: '123456'
    }, app).listen(setting.https_options.port);
} else {
    var server = http.createServer(app);
    server.listen(setting.port);
    console.log('Aero-Map App Main Server listening at http://%s:%s', setting.host, setting.port);
}