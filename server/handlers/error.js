function errorHandler(error, request, response, next) {
  return response.status(error.state || 500).json({
    error: {
      message: error.message || "Something went wrong."
    }
  });
}

module.exports = errorHandler;