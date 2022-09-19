const db = require("../config/database")
const {DataTypes} = require('sequelize')
const { STRING } = require("sequelize")

const RkbmutPemindahtanganan = db.define(
    "RkbmutPemindahtangan", 
    {
        tahun : {
            type : DataTypes.STRING(4), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_unit_kerja : {
            type : DataTypes.STRING(16), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true
        }, 
        nup : {
            type : DataTypes.STRING(50), 
            allowNull : false, 
            primaryKey : true
        }, 
        merk :{
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        umur_ekonomis : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        }, 
        tahun_perolehan : {
            type : DataTypes.DATE(), 
            allowNull : true
        }, 
        kondisi : {
            type : DataTypes.STRING(50), 
            allowNull : true
        },
        nilai_perolehan : {
            type : DataTypes.DECIMAL(20,2), 
            allowNull : true
        }, 
        kode_pindah_tangan : {
            type : DataTypes.STRING(1), 
            allowNull : true
        }, 
        alasan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        status_revisi : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        }, 
        revisi_ke : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        }, 
        status_paraf :{
            type : DataTypes.INTEGER(), 
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
        tableName : "ref_rkbmut_pemindahtanganan",
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RkbmutPemindahtanganan