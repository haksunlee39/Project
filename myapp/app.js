const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
// const helmet = require("helmet");

const indexRouter = require('./routes/index');
const articleRouter = require('./routes/article');
const createRouter = require('./routes/create');
const cDataRouter = require('./routes/cData');
// var usersRouter = require('./routes/users');
// var testPostRouter = require('./routes/testPost');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'h',
    secret: 'haksun',  // 암호화
    resave: false,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: new FileStore(),
    genid:function(req){
        return uuid.v4();
    }
}));

app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/createPost', createRouter);
app.use('/cData', cDataRouter);
// app.use('/users', usersRouter);
// app.use('/files', testPostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
