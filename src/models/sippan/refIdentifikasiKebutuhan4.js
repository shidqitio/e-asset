const db = require("../../config/database")
const {DataTypes} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")

const RefIdentifikasiKebutuhan4 = db.define(
    "RefIdentifikasiKebutuhan4", 
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
        barang_pasar : {
            type : DataTypes.ENUM("ya","tidak"),
            allowNull : true
        },
        produsen_syarat : {
            type : DataTypes.ENUM("banyak","terbatas"),
            allowNull : true
        },
        persyaratan_barang : {
            type : DataTypes.ENUM("ya","tidak"),
            allowNull : true
        },
        sedikit_tkdn : {
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
        tableName : "ref_identifikasi_kebutuhan_4", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefIdentifikasiKebutuhan4,{
    foreignKey : "kode_kegiatan_rkt"
})

RefIdentifikasiKebutuhan4.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})

Asset.hasMany(RefIdentifikasiKebutuhan4, {
    foreignKey : "kode_asset", 
})

RefIdentifikasiKebutuhan4.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = RefIdentifikasiKebutuhan4