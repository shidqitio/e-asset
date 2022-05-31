const { DataTypes } = require("sequelize");
const db = require("../database");

const Bank = db.define(
    "Bank", 
    {
        kode_bank : {
            type: DataTypes.STRING(3), 
            primaryKey : true, 
            allowNull : false,
        }, 
        nama_bank : {
            type : DataTypes.STRING(50), 
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
        tableName : "ref_bank", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
);

module.exports = Bank ;