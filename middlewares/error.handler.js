function logErrors(error, req, res, next) {
  console.log('logErrors');
  console.log({ error });
  next(error);
}

function errorHandler(error, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
  next(error);
}

function boomErrrorHandler(error, req, res, next) {
  console.log({ error });
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrrorHandler,
};
