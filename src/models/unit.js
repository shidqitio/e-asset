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
    revisi_ke : {
      type : DataTypes.INTEGER(), 
      primaryKey : true, 
      allowNull : false,
      defaultValue : 0,
    },
    nama_unit: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    induk_unit : {
      type : DataTypes.STRING(6),
      allowNull : false,
    },
    status_aktif_unit: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: false,
      defaultValue : 1,
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
