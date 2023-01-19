const db = require("../config/database")
const {DataTypes} = require("sequelize")
const DaftarBarang = require("../models/daftarBarang")


const TrxPenyusutan = db.define(
    "TrxPenyusutan", 
    {
        kode_penyusutan : {
            type : DataTypes.INTEGER(11), 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true
        },
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            allowNull : false, 
            references : {
                model : DaftarBarang, 
                key : "kode_pembukuan"
            }
        }, 
        kode_barang : {
            type : DataTypes.INTEGER(11),
            allowNull : false, 
            references : {
                model : DaftarBarang, 
                key : "kode_barang"
            }
        },
        nilai_susut : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true,
        },
        nilai_item : {
            type : DataTypes.DECIMAL(12,2),
            allowNull : true
        }, 
        tanggal_penyusutan : {
            type : DataTypes.DATE(), 
            allowNull : true
        }, 
        angka_penyusutan : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        }, 
        penyusutan_ke : {
            type : DataTypes.INTEGER(), 
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
            type: DataTypes.DATE,
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    },
    {
        tableName : "trx_penyusutan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

DaftarBarang.hasMany(TrxPenyusutan, {
    foreignKey : "kode_barang",
    as : "trxpenyusutan"
})

TrxPenyusutan.belongsTo(DaftarBarang, {
    foreignKey : "kode_barang",
    as : "daftarbarang"
})

// TrxPenyusutan.belongsTo(DaftarBarang, {
//     foreignKey : "kode_pembukuan"
// })

module.exports = TrxPenyusutan