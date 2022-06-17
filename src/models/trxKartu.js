const {DataTypes} = require("sequelize");
const db = require("../database");
const Pegawai = require("./pegawai");
const Kartu = require("./kartu")

const TrxKartu = db.define(
    "TrxKartu", 
    {
        nip : {
            type : DataTypes.STRING(20), 
            primaryKey : true, 
            allowNull : false,
        }, 
        kode_kartu : {
            type : DataTypes.STRING(2), 
            primaryKey : true ,
            allowNull : false,
        }, 
        nomor_kartu : {
            type : DataTypes.STRING(20), 
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
        tableName : "trx_kartu", 
        createdAt : "udcr", 
        updatedAt : "udch",
    },
)

Pegawai.hasMany(TrxKartu, {
    foreignKey : "nip",
})

TrxKartu.belongsTo(Pegawai, {
    foreignKey : "nip",
})

Kartu.hasMany(TrxKartu, {
    foreignKey : "kode_kartu",
})

TrxKartu.belongsTo(Kartu, {
    foreignKey : "kode_kartu",
});

module.exports = TrxKartu;