const {DataTypes} = require("sequelize")
const db = require("../database")
const Kelas = require("./kelas")

const SubKelas = db.define(
    "SubKelas", 
    {
        kode_kelas : {
            type : DataTypes.STRING(2), 
            allowNull : false,
        }, 
        kode_sub_kelas : {
            type : DataTypes.STRING(4), 
            primaryKey : true, 
            allowNull : false,
        }, 
        gaji : {
            type : DataTypes.DECIMAL(20,6), 
            allowNull : true,
        }, 
        tunjangan : {
            type : DataTypes.DECIMAL(20,6), 
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
        tableName : "ref_sub_kelas", 
        createdAt : "udcr", 
        updatedAt : "udch",
    },
)

Kelas.hasMany(SubKelas, {
    foreignKey : "kode_kelas",
})

SubKelas.belongsTo(Kelas, {
    foreignKey : "kode_kelas",
})

module.exports = SubKelas;