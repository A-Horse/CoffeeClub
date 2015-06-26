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
    captcha = require('captcha'),
  methodOverride = require('method-override');

var app = express(),
    setting = require('./setting');


/***********************************************
 * Important Note:!
 * Warning: "Corss Damin" very dangerousf
 * Must only in develpment env
 ***********************************************/
var cors = require('cors');
app.use(cors({
  credentials: true,
  origin: 'http://10.42.0.16'
}));


/***********************************************
 * Configure
 ***********************************************/
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
    store: new RedisStore(setting.redis_session),
    secret: 'LoveRaspberryPi',
    name: 'sessionid',
    resave: false,
    saveUninitialized: false
}));

//app.use(express.static('../front/app'));

/****************************************************
 * Router
 ****************************************************/
var Coffeer = require('./routes/coffeer'),
    Article = require('./routes/article'),
    Product = require('./routes/product'),
    Wiki = require('./routes/wiki'),
    Test = require('./routes/test'),
    Captcha = require('./routes/captcha'),
    ErrorHandler = require('./routes/error');
app.use('/api/test', Test);
app.use('/api/captcha', Captcha);
app.use('/api/user', Coffeer);
app.use('/api/article', Article);
app.use('/api/product', Product);
app.use('/api/wiki', Wiki);
app.use(ErrorHandler.log);
//app.use(ErrorHandler.clientErrorHandler);
app.use(ErrorHandler.errorHandler);




/***********************************************
 * Run
 * Choose https or http by setting.https(boolean)
 ***********************************************/
if (setting.https) {
    https.createServer({
        key: fs.readFileSync('cert/ssl.key'),
        cert: fs.readFileSync('cert/ssl.crt'),
        passphrase: 'minangong9'
    }, app).listen(setting.https_options.port);
} else {
    var server = http.createServer(app);
    server.listen(setting.port);
    console.log('Aero-Map App Main Server listening at http://%s:%s', setting.host, setting.port);
}
