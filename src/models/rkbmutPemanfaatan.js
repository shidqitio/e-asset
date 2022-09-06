const {DataTypes} = require("sequelize")
const db = require("../config/database")

const RkbmUTPemanfaatan = db.define(
    "RkbmUTPemanfaatan", 
    {
        kode_unit_kerja : {
            type : DataTypes.STRING(16), 
            allowNull : false, 
            primaryKey : true,
        }, 
        tahun : {
            type : DataTypes.STRING(4),
            allowNull : false, 
            primaryKey : true
        }, 
        kode_asset : {
            type : DataTypes.STRING(10), 
            allowNull : false, 
            primaryKey : true
        }, 
        nup : {
            type : DataTypes.STRING(50), 
            allowNull : false, 
            primaryKey : true, 
        }, 
        status_revisi : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        }, 
        revisi_ke : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        },
        nama_unit_kerja : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        total_realisasi_pnpb : {
            type : DataTypes.DECIMAL(20,2), 
            allowNull : true
        }, 
        jumlah_item : {
            type : DataTypes.INTEGER(11), 
            allowNull : true
        }, 
        kode_bentuk_pemanfaatan : {
            type : DataTypes.STRING(1), 
            allowNull : true
        }, 
        peruntukan : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        jangka_waktu : {
            type : DataTypes.INTEGER(), 
            allowNull : true
        }, 
        potensi_pnpb : {
            type : DataTypes.DECIMAL(20,2), 
            allowNull : true
        }, 
        keterangan : {
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
        tableName : "ref_rkmut_pemanfaatan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RkbmUTPemanfaatan