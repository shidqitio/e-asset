const {DataTypes} = require("sequelize")
const db = require("../database");


const TrxUnitKerja = db.define(
    "TrxUnitKerja", 
    {
        kode_unit : {
            type : DataTypes.STRING(16), 
            allowNull : true,
        }, 
        kode_unit_kerja : {
            type : DataTypes.STRING(25), 
            primaryKey : true, 
            allowNull : false,
        }, 
        nama_unit_kerja : {
            type : DataTypes.STRING(), 
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
        tableName : "trx_unit_kerja", 
        createdAt : "udcr", 
        updatedAt : "udch",
    },
)

module.exports = TrxUnitKerja;
