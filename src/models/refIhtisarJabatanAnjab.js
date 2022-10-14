const {DataTypes} = require("sequelize")
const db = require("../database/index")


const RefIhtisarJabatanAnjab = db.define(
    "RefIhtisarJabatanAnjab", 
    {
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
        nama_ihtisar_jabatan : {
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
            type: DataTypes.DATE(),
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE(),
            allowNull: true,
          },
    }, 
    {
        tableName : "ref_ihtisar_jabatan_anjab",
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RefIhtisarJabatanAnjab