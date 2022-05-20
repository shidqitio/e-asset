const { DataTypes } = require("sequelize");
const db = require("../database");

const TKoleksiAngkaKreditHeader = db.define(
  "TKoleksiAngkaKreditHeader",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    koleksi_ke: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    status_penilaian: {
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
    tableName: "t_koleksi_angka_kredit_header",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

module.exports = TKoleksiAngkaKreditHeader;
