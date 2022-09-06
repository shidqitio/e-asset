const {DataTypes} = require("sequelize")
const db = require("../config/database")

const JenisTrn = db.define(
    "JenisTrn", 
    {
        no_sppa : {
          type : DataTypes.STRING(5), 
          primaryKey : true, 
          allowNull : false,
        },
        kode_trn : {
            type : DataTypes.STRING(3),
            primaryKey : true, 
            allowNull : false,
        }, 
        jenis_trn : {
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
        tableName : "ref_jenis_trn", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

module.exports = JenisTrn