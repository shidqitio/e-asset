const { DataTypes } = require("sequelize");
const db = require("../database");

const TingkatPendidikan = db.define(
  "TingkatPendidikan",
  {
    kode_tingkat_pendidikan: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    nama_tingkat_pendidikan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ucr: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    uch: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
    tableName: "ref_tingkat_pendidikan",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TingkatPendidikan;
