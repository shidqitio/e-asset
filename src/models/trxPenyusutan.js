const db = require("../config/database")
const {DataTypes} = require("sequelize")


const TrxPenyusutan = db.define(
    "TrxPenyusutan", 
    {
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_barang : {
            type : DataTypes.INTEGER(11),
            allowNull : false, 
            primaryKey : true
        },
        nilai_item : {
            type : DataTypes.DECIMAL(12,2),
            allowNull : true
        }, 
        tanggal_penyusutan : {
            type : DataTypes.DATE(), 
            allowNull : true
        }, 
        angka_penyusutan : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        }, 
        penyusutan_ke : {
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
        tableName : "trx_penyusutan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = TrxPenyusutan