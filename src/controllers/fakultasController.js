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
  Fakultas.max("kode_fakultas")
  .then((kode) => {
    let kode_fakultas = "0";

    if(kode !== null) {
      kode_fakultas = kode
    }

    let kode1 = parseInt(kode_fakultas.charAt(0));

    if(kode > 0 ){
      kode1 = parseInt(kode1) + 1 
      kode_fakultas = kode1.toString()
    } else {
      kode_fakultas = parseInt(kode_fakultas) + 1
    }

    if(kode1 === 0) {
      kode1 = parseInt(kode1) + 1;
      kode_fakultas = kode1.toString()
    } else {
      kode_fakultas = kode1.toString();
    }

    return Fakultas.create({
      kode_fakultas : kode_fakultas, 
      nama_fakultas : req.body.nama_fakultas, 
      ucr : "Indrawan"
    }); 
  })
  .then((fakultas) => {
    res.json({
      status : "Success", 
      message : "Berhasil Menyimpan Data", 
      data: fakultas
    });
  })
  .catch((err) => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
};
exports.show = (req, res, next) => {
  Fakultas.findOne({ where : {kode_fakultas : req.params.kode_fakultas}})
  .then((fakultas) => {
    if(!fakultas) {
      const error = new Error("Kode Fakultas tidak ada.");
      error.statusCode = 422;
      throw error; 
    }
    res.json({
        status: "success",
        message: "Berhasil menampilkan data",
        data: fakultas,
    });
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err); 
  })
};

exports.update = (req, res, next) => {
  const data = {
    kode_fakultas : req.params.kode_fakultas, 
    nama_fakultas : req.body.nama_fakultas, 
    uch : "Indrawan"
  };

  Fakultas.findOne({where: {kode_fakultas: req.params.kode_fakultas}})
  .then((ex) => {
    if (!ex) {
      const error = new Error("Kode Fakultas tidak ada.");
      error.statusCode = 422;
      throw error;
    }
    return Fakultas.update(data, {where : {kode_fakultas : req.params.kode_fakultas}});
  })
  .then((up) => {
    res.json({
      status: "success",
      message: "Berhasil memperbarui data",
      data: data,
    });
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.destroy = (req, res, next) => {
  Fakultas.findOne({ where : {kode_fakultas : req.params.kode_fakultas}})
  .then((app) => {
    if(!app) {
      const error = new Error("Kode Fakultas tidak ada.");
      error.statusCode = 422;
      throw error;
    }
    return Fakultas.destroy({
      where : {
        kode_fakultas : req.params.kode_fakultas,
      },
    });
  })
  .then ((response)=>{
    res.json({
      status: "success",
      message: "Berhasil menghapus data",
      data: response,
    });
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
