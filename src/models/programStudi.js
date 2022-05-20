const { Sequelize } = require("sequelize");
const db = require("../database");
const Fakultas = require("./fakultas");

const { DataTypes } = Sequelize;

const ProgramStudi = db.define(
  "ProgramStudi",
  {
    kode_program_studi: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    kode_fakultas: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    nama_program_studi: {
      type: DataTypes.STRING(255),
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
    tableName: "ref_program_studi",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

// Fakultas.hasMany(ProgramStudi, {
//   foreignKey: "kode_fakultas",
// });

// ProgramStudi.belongsTo(Fakultas, {
//   foreignKey: "kode_fakultas",
// });

module.exports = ProgramStudi;
