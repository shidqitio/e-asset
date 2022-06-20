const {DataTypes} = require("sequelize");
const db = require("../database")

const Kelas = db.define(
    "Kelas", 
    {
        kelas : {
            type : DataTypes.STRING(2), 
            primaryKey : true, 
            allowNull : false
        }, 
        keterangan : {
            type : DataTypes.STRING(255),
            allowNull : true, 
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
        tableName : "ref_kelas", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = Kelas ;