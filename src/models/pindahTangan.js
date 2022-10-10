const {DataTypes} = require("sequelize")
const db = require("../config/database")

const PindahTangan = db.define(
    "PindahTangan", 
    {
        kode_pindah_tangan : {
            type : DataTypes.STRING(1),
            primaryKey : true, 
            allowNull : false
        }, 
        nama_pindah_tangan : {
            type : DataTypes.STRING(255), 
            primaryKey : false, 
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
        tableName : 'ref_pindah_tangan', 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = PindahTangan