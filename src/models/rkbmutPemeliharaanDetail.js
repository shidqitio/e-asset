const db = require("../config/database")
const RkbmutPemeliharaanHeader = require("./rkbmutPemeliharaanHeader")
const {DataTypes} = require('sequelize')

const RkbmutPemeliharaanDetail = db.define(
    "RkbmutPemeliharaanDetail", 
    {
        kode_unit_kerja : {
            type : DataTypes.STRING(16), 
            allowNull : false, 
            primaryKey : true,
        }, 
        tahun : {
            type : DataTypes.STRING(4), 
            allowNull : false, 
            primaryKey : true,
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true,
        },
        kode_status_barang : {
            type : DataTypes.STRING(2), 
            allowNull : true
        }, 
        kondisi_baik : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        }, 
        kondisi_rusak_ringan : {
            type : DataTypes.INTEGER(11),
            allowNull : true,
        }, 
        kebutuhan_pemeliharaan : {
            type : DataTypes.INTEGER(11), 
            allowNull : true,
        }, 
        keterangan : {
            type : DataTypes.TEXT(), 
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
        tableName : "ref_rkbmut_pemeliharaan_detail", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

RkbmutPemeliharaanHeader.hasMany(RkbmutPemeliharaanDetail, {
    foreignKey : "kode_unit_kerja"
})

RkbmutPemeliharaanHeader.hasMany(RkbmutPemeliharaanDetail, {
    foreignKey : "tahun"
})

RkbmutPemeliharaanDetail.belongsTo(RkbmutPemeliharaanHeader, {
    foreignKey : "kode_unit_kerja",
})

RkbmutPemeliharaanDetail.belongsTo(RkbmutPemeliharaanHeader, {
    foreignKey : "tahun",
})

module.exports = RkbmutPemeliharaanDetail;  