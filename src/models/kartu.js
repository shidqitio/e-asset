const {DataTypes}  = require("sequelize")
const db = require("../database")

const Kartu = db.define(
    "Kartu", 
    {
        kode_kartu : {
            type : DataTypes.STRING(2), 
            primaryKey : true, 
            allowNull : false, 
        }, 
        nama_kartu : {
            type : DataTypes.STRING(100), 
            allowNull : false,
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
        tableName : "ref_kartu", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

module.exports = Kartu;