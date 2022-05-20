const { DataTypes } = require("sequelize");
const db = require("../database");

const Unit = db.define(
  "Unit",
  {
    kode_unit: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    nama_unit: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status_aktif_unit: {
      type: DataTypes.ENUM("0", "1"),
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
    tableName: "ref_unit",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = Unit;
