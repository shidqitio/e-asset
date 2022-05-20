const { DataTypes } = require("sequelize");
const db = require("../database");

const Jafung = db.define(
  "Jafung",
  {
    kode_jafung: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    kode_jenis_fungsional: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    nama_jafung: {
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
    tableName: "ref_jafung",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = Jafung;
