module.exports = (err, req, res, next) => {
  res.status(404).json({
    status: "failed",
    data: {
      message: err.message,
    },
  });
};
