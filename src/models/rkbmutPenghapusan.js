 const db = require("../config/database")
 const Aset = require("./asset")
const {DataTypes} = require("sequelize")


const RkbmutPenghapusan = db.define(
    "RkbmutPenghapusan", 
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
        nup : {
            type : DataTypes.STRING(50), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_asset : {
            type : DataTypes.STRING(50), 
            allowNull : false, 
            primaryKey : true
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
        nama_unit_kerja : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        merk : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        kondisi : {
            type : DataTypes.STRING(100), 
            allowNull : true
        }, 
        tahun_perolehan : {
            type : DataTypes.STRING(4), 
            allowNull : true
        }, 
        alasan : {
            type : DataTypes.TEXT(), 
            allowNull: true
        }, 
        nilai_perolehan : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        }, 
        foto : {
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
        tableName : "ref_rkbmut_penghapusan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)


Aset.hasMany(RkbmutPenghapusan, {
    foreignKey : "kode_asset"
})

RkbmutPenghapusan.belongsTo(Aset, {
    foreignKey : "kode_asset"
})
 
module.exports = RkbmutPenghapusan