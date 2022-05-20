const { DataTypes } = require("sequelize");
const db = require("../database");
const Jafung = require("./jafung");
const UnsurUtama = require("./unsurUtama");

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

JenisFungsional.hasMany(Jafung, {
  foreignKey: "kode_jenis_fungsional",
});
Jafung.belongsTo(JenisFungsional, {
  foreignKey: "kode_jenis_fungsional",
});

JenisFungsional.hasMany(UnsurUtama, {
  foreignKey: "kode_jenis_fungsional",
});
UnsurUtama.belongsTo(JenisFungsional, {
  foreignKey: "kode_jenis_fungsional",
});

module.exports = JenisFungsional;
