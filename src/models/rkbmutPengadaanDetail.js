const db = require("../config/database")
const RkbmutPengadaanHeader = require("./rkbmutPengadaanHeader")
const Asset = require("./asset")
const SkemaPengadaan = require("./skemaPengadaan")
const {DataTypes} = require("sequelize")

const RkbmutPengadaanDetail = db.define(
    "RkbmutPengadaanDetail", 
    {
        
        kode_kegiatan_rkt : {
            type : DataTypes.INTEGER(11),
            allowNull : false, 
            primaryKey : true
        }, 
        kode_skema_pengadaan : {
            type : DataTypes.STRING(10),
            allowNull : true, 
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true,
        }, 
       
        kode_unit_kerja : {
            type : DataTypes.STRING(16), 
            allowNull : false, 
            primaryKey : true,
        },
        status_paraf : {
            type : DataTypes.INTEGER(),
            allowNull : true,
        },
        revisi_ke : {
            type : DataTypes.INTEGER(), 
            allowNull : false, 
            primaryKey : true
        },
        status_revisi : {
            type : DataTypes.INTEGER(),
            allowNull : true
        },
        kuantitas : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        sbsk : {
            type : DataTypes.INTEGER(11), 
            allowNull : true,
        }, 
        existing_bmut : {
            type : DataTypes.INTEGER(11), 
            allowNull : true,
        }, 
        kebutuhan_riil : {
            type : DataTypes.INTEGER(11), 
            allowNull : true,
        }, 
        keterangan : {
            type : DataTypes.TEXT(),
            allowNull : true,
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
        tableName : "ref_rkbmut_pengadaan_detail", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

//JOINS

//JOIN Header to Detail
RkbmutPengadaanHeader.hasMany(RkbmutPengadaanDetail, {
    foreignKey : "kode_kegiatan_rkt"
})

RkbmutPengadaanDetail.belongsTo(RkbmutPengadaanHeader, {
    foreignKey : "kode_kegiatan_rkt", 
})


// RkbmutPengadaanHeader.hasMany(RkbmutPengadaanDetail, {
//     foreignKey : "kode_unit_kerja", 
 
// })


// RkbmutPengadaanDetail.belongsTo(RkbmutPengadaanHeader, {
//     foreignKey : "kode_unit_kerja", 

// })




//JOIN Detail To Asset
Asset.hasMany(RkbmutPengadaanDetail, {
    foreignKey : "kode_asset"
})

RkbmutPengadaanDetail.belongsTo(Asset, {
    foreignKey : "kode_asset"
})

//Skema Pengadaan 
SkemaPengadaan.hasMany(RkbmutPengadaanDetail, {
    foreignKey : "kode_skema_pengadaan"
})

RkbmutPengadaanDetail.belongsTo(SkemaPengadaan, {
    foreignKey : "kode_skema_pengadaan"
})

module.exports = RkbmutPengadaanDetail