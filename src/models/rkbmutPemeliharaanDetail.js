const db = require("../config/database")
const RkbmutPemeliharaanHeader = require("./rkbmutPemeliharaanHeader")
const Aset = require("./asset")
const {DataTypes} = require('sequelize')

const RkbmutPemeliharaanDetail = db.define(
    "RkbmutPemeliharaanDetail", 
    {
        kode_unit_kerja : {
            type : DataTypes.STRING(16), 
            allowNull : false, 
            primaryKey : true,
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true,
        },
        kode_status_pemilik : {
            type : DataTypes.STRING(2), 
            allowNull : true
        }, 
        tahun : {
            type : DataTypes.STRING(4), 
            allowNull : false, 
            primaryKey : true
        },
        revisi_ke : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        },
        status_paraf : {
            type : DataTypes.INTEGER(),
            allowNull : true
        },
        status_revisi : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        },
        jenis_belanja : {
            type : DataTypes.STRING(6), 
            allowNull : false, 
            primaryKey : true
        },
        kondisi_baik : {
            type : DataTypes.INTEGER(11),
            allowNull : true
        }, 
        kondisi_rusak_ringan : {
            type : DataTypes.INTEGER(11),
            allowNull : true,
        }, 
        kebutuhan_pemeliharaan : {
            type : DataTypes.INTEGER(11), 
            allowNull : true,
        }, 
        keterangan : {
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
        tableName : "ref_rkbmut_pemeliharaan_detail", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

RkbmutPemeliharaanHeader.hasMany(RkbmutPemeliharaanDetail, {
    foreignKey : "kode_unit_kerja"
})

RkbmutPemeliharaanDetail.belongsTo(RkbmutPemeliharaanHeader, {
    foreignKey : "kode_unit_kerja"
})

Aset.hasMany(RkbmutPemeliharaanDetail, {
    foreignKey : "kode_asset"
})

RkbmutPemeliharaanDetail.belongsTo(Aset, {
    foreignKey : "kode_asset"
})


module.exports = RkbmutPemeliharaanDetail;  