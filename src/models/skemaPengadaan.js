const db = require("../config/database")
const {DataTypes} = require("sequelize")

const SkemaPengadaan = db.define(
    "SkemaPengadaan", 
    {
        kode_skema_pengadaan : {
            type : DataTypes.STRING(1),
            allowNull : false, 
            primaryKey : true
        }, 
        nama_skema_pengadaan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        keterangan : {
            type : DataTypes.TEXT(), 
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
        tableName : "ref_skema_pengadaan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = SkemaPengadaan;

