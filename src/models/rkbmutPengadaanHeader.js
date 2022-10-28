const db = require("../config/database")
const {DataTypes} = require("sequelize")

const RkbmutPengadaanHeader = db.define(
    "RkbmutPengadaanHeader",
    {
        kode_kegiatan_rkt : {
            type : DataTypes.INTEGER(11),
            allowNull : false, 
            primaryKey : true
        }, 
        kode_unit_kerja : {
            type : DataTypes.STRING(16), 
            allowNull : false, 
            primaryKey : true
        }, 
        tahun : {
            type : DataTypes.STRING(4),
            allowNull : false, 
            primaryKey : true,
        }, 
        status_revisi : {
            type : DataTypes.INTEGER(11), 
            allowNull : false, 
            primaryKey : true
        },
        status_paraf : {
            type : DataTypes.INTEGER(11), 
            allowNull : true
        },
        revisi_ke : {
            type : DataTypes.INTEGER(11), 
            allowNull : false, 
            primaryKey : true
        },
        nama_unit_kerja : {
            type : DataTypes.STRING(255), 
            allowNull : false
        }, 
        kode_program_rsb : {
            type : DataTypes.STRING(20), 
            allowNull : true
        }, 
        nama_program_rsb : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
      
        nama_kegiatan_rkt : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        kode_jenis_belanja : {
            type : DataTypes.STRING(7), 
            allowNull : true
        }, 
        nama_jenis_belanja : {
            type : DataTypes.STRING(255), 
            allowNull : true
        },
        komentar : {
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
        tableName : "ref_rkbmut_pengadaan_header", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RkbmutPengadaanHeader;