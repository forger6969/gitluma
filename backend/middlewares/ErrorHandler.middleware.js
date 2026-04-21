const errorHandler = async (err, req, res, next) => {
  const statusCode = err.status || 500;

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;