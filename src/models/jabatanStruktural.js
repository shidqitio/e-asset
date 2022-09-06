const { DataTypes } = require("sequelize");
const db = require("../database");

const JabatanStruktural = db.define(
  "JabatanStruktural",
  {
    kode_jabatan_struktural: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    nama_jabatan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status_jabatan_struktural: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING(2),
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
    tableName: "ref_jabatan_struktural",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = JabatanStruktural;
