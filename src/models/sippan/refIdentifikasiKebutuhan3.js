const db = require("../../config/database")
const {DataTypes} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")

const RefIdentifikasiKebutuhan3 = db.define(
    "RefIdentifikasiKebutuhan3", 
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
        existing_bmut : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        },
        kondisi_baik : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        },
        kondisi_rusak_ringan : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        },
        kondisi_rusak_berat : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        },
        pnbp : {
            type : DataTypes.DECIMAL(12,2),
            allowNull : true
        },
        rm : {
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
        tableName : "ref_identifikasi_kebutuhan_3", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefIdentifikasiKebutuhan3,{
    foreignKey : "kode_kegiatan_rkt"
})

RefIdentifikasiKebutuhan3.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})

Asset.hasMany(RefIdentifikasiKebutuhan3, {
    foreignKey : "kode_asset", 
})

RefIdentifikasiKebutuhan3.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = RefIdentifikasiKebutuhan3