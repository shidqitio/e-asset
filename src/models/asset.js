const {DataTypes} = require("sequelize")
const db = require("../config/database")

const Asset = db.define(
    "Asset",
    {
        kode_asset : {
            type : DataTypes.STRING(10),
            primaryKey : true, 
            allowNull : false,
        }, 
        nama_asset : {
            type : DataTypes.STRING(255), 
            primaryKey : true, 
            allowNull : false,
        }, 
        kode_bidang : {
          type : DataTypes.STRING(3), 
          allowNull : true
        }, 
        kode_kartu : {
          type : DataTypes.STRING(1), 
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
        tableName : "ref_asset", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = Asset