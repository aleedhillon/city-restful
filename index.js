require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cityRouter = require('./routes/city');
const app = express();

app.use(express.json());

const serverPort = process.env.SERVER_PORT;
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const db = mongoose.connection;

// db.on('errro', () => console.log('db error'));
// db.once('open', () => console.log('db success'));

app.use('/api/cities', cityRouter);

app.listen(serverPort, () => console.log(`City Restful app server started at http://localhost:${serverPort}`));