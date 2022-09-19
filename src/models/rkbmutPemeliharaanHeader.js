const db = require("../config/database")
const {DataTypes} = require("sequelize")

const RkbmutPemeliharaanHeader = db.define(
    "RkbmutPemeliharaanHeader", 
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
        nama_unit_kerja : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        jenis_belanja : {
            type : DataTypes.STRING(6), 
            allowNull : false,
            primaryKey : true
        }, 
        nama_jenis_belanja : {
            type : DataTypes.STRING(255),
            allowNull : true 
        }, 
        status_paraf : {
            type : DataTypes.INTEGER(), 
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
        tableName : "ref_rkbmut_pemeliharaan_header", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RkbmutPemeliharaanHeader