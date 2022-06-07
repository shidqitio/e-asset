const { DataTypes } = require("sequelize");
const db = require("../database");
const JenisFungsional = require("./jenisFungsional");

const UnsurUtama = db.define(
  "UnsurUtama",
  {
    kode_jenis_fungsional: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    kode_unsur_utama: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false,
    },
    nama_unsur_utama: {
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
    tableName: "ref_unsur_utama",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

JenisFungsional.hasMany(UnsurUtama, {
  foreignKey: "kode_jenis_fungsional",
});
UnsurUtama.belongsTo(JenisFungsional, {
  foreignKey: "kode_jenis_fungsional",

});



module.exports = UnsurUtama;
