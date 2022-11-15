const db = require("../config/database")
const {DataTypes} = require("sequelize")

const BentukPemanfaatan = db.define(
    "BentukPemanfaatan", 
    {
        kode_bentuk_pemanfaatan : {
            type : DataTypes.STRING(1), 
            primaryKey : true, 
            allowNull : false, 
        }, 
        nama_bentuk_pemanfaatan : {
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
        tableName : "ref_bentuk_pemanfaatan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = BentukPemanfaatan