const db = require("../config/database")
const Asset = require("./asset")
const DokumenTanah = require("./dokumenTanah")
const StatusPemilik = require("./statusPemilik")
const {DataTypes} = require("sequelize")
const Pembukuan = require("./pembukuan")

const TrxKibTanah = db.define(
    "TrxKibTanah", 
    {
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull :true,
        }, 
        kode_status_pemilik : {
            type : DataTypes.STRING(2), 
            allowNull : true,
        }, 
        kode_dokumen : {
            type : DataTypes.STRING(50), 
            allowNull : true
        }, 
        no_asset : {
            type : DataTypes.INTEGER, 
            allowNull : false, 
            primaryKey : true,
        }, 
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            primaryKey : true, 
            allowNull : false,
        }, 
        no_kib_tanah : {
            type : DataTypes.INTEGER(),
            allowNull : true
        },
        nup : {
            type : DataTypes.STRING(50),
            allowNull : true
        }, 
        kode_unit : {
            type : DataTypes.STRING(16), 
            allowNull : true,
        }, 
        nama_unit : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        alamat : {
            type : DataTypes.TEXT(), 
            allowNull : true,
        }, 
        longitude : {
            type : DataTypes.STRING(255),
            allowNull : true,
        }, 
        latitude : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        tanah_bangunan : {
            type : DataTypes.DECIMAL(12,0), 
            allowNull : true
        },
        tanah_sarana : {
            type : DataTypes.DECIMAL(12,0), 
            allowNull :true,
        }, 
        tanah_kosong : {
            type : DataTypes.DECIMAL(12,0), 
            allowNull : true,
        }, 
        tanah_seluruh : {
            type : DataTypes.DECIMAL(12,0), 
            allowNull : true,
        }, 
        batas_utara : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        batas_timur : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        batas_barat : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        batas_selatan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        
        tanggal_dokumen : {
            type : DataTypes.DATE(), 
            allowNull : true
        }, 
        instansi_penerbit : {
            type : DataTypes.STRING(50),
            allowNull : true,
        },
        dana : {
            type : DataTypes.ENUM("APBN", "NON APBN"),
            allowNull : false,
        },
        no_dana : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        tanggal_dana : {
            type : DataTypes.DATE(), 
            allowNull : true
        },
        harga_taksiran_satuan : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true,
        }, 
        harga_taksiran_total : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true,
        }, 
        harga_njop_satuan : {
            type : DataTypes.DECIMAL(12,2), 
            allowNull : true
        }, 
        harga_njop_total : {
            type : DataTypes.DECIMAL(12,2), 
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
            type: DataTypes.DATE,
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }, 
    {
        tableName : "trx_kib_tanah", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

Asset.hasMany(TrxKibTanah, {
    foreignKey : "kode_asset"
})

TrxKibTanah.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

Pembukuan.hasMany(TrxKibTanah, {
    foreignKey : "kode_pembukuan"
})

TrxKibTanah.belongsTo(Pembukuan, {
    foreignKey :"kode_pembukuan"
})

DokumenTanah.hasMany(TrxKibTanah, {
    foreignKey : "kode_dokumen"
})

TrxKibTanah.belongsTo(DokumenTanah, {
    foreignKey : "kode_dokumen"
})

StatusPemilik.hasMany(TrxKibTanah, {
    foreignKey : "kode_status_pemilik"
})

TrxKibTanah.belongsTo(StatusPemilik, {
    foreignKey : "kode_status_pemilik"
})

module.exports = TrxKibTanah;