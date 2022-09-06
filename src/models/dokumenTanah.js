const {DataTypes} = require("sequelize")
const db = require("../config/database")

const DokumenTanah = db.define(
    "DokumenTanah", 
    {
        kode_dokumen : {
          type : DataTypes.INTEGER(11), 
          primaryKey : true, 
          allowNull : false,
        },
        nama_dokumen : {
            type : DataTypes.STRING(3),
            allowNull: true
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
        tableName : "ref_dokumen_tanah", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

module.exports = DokumenTanah