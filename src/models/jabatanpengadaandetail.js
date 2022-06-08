const {DataTypes} = require("sequelize")
const db = require("../database");
const JabatanPengadaan = require("./jabatanpengadaan")

const JabatanPengadaanDetail = db.define(
    "JabatanPengadaanDetail", 
    {
        kode_jabatan_pengadaan : {
            type : DataTypes.STRING(2), 
            allowNull : true, 
        },
        kode_jabatan_pengadaan_detail : {
            type : DataTypes.STRING(6), 
            primaryKey : true, 
            allowNull : false
        },
        nama_jabatan_pengadaan_detail : {
            type : DataTypes.STRING(255),
            allowNull : false
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
        tableName : "ref_jabatan_pengadaan_detail",
        createdAt : "udcr", 
        updatedAt : "udch",
    }
);

JabatanPengadaan.hasMany(JabatanPengadaanDetail, {
    foreignKey : "kode_jabatan_pengadaan",
})

JabatanPengadaanDetail.belongsTo(JabatanPengadaan, {
    foreignKey : "kode_jabatan_pengadaan"
})

module.exports = JabatanPengadaanDetail;
