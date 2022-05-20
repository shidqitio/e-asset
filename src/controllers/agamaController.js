const Agama = require("../models/agama");

exports.index = (req, res, next) => {
  Agama.findAll()
    .then((agama) => {
      res.json({
        status: "success",
        message: "Berhasil manampilkan data",
        data: agama,
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
  Agama.max("kode_agama")
    .then((kode) => {
      let kode_agama = "00";

      if (kode !== null) {
        kode_agama = kode;
      }

      let kode1 = parseInt(kode_agama.charAt(0));
      let kode2 = parseInt(kode_agama.charAt(1));

      if (kode1 > 0) {
        if (kode2 === 9) {
          kode1 = parseInt(kode1) + 1;
          kode2 = 0;
          kode_agama = kode1.toString() + kode2.toString();
        } else {
          kode_agama = parseInt(kode_agama) + 1;
        }
      }

      if (kode1 === 0) {
        if (kode2 === 9) {
          kode1 = parseInt(kode1) + 1;
          kode2 = 0;
          kode_agama = kode1.toString() + kode2.toString();
        } else {
          kode_agama = kode1.toString() + String(parseInt(kode2) + 1);
        }
      }

      if (kode === null) {
        kode_agama = "00";
      }

      return Agama.create({
        kode_agama: kode_agama,
        nama_agama: req.body.nama_agama,
        ucr: req.user.nama_pegawai,
      });
    })
    .then((agama) => {
      res.json({
        status: "success",
        message: "Berhasil menyimpan data",
        data: agama,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.show = (req, res, next) => {
  Agama.findOne({ where: { kode_agama: req.params.id } })
    .then((agama) => {
      if (!agama) {
        const error = new Error("Kode agama tidak ada.");
        error.statusCode = 422;
        throw error;
      }
      res.json({
        status: "success",
        message: "Berhasil menampilkan data",
        data: agama,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.update = (req, res, next) => {
  const data = {
    kode_agama: req.params.id,
    nama_agama: req.body.nama_agama,
    uch: req.user.nama_pegawai,
  };

  Agama.findOne({ where: { kode_agama: req.params.id } })
    .then((ex) => {
      if (!ex) {
        const error = new Error("Kode agama tidak ada.");
        error.statusCode = 422;
        throw error;
      }

      return Agama.update(data, { where: { kode_agama: req.params.id } });
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
  Agama.findOne({ where: { kode_agama: req.params.id } })
    .then((app) => {
      if (!app) {
        const error = new Error("Kode agama tidak ada.");
        error.statusCode = 422;
        throw error;
      }
      return Agama.destroy({
        where: {
          kode_agama: req.params.id,
        },
      });
    })
    .then((response) => {
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
