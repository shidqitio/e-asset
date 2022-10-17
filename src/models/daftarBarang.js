const db = require("../config/database")
const PembukuanDetail = require("./pembukuan")
const Ruang = require("./ruang")
const {DataTypes} = require("sequelize")

const DaftarBarang = db.define(
    "DaftarBarang", 
    {
        kode_barang : {
            type : DataTypes.INTEGER(11), 
            allowNull : false, 
            primaryKey : true,
        }, 
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            primaryKey : true, 
            allowNull : false,
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            primaryKey : true, 
            allowNull : false
        },
        kode_asset_nup : {
            type : DataTypes.INTEGER(), 
            allowNull :true
        },
        nup : {
            type : DataTypes.STRING(50), 
            allowNull : true
        },
        merk : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        tanggal_perolehan : {
            type : DataTypes.DATE(), 
            allowNull : true
        },
        kode_ruang : {
            type : DataTypes.STRING(7), 
            allowNull : false, 
        }, 
        nilai_item : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        },
        deskripsi : {
            type : DataTypes.STRING(255), 
            allowNull : false,
        }, 
        kondisi : {
            type : DataTypes.ENUM("Baik", "Rusak Ringan", "Rusak Berat"),
            allowNull : false,
        }, 
        optional_key : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        qr_kode : {
            type : DataTypes.STRING(255), 
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
        tableName : "ref_daftar_barang", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

PembukuanDetail.hasMany(DaftarBarang, {
    foreignKey : "kode_pembukuan",
})

DaftarBarang.belongsTo(PembukuanDetail, {
    foreignKey : "kode_pembukuan"
})

Ruang.hasMany(DaftarBarang, {
    foreignKey : "kode_ruang"
})

DaftarBarang.belongsTo(Ruang, {
    foreignKey : "kode_ruang"
})

module.exports = DaftarBarang