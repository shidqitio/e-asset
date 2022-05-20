const { DataTypes } = require("sequelize");
const db = require("../database");

const GolonganRuang = db.define(
  "GolonganRuang",
  {
    kode_golongan_ruang: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    keterangan_pangkat: {
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
    tableName: "ref_golongan_ruang",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = GolonganRuang;
