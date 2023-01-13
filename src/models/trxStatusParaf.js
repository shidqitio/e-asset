const db = require("../config/database")
const {DataTypes} = require("sequelize")


const TrxStatusParaf = db.define(
    "TrxStatusParaf",
    {
        kode_unit_kerja : {
            type : DataTypes.STRING(16),
            allowNull : false, 
            primaryKey : true
        },
        nama_unit_kerja : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        status_pengadaan : {
            type : DataTypes.SMALLINT(),
            allowNull : true, 
            defaultValue : 0
        },
        status_pemeliharaan : {
            type : DataTypes.SMALLINT(),
            allowNull : true, 
            defaultValue : 0
        },
        status_pemindahtanganan : {
            type : DataTypes.SMALLINT(),
            allowNull : true, 
            defaultValue : 0
        },
        status_pemanfaatan : {
            type : DataTypes.SMALLINT(),
            allowNull : true, 
            defaultValue : 0
        },
        status_penghapusan : {
            type : DataTypes.SMALLINT(),
            allowNull : true, 
            defaultValue : 0
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
        tableName : "trx_status_paraf_rkbm", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = TrxStatusParaf