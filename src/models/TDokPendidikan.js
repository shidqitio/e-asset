const { DataTypes } = require("sequelize");
const db = require("../database");

const TDokPendidikan = db.define(
  "TDokPendidikan",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    kode_tingkat_pendidikan: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    kode_dok_pendidikan: {
      type: DataTypes.ENUM("Ijazah", "Surat Ket", "Pendamping"),
      primaryKey: true,
      allowNull: false,
    },
    kode_jenis_dokumen: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      unique: true,
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
    tableName: "t_dok_pedidikan",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TDokPendidikan;
