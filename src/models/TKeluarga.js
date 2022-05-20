const { DataTypes } = require("sequelize");
const db = require("../database");

const TKeluarga = db.define(
  "TKeluarga",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    kode_keluarga: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    nama_keluarga: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    penerbit_karya_tulis: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pekerjaan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_nikah: {
      type: DataTypes.ENUM("Nikah", "Belum Nikah"),
      allowNull: false,
    },
    folder_akte_kelahiran: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nama_file_akte_kelahiran: {
      type: DataTypes.STRING(100),
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
    tableName: "t_keluarga",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TKeluarga;
