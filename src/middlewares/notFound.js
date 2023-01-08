module.exports = (req, res, next) => {
    res.json({
      code: 404,
      message: "Page not found",
    });
  };
  