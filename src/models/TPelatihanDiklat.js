const { DataTypes } = require("sequelize");
const db = require("../database");

const TPelatihanDiklat = db.define(
  "TPelatihanDiklat",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    nama_jenis_dokumen: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    kode_pelatihan_diklat: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    nama_pelatihan_diklat: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    penyelenggara: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tempat: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_selesai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nomor_sertifikat: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tanggal_sertifikat: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_jam: {
      type: DataTypes.INTEGER(11),
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
    tableName: "t_pelatihan_diklat",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TPelatihanDiklat;
