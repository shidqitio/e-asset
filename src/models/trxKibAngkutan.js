const db = require("../config/database")

const Asset = require("./asset")
const StatusPemilik = require("./statusPemilik")
const Pembukuan = require("./pembukuan")

const {DataTypes} = require("sequelize")

const TrxKibAngkutan = db.define(
    "TrxKibAngkutan", 
    {
        kode_status_pemilik : {
            type : DataTypes.STRING(2),
            allowNull : true,
        },
        kode_asset : {
            type : DataTypes.STRING(16), 
            allowNull : true
        }, 
      
        no_asset  : {
            type : DataTypes.INTEGER(11), 
            primaryKey : true, 
            allowNull : false
        }, 
        nup : {
            type : DataTypes.STRING(50),
            allowNull : true
        }, 
        no_kib_angkutan : {
            type : DataTypes.INTEGER(),
            allowNull : true
        },
        kode_pembukuan : {
            type : DataTypes.STRING(9), 
            primaryKey : true, 
            allowNull : false,
        }, 
        tahun_pembuatan : {
            type : DataTypes.STRING(4), 
            allowNull : true,
        }, 
        pabrik : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        negara : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        perakitan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        daya_muat : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        bobot : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        daya_mesin : {
            type : DataTypes.STRING(255), 
            allowNull : true 
        }, 
        mesin_penggerak : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        jumlah_mesin : {
            type : DataTypes.INTEGER(11), 
            allowNull : true
        },
        bahan_bakar : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        no_mesin : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        no_rangka : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        no_bpkb : {
            type : DataTypes.STRING(255),
            allowNull :true
        },
        no_polisi : {
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
            type : DataTypes.STRING(16),
            allowNull : true
        },
        nama_unit : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        sumber_dana : {
            type : DataTypes.ENUM("APBN", "NON APBN"),
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
            type: DataTypes.DATE(),
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE(),
            allowNull: true,
          },
    }, 
    {
        tableName : "trx_kib_angkutan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

Asset.hasMany(TrxKibAngkutan,{
    foreignKey : "kode_asset"
})

TrxKibAngkutan.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

StatusPemilik.hasMany(TrxKibAngkutan, {
    foreignKey : "kode_status_pemilik"
})

TrxKibAngkutan.belongsTo(StatusPemilik, {
    foreignKey : "kode_status_pemilik"
})

Pembukuan.hasMany(TrxKibAngkutan, {
    foreignKey : "kode_pembukuan"
})

TrxKibAngkutan.belongsTo(Pembukuan, {
    foreignKey :"kode_pembukuan"
})

module.exports = TrxKibAngkutan