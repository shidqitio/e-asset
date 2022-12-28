const db = require("../../config/database")
const {DataTypes} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")

const RefIdentifikasiKebutuhan5 = db.define(
    "RefIdentifikasiKebutuhan5", 
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
        cara_pengiriman : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        cara_pengakuan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        cara_pemasangan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        cara_penimbunan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        cara_pengoperasian : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        kebutuhan_pelatihan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        aspek_pengadaan : {
            type : DataTypes.STRING(255),
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
        tableName : "ref_identifikasi_kebutuhan_5", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefIdentifikasiKebutuhan5,{
    foreignKey : "kode_kegiatan_rkt"
})

RefIdentifikasiKebutuhan5.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})

Asset.hasMany(RefIdentifikasiKebutuhan5, {
    foreignKey : "kode_asset", 
})

RefIdentifikasiKebutuhan5.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = RefIdentifikasiKebutuhan5