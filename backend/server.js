const express = require('express');
const {connectDB} = require('./services/db');
const {errorHandler} = require('./middleware/errorMiddleware');
const cors = require('cors');

require('colors');
require('dotenv').config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

// middlewares

// app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use('/', require('./routes/noteRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

// server entry
app.listen(port, () => {
    console.log(`server started on ${port}`);
});
