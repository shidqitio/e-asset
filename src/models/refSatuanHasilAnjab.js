const db = require("../database/index")
const {DataTypes} = require("sequelize")

const RefSatuanHasilAnjab = db.define(
    "RefSatuanHasilAnjab", 
    {
        kode_satuan_hasil : {
            type : DataTypes.STRING(2), 
            primaryKey : true, 
            allowNull : false
        }, 
        satuan_hasil : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        jumlah : {
            type : DataTypes.DECIMAL(18,2), 
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
        tableName : "ref_satuan_hasil_anjab", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

module.exports = RefSatuanHasilAnjab