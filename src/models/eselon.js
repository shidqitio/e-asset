const {DataTypes} = require("sequelize")
const db = require("../database");

const Eselon = db.define(
    "Eselon", 
    {
        kode_eselon : {
            type : DataTypes.STRING(1),
            primaryKey : true, 
            allowNull : false, 
        }, 
        nama_eselon : {
            type : DataTypes.STRING(100),
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
        tableName : "ref_eselon", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
);

module.exports = Eselon;