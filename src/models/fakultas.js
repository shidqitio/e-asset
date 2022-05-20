const { DataTypes } = require("sequelize");
const db = require("../database");
const ProgramStudi = require("./programStudi");

const Fakultas = db.define(
  "Fakultas",
  {
    kode_fakultas: {
      type: DataTypes.STRING(1),
      primaryKey: true,
      allowNull: false,
    },
    nama_fakultas: {
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
    tableName: "ref_fakultas",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

Fakultas.hasMany(ProgramStudi, {
  foreignKey: "kode_fakultas",
});

ProgramStudi.belongsTo(Fakultas, {
  foreignKey: "kode_fakultas",
});

module.exports = Fakultas;
