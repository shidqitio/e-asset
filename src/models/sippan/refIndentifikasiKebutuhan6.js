const db = require("../../config/database")
const {DataTypes} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")

const RefIdentifikasiKebutuhan6 = db.define(
    "RefIdentifikasiKebutuhan6", 
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
        barang_sejenis : {
            type : DataTypes.ENUM("ada","tidak"),
            allowNull : true
        },
        konsolidasi : {
            type : DataTypes.ENUM("rekomendasi", "tidak rekomendasi"),
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
        tableName : "ref_identifikasi_kebutuhan_6", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefIdentifikasiKebutuhan6,{
    foreignKey : "kode_kegiatan_rkt"
})

RefIdentifikasiKebutuhan6.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})

Asset.hasMany(RefIdentifikasiKebutuhan6, {
    foreignKey : "kode_asset", 
})

RefIdentifikasiKebutuhan6.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = RefIdentifikasiKebutuhan6