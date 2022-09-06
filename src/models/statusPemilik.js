const {DataTypes} = require("sequelize")
const db = require("../config/database")

const StatusPemilik = db.define(
    "StatusPemilik", 
    {
        kode_status_pemilik : {
          type : DataTypes.STRING(2), 
          primaryKey : true, 
          allowNull : false,
        },
        nama_status_pemilik : {
            type : DataTypes.STRING(3),
            allowNull: true
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
        tableName : "ref_status_pemilik", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

module.exports = StatusPemilik