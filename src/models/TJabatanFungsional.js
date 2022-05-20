const { DataTypes } = require("sequelize");
const db = require("../database");

const TJabatanFungsional = db.define(
  "TJabatanFungsional",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    kode_jafung_pangkat: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      unique: false,
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    tmt_awal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tmt_akhir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nomor_sk_jafung: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    folder_surat_hukuman: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nama_file_surat_hukuman: {
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
    tableName: "t_jabatan_fungsional",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TJabatanFungsional;
