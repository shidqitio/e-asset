const db = require("../database");
const {DataTypes} = require("sequelize")
const Pegawai = require("./pegawai")
const JabatanPengadaanDetail = require("./jabatanpengadaandetail")

const TrxJabatanPengadaan = db.define(
    "TrxJabatanPengadaan", 
    {
        kode_jabatan_pengadaan_detail : {
            type : DataTypes.STRING(6), 
            allowNull : false, 
        }, 
        nip : {
            type : DataTypes.STRING(20), 
            primaryKey : true, 
            allowNull : false
        }, 
        periode : {
            type : DataTypes.INTEGER(), 
            primaryKey : true, 
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
        tableName : "trx_jabatan_pengadaan", 
        createdAt : "udcr", 
        updatedAt : "udch", 
    }
)

Pegawai.hasMany(TrxJabatanPengadaan, {
    foreignKey : "nip",
})

TrxJabatanPengadaan.belongsTo(Pegawai, {
    foreignKey : "nip",
})

JabatanPengadaanDetail.hasMany(TrxJabatanPengadaan, {
    foreignKey : "kode_jabatan_pengadaan_detail"
})

TrxJabatanPengadaan.belongsTo(JabatanPengadaanDetail, {
    foreignKey : "kode_jabatan_pengadaan_detail"
})

module.exports = TrxJabatanPengadaan;