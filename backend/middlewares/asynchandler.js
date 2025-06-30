const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  });
};

export default asyncHandler;
