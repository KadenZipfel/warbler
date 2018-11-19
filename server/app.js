const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');

const PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Routes will go here later

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is listening.');
});