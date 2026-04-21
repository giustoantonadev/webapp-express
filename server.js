const express = require('express');
require('dotenv').config();
const db = require('./database/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const moviesRouter = require('./routes/movies');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

app.use('/reviews', require('./routes/reviews'))
app.use('/movies', moviesRouter);

app.use(express.static('public'));

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("server avviato sulla porta 3000");
});
