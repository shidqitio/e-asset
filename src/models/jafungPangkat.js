const { DataTypes } = require("sequelize");
const db = require("../database");
const Jafung = require("./jafung");
const GolonganRuang = require("./golonganRuang");

const JafungPangkat = db.define(
  "JafungPangkat",
  {
    kode_jafung_pangkat: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
    },
    kode_jafung: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    nama_jafung_pangkat: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    kode_golongan_ruang: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    angka_kredit: {
      type: DataTypes.INTEGER(3),
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
    tableName: "ref_jafung_pangkat",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

JafungPangkat.belongsTo(Jafung, {
  foreignKey: "kode_jafung",
  as: "Jafung",
});

Jafung.hasMany(JafungPangkat, {
  foreignKey: "kode_jafung",
});

JafungPangkat.belongsTo(GolonganRuang, {
  foreignKey: "kode_golongan_ruang",
  as: "GolonganRuang",
});

GolonganRuang.hasMany(JafungPangkat, {
  foreignKey: "kode_golongan_ruang",
});

module.exports = JafungPangkat;
