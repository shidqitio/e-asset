const db = require("../database")
const {DataTypes} = require("sequelize")
const Pegawai = require("./pegawai");
const Bank = require("./bank");


const TrxBank = db.define(
    "TrxBank", 
    {
        kode_bank : {
            type : DataTypes.STRING(4),
            primaryKey : true, 
            allowNull : false,
        }, 
        nip : {
            type : DataTypes.STRING(20), 
            primaryKey : true, 
            allowNull : false,
        }, 
        no_rekening : {
            type : DataTypes.STRING(50), 
            primaryKey : true, 
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
        tableName : "trx_bank", 
        createdAt : "udcr", 
        updatedAt : "udch"
    },
);

Pegawai.hasMany(TrxBank, {
    primaryKey : "nip",
})

TrxBank.belongsTo(Pegawai, {
    primaryKey : "nip"
})

Bank.hasMany(TrxBank, {
    primaryKey : "kode_bank",
})

TrxBank.belongsTo(Bank, {
    primaryKey : "kode_bank"
})