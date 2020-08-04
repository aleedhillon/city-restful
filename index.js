const express = require('express');
const mongoose = require('mongoose');
const cityRouter = require('./routes/city');
const app = express();

app.use(express.json());

const serverPort = 3000;
const dbUrl = 'mongodb://localhost:27017/city-restful';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const db = mongoose.connection;

// db.on('errro', () => console.log('db error'));
// db.once('open', () => console.log('db success'));

app.use('/api/cities', cityRouter);

app.listen(serverPort, () => console.log(`City Restful app server started at http://localhost:${serverPort}`));