const { DataTypes } = require("sequelize");
const db = require("../database");
const KegiatanSub1Jafung = require("./kegiatanSub1Jafung");

const KegiatanSub2Jafung = db.define(
  "KegiatanSub2Jafung",
  {
    kode_kegiatan_sub2: {
      type: DataTypes.STRING(13),
      primaryKey: true,
      allowNull: false,
    },
    kode_kegiatan_sub1: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nama_kegiatan_sub2: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    bukti_kegiatan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    batas_maks: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    angka_kredit: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    kode_jafung: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    // ucr: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
    // uch: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
    // udcr: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    // udch: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  },
  {
    tableName: "ref_kegiatan_sub2_jafung",
    timestamps: false,
    // createdAt: "udcr",
    // updatedAt: "udch",
  }
);

KegiatanSub1Jafung.hasMany(KegiatanSub2Jafung, {
  foreignKey: "kode_kegiatan_sub1",
  as: "KegiatanSub2Jafung",
});

KegiatanSub2Jafung.belongsTo(KegiatanSub1Jafung, {
  foreignKey: "kode_kegiatan_sub1",
  as: "KegiatanSub1",
});

module.exports = KegiatanSub2Jafung;
