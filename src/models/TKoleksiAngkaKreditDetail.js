const { DataTypes } = require("sequelize");
const db = require("../database");

const TKoleksiAngkaKreditDetail = db.define(
  "TKoleksiAngkaKreditDetail",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    koleksi_ke: {
      type: DataTypes.INTEGER(3),
      unique: true,
      allowNull: false,
    },
    kode_kegiatan_sub2: {
      type: DataTypes.STRING(13),
      unique: true,
      allowNull: false,
    },
    bukti_ke: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    tanggal_bukti: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nama_folder_bukti: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    nama_file_bukti: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_serta: {
      type: DataTypes.STRING(1),
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
    tableName: "t_koleksi_angka_kredit_detail",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TKoleksiAngkaKreditDetail;
