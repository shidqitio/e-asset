const { DataTypes } = require("sequelize");
const db = require("../database");

const TKaryaTulisPegawai = db.define(
  "TKaryaTulisPegawai",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    kode_jenis_karya_tulis: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    kode_karya_tulis: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    judul_karya_tulis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    penerbit_karya_tulis: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nomor_isbn_doi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    penulis_ke: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    tahun_karya_tulis: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    ucr: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    uch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    udcr: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    udch: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "t_karya_tulis_pegawai",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TKaryaTulisPegawai;
