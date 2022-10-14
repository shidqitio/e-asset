const db = require("../database/index")
const RefTugasAnjab = require("./refTugasAnjab")
const {DataTypes} = require("sequelize")

const RefTugasSubAnjab = db.define(
    "RefTugasSubAnjab", 
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
        kode_tugas : {
            type : DataTypes.STRING(4), 
            allowNull : false,
        },
        kode_tugas_sub : {
            type : DataTypes.STRING(7), 
            allowNull : false, 
            primaryKey: true
        },
        nama_tugas_sub : {
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
        tableName : "ref_tugas_sub_anjab", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)


RefTugasAnjab.hasMany(RefTugasSubAnjab, {
    foreignKey : "kode_tugas"
})

RefTugasSubAnjab.belongsTo(RefTugasAnjab, {
    foreignKey : "kode_tugas"
})

module.exports = RefTugasSubAnjab