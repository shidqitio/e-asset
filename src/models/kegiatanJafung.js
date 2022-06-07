const { DataTypes } = require("sequelize");
const db = require("../database");
const UnsurUtama = require("./unsurUtama");

const KegiatanJafung = db.define(
  "KegiatanJafung",
  {
    kode_kegiatan: {
      type: DataTypes.STRING(7),
      primaryKey: true,
      allowNull: false,
    },
    kode_unsur_utama: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    nama_kegiatan: {
      type: DataTypes.STRING(300),
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
    tableName: "ref_kegiatan_jafung",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

UnsurUtama.hasMany(KegiatanJafung, {
  foreignKey: "kode_unsur_utama",
});

KegiatanJafung.belongsTo(UnsurUtama, {
  foreignKey: "kode_unsur_utama",
});

module.exports = KegiatanJafung;
