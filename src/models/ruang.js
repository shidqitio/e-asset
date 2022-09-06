const {DataTypes} = require("sequelize")
const db = require("../config/database")

const Ruang = db.define(
    "Ruang", 
    {
        kode_ruang : {
            type : DataTypes.STRING(7), 
            primaryKey : true, 
            allowNull : false,
        }, 
        nip : {
            type : DataTypes.STRING(20),
            allowNull : true,
        }, 
        nama_pj : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        kode_unit : {
            type : DataTypes.STRING(16), 
            allowNull : true,
        }, 
        nama_unit : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        nama_ruang : {
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
        tableName : "ref_ruang", 
        createdAt : "udcr", 
        updatedAt : "udch",
    },
);

module.exports = Ruang ;