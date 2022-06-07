const { DataTypes } = require("sequelize");
const db = require("../database");

const JenisFungsional = db.define(
  "JenisFungsional",
  {
    kode_jenis_fungsional: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    nama_jenis_fungsional: {
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
    tableName: "ref_jenis_fungsional",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);





module.exports = JenisFungsional;
