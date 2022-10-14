const db = require("../database/index")
const {DataTypes} = require("sequelize")

const RefTugasAnjab = db.define(
    "RefTugasAnjab", 
    {
        kode_tugas : {
            type : DataTypes.STRING(4), 
            allowNull : false,
            primaryKey : true
        },
        kode_unit : {
            type : DataTypes.STRING(16), 
            primaryKey : true, 
            allowNull : false
        }, 
        kode_jabatan_struktural : {
            type : DataTypes.STRING(25), 
            primaryKey : true, 
            allowNull : false
        },
        nama_tugas : {
            type : DataTypes.STRING(255),
            allowNull : true 
        }, 
        status : {
            type : DataTypes.ENUM("pokok", "tambahan"),
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
            type: DataTypes.DATE(),
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE(),
            allowNull: true,
          },
    }, 
    {
        tableName : "ref_tugas_anjab", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RefTugasAnjab