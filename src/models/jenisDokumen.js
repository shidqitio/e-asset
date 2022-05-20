const { DataTypes } = require("sequelize");
const db = require("../database");

const JenisDokumen = db.define(
  "JenisDokumen",
  {
    kode_jenis_dokumen: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    nama_jenis_dokumen: {
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
    tableName: "ref_jenis_dokumen",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = JenisDokumen;
