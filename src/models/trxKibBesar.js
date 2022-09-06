const db = require("../config/database")

const Asset = require("./asset")
const StatusPemilik = require("./statusPemilik")
const Pembukuan = require("./pembukuan")
const {DataTypes} = require("sequelize")

const TrxKibAlatbesar = db.define(
    "TrxKibBesar", 
    {
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : true
        }, 
        nup : {
            type : DataTypes.STRING(50),
            allowNull : true
        }, 
        no_asset : {
            type : DataTypes.INTEGER(), 
            allowNull : false, 
            primaryKey : true
        }, 
        kode_pembukuan : {
            type : DataTypes.STRING(9),
            allowNull  :false, 
            primaryKey : true
        }, 
        no_kib_alatbesar : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        },
        kode_status_pemilik : {
            type : DataTypes.STRING(2), 
            allowNull : true
        }, 
        tahun_pembuatan : {
            type : DataTypes.STRING(4), 
            allowNull : true
        }, 
        merk : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        pabrik : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        perakitan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        kapasitas : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        sistem_pendinginan : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        dudukan_peralatan : {
            type : DataTypes.STRING(50), 
            allowNull : true
        }, 
        no_mesin : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        type : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        negara : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        sistem_operasi : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        sistem_pembakar : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        power_train : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        perlengkapan1 : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        perlengkapan2 : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        perlengkapan3 : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        kode_unit : {
            type : DataTypes.STRING(20), 
            allowNull : true,
        }, 
        nama_unit : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        sumber_dana : {
            type : DataTypes.ENUM("APBN", "NON APBN"),
            allowNull : true
        },
        no_dana : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        tanggal_dana : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        harga_wajar : {
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
        tableName : "trx_kib_alatbesar", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

Asset.hasMany(TrxKibAlatbesar, {
    foreignKey : "kode_asset"
})

TrxKibAlatbesar.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

StatusPemilik.hasMany(TrxKibAlatbesar, {
    foreignKey : "kode_status_pemilik"
})

TrxKibAlatbesar.belongsTo(StatusPemilik, {
    foreignKey : "kode_status_pemilik"
})

Pembukuan.hasMany(TrxKibAlatbesar, {
    foreignKey : "kode_pembukuan"
})

TrxKibAlatbesar.belongsTo(Pembukuan, {
    foreignKey :"kode_pembukuan"
})

module.exports = TrxKibAlatbesar