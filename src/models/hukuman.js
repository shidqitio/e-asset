const { DataTypes } = require("sequelize");
const db = require("../database");

const Hukuman = db.define(
  "Hukuman",
  {
    kode_hukuman: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    nama_hukuman: {
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
    tableName: "ref_hukuman",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = Hukuman;
