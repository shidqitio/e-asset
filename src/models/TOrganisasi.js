const { DataTypes } = require("sequelize");
const db = require("../database");

const TOrganisasi = db.define(
  "TOrganisasi",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    kode_organisasi: {
      type: DataTypes.INTEGER(9),
      primaryKey: true,
      allowNull: false,
    },
    periode: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    nama_organisasi: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    kedudukan_diorganisasi: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    domisili_organisasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pimpinan_organisasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ucr: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    uch: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: "t_organisasi",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TOrganisasi;
