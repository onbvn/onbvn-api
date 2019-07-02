const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

mongoose.set("useCreateIndex", true);
mongoose
    .connect(process.env["MONGOLAB_MAUVE_URI"] || 'mongodb://localhost:27017/onbvn', { useNewUrlParser: true })
    .catch( reason => {
        console.log('Failed to connect: ', reason);
    });
const app = express();

const swaggerDefinition = {
    info: {
        title: 'OnBVN API',
        version: '1.0.0',
        description: 'The node.js API for OnBVN social media application'
    },
    host: 'localhost:3000',
    basePath: '',
    validatorUrl: undefined
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/users/', usersRouter);
app.use('/api/v1/auth/', authRouter);

app.get('/swagger', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec)
});

module.exports = app;
