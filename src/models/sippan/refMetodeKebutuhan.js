const db = require("../../config/database")
const {DataTypes, ENUM} = require("sequelize")

//Kebutuhan Relasi
const Asset = require("../asset")
const RkbmutPengadaanHeader = require("../rkbmutPengadaanHeader")
const RkbmutPengadaanDetail = require("../rkbmutPengadaanDetail")

const RefMetodeKebutuhan = db.define(
    "RefMetodeKebutuhan", 
    {
        kode_kegiatan_rkt : {
            type : DataTypes.INTEGER(),
            allowNull : false, 
            primaryKey : true
        },
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true
        }, 
        nama_rup : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        jenis_pengadaan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        metode_pengadaan : {
            type : DataTypes.ENUM('swakelola','penyedia'),
            allowNull : true
        },
        type : {
            type : DataTypes.STRING(50), 
            allowNull : true
        },
        lokasi : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        uraian_pekerjaan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        spesifikasi : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        volume : {
            type : DataTypes.INTEGER(11), 
            allowNull : true
        },
        satuan : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        produksi_dalam_negeri : {
            type : DataTypes.ENUM('iya','tidak'),
            allowNull : true
        }, 
        usaha : {
            type : DataTypes.ENUM('kecil','non kecil'),
            allowNull : true
        },
        sumber_dana : {
            type : DataTypes.ENUM ('pnbp','rm'),
            allowNull : true
        },
        pilih_penyedia_mulai : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        pilih_penyedia_selesai : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        pelaksanaan_kontrak_mulai : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        pelaksanaan_kontrak_selesai : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        rencana_pemanfaatan_mulai : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        rencana_pemanfaatan_selesai : {
            type : DataTypes.DATE(),
            allowNull : true
        },
        upload_file : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        rup : {
            type : DataTypes.STRING(30),
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
        tableName : "ref_metode_kebutuhan", 
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

RkbmutPengadaanHeader.hasOne(RefMetodeKebutuhan,{
    foreignKey : "kode_kegiatan_rkt"
})

RefMetodeKebutuhan.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt"
})



Asset.hasMany(RefMetodeKebutuhan, {
    foreignKey : "kode_asset", 
})

RefMetodeKebutuhan.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

RkbmutPengadaanDetail.hasMany(RefMetodeKebutuhan, {
    foreignKey : "kode_asset",
    
})

RefMetodeKebutuhan.belongsTo(RkbmutPengadaanDetail, {
    foreignKey : "kode_asset", 
   
})

module.exports = RefMetodeKebutuhan