const db = require("../../config/database")
const {DataTypes} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")

const RefKriteriaBarang = db.define(
    "RefKriteriaBarang", 
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
        kriteria_barang : {
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
        tableName : "ref_kriteria_barang", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefKriteriaBarang,{
    foreignKey : "kode_kegiatan_rkt"
})

RefKriteriaBarang.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})

Asset.hasMany(RefKriteriaBarang, {
    foreignKey : "kode_asset", 
})

RefKriteriaBarang.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = RefKriteriaBarang