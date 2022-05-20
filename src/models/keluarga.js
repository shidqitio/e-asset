const { DataTypes } = require("sequelize");
const db = require("../database");

const Keluarga = db.define(
  "Keluarga",
  {
    kode_keluarga: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    nama_keluarga: {
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
    tableName: "ref_keluarga",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = Keluarga;
