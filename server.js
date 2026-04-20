const express = require('express');
require('dotenv').config();
const db = require('./database/db');
const app = express();
const moviesRouter = require('./routes/movies');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');


app.use('/movies', moviesRouter);

app.use('public', express.static('public'));



app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("server avviato sulla porta 3000");    
})