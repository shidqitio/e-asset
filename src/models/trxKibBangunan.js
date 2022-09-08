const db = require("../config/database")
const {DataTypes} = require("sequelize")
const Asset = require("./asset")
const Pembukuan = require("./pembukuan")
const TrxKibTanah = require("./trxKibTanah")
// const TrxKibTanah = require("./trxKibTanah")

const TrxKibBangunan = db.define(
    "TrxKibBangunan", 
    {
        kode_status_pemilik : {
            type : DataTypes.STRING(2),
            allowNull : true
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : true
        }, 
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            allowNull : false, 
            primaryKey : true
        }, 
        no_asset : {
            type : DataTypes.INTEGER(11),
            allowNull : false, 
            primaryKey : true
        }, 
        no_kib_bangunan : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        } ,
        nup : {
            type : DataTypes.STRING(50),
            allowNull : true
        }, 
        luas_bangunan : {
            type : DataTypes.DECIMAL(12,2),
            allowNull : true
        }, 
        luas_dasar_bangunan : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        }, 
        jumlah_lantai : {
            type : DataTypes.INTEGER(11), 
            allowNull : true
        }, 
        type : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        tahun_bangun : {
            type : DataTypes.STRING(4), 
            allowNull : true
        }, 
        tahun_guna : {
            type : DataTypes.STRING(4), 
            allowNull : true,
        }, 
        pdf : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        lokasi_bangunan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        nup_tanah : {
            type : DataTypes.INTEGER(11), 
            allowNull : true
        },
        kode_unit : {
            type : DataTypes.STRING(20), 
            allowNull : true
        }, 
        nama_unit : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        sumber_dana : {
            type : DataTypes.ENUM("APBN", "NON APBN"),
            allowNull : false
        }, 
        no_dana : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        tanggal_dana : {
            type : DataTypes.DATE(), 
            allowNull : true
        }, 
        nilai_wajar : {
            type : DataTypes.DECIMAL(20,2),
            allowNull : true
        }, 
        njop : {
            type : DataTypes.DECIMAL(20,2), 
            allowNull : true
        }, 
        catatan : {
            type : DataTypes.TEXT(),
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
            type: DataTypes.DATE(),
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE(),
            allowNull: true,
          },
    }, 
    {
        tableName : "trx_kib_bangunan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)


// TrxKibTanah.hasMany (TrxKibBangunan, {
//     foreignKey : "no_asset_tanah"
// })

// TrxKibBangunan.belongsTo(TrxKibTanah, {
//     foreignKey : "kode_asset"
// })

// TrxKibBangunan.belongsTo(TrxKibTanah, {
//     foreignKey : "no_asset"
// })

// TrxKibBangunan.belongsTo(TrxKibTanah, {
//     foreignKey : "no_kib_tanah"
// })

TrxKibTanah.hasMany(TrxKibBangunan, {
    foreignKey : "nup"
})

TrxKibBangunan.belongsTo(TrxKibTanah, {
    foreignKey : "nup_tanah"
})

Pembukuan.hasMany(TrxKibBangunan, {
    foreignKey : "kode_pembukuan"
})

TrxKibBangunan.belongsTo(Pembukuan, {
    foreignKey : "kode_pembukuan"
})



Asset.hasMany(TrxKibBangunan, {
    foreignKey : "kode_asset"
})

TrxKibBangunan.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

module.exports = TrxKibBangunan