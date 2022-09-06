const db = require('../config/database')
const{DataTypes} = require("sequelize")
const Asset = require('./asset')

const Pembukuan = db.define(
    "Pembukuan", 
    {
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false
        }, 
        no_sppa : {
            type : DataTypes.STRING(5), 
            allowNull : false,
        }, 
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            primaryKey : true, 
            allowNull : false,
        }, 
        jumlah_barang : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
        }, 
        asal_perolehan : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        no_bukti_perolehan : {
            type : DataTypes.STRING(255),
            allowNull : true,
        }, 
        tanggal_perolehan : {
            type : DataTypes.DATE(), 
            allowNull : true
        },
        tanggal_pembukuan : {
            type : DataTypes.DATE(), 
            allowNull : true
        },
        keterangan : {
            type : DataTypes.STRING(255),
            allowNull : true,
        },
        merk : {
            type: DataTypes.STRING(255),
            allowNull : true,
        }, 
        nilai_item : {
            type : DataTypes.DECIMAL(12,2),
            allowNull :true,
        },
        total_nilai : {
            type : DataTypes.DECIMAL(20,2),
            allowNull :true,
        },  
        dasar_harga : {
            type : DataTypes.ENUM("Perolehan","Taksiran"),
            allowNull : true,
        }, 
        metode_penyusutan : {
            type: DataTypes.ENUM("Straight Line","Double Decline", ""),
            allowNull : true 
        },
        catat : {
            type: DataTypes.ENUM("DBR","DBL","KIB"),
            allowNull : true 
        }, 
        pdf :{
            type : DataTypes.STRING(255),
            allowNull :true,
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
        tableName : "ref_pembukuan",
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

Asset.hasMany(Pembukuan, {
    foreignKey : "kode_asset"
})

Pembukuan.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = Pembukuan 