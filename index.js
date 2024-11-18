const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes/index');
const cors = require('cors');

const {
  boomErrrorHandler,
  errorHandler,
  logErrors,
} = require('./middlewares/error.handler');

app.get('/', (req, res) => {
  res.send('The server is ready');
});

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
console.log('Start processing');

// Routes
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(boomErrrorHandler);
app.use(errorHandler);
