const { DataTypes } = require("sequelize");
const db = require("../database");

const JenisKaryaTulisan = db.define(
  "JenisKaryaTulisan",
  {
    kode_jenis_karya_tulis: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    nama_jenis_karya_tulis: {
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
    tableName: "ref_jenis_karya_tulisan",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = JenisKaryaTulisan;
