const Fakultas = require("../models/fakultas");

exports.index = (req, res, next) => {
  Fakultas.findAll()
    .then((fakultas) => {
      res.json({
        status: "success",
        message: "Berhasil manampilkan data",
        data: fakultas,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.store = (req, res, next) => {
  
};
exports.show = (req, res, next) => {
  //
};
exports.update = (req, res, next) => {
  //
};
exports.destroy = (req, res, next) => {
  //
};
