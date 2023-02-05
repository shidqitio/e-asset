const db = require("../../config/database")
const {DataTypes} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")

const RefIdentifikasiKebutuhan1 = db.define(
    "RefIdentifikasiKebutuhan1", 
    {
        kode_kegiatan_rkt : {
            type : DataTypes.INTEGER(),
            allowNull : false, 
            primaryKey : true
        },
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_unit_kerja : {
            type : DataTypes.STRING(16),
            allowNull : false, 
            primaryKey : true
        },
        waktu_pemanfaatan : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        }, 
        perkiraan_pengadaan : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        },
        pihak_pengguna : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        ekatalog : {
            type : DataTypes.ENUM('iya','tidak'),
            allowNull : true
        }, 
        tingkat_prioritas : {
            type : DataTypes.ENUM("tinggi", "sedang", "kecil"),
            allowNull : true
        },
        perkiraan_biaya : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        }, 
        komentar : {
            type : DataTypes.STRING(255),
            allowNull : true
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
        tableName : "ref_identifikasi_kebutuhan_1", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefIdentifikasiKebutuhan1,{
    foreignKey : "kode_kegiatan_rkt"
})

RefIdentifikasiKebutuhan1.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})

Asset.hasMany(RefIdentifikasiKebutuhan1, {
    foreignKey : "kode_asset", 
})

RefIdentifikasiKebutuhan1.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = RefIdentifikasiKebutuhan1