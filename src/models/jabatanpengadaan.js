const {DataTypes} = require("sequelize");
const db = require("../database");

const JabatanPengadaan = db.define(
    "JabatanPengadaan", 
    {
        kode_jabatan_pengadaan : {
            type : DataTypes.STRING(2), 
            primaryKey : true, 
            allowNull : false,
        }, 
        nama_jabatan_pengadaan : {
            type : DataTypes.STRING(100), 
            allowNull : false,
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
        tableName : "ref_jabatan_pengadaan", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
);

module.exports = JabatanPengadaan; 