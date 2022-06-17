const {DataTypes} = require("sequelize");
const db = require("../database")

const IhtisarJabatan = db.define(
    "IhtisarJabatan", 
    {
        kode_jabatan_unit_kerja : {
            type : DataTypes.STRING(25), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_unit_kerja : {
            type: DataTypes.STRING(25), 
            allowNull : false,
            primaryKey : true
        }, 
        ihtisar : {
            type : DataTypes.TEXT(), 
            allowNull : false, 
        }, 
        status : {
            type : DataTypes.STRING(1), 
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
        tableName : "ref_ihtisar_jabatan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)


module.exports = IhtisarJabatan;