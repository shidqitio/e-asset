const { DataTypes } = require("sequelize");
const db = require("../database");

const Agama = db.define(
  "Agama",
  {
    kode_agama: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    nama_agama: {
      type: DataTypes.STRING(25),
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
    tableName: "ref_agama",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = Agama;
