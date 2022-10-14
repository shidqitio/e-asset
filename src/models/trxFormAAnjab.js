const db = require("../database/index")
const {DataTypes} = require("sequelize")
const RefTugasSubAnjab = require("./refTugasSubAnjab")
const RefSatuanHasilAnjab = require("./refSatuanHasilAnjab")

const TrxFormAAnjab = db.define(
    "TrxFormAAnjab", 
    {
        kode_unit : {
            type : DataTypes.STRING(16), 
            primaryKey : true, 
            allowNull : false
        }, 
        kode_jabatan_struktural : {
            type : DataTypes.STRING(25), 
            primaryKey : true, 
            allowNull : false
        },
        kode_tugas_sub : {
            type : DataTypes.STRING(7), 
            primaryKey : true, 
            allowNull : false
        }, 
        kode_satuan_hasil : {
            type : DataTypes.STRING(2),
            allowNull : true
        }, 
        frekuensi : {
            type : DataTypes.DECIMAL(18,2),
            allowNull : true
        },
        waktu_penyelesaian : {
            type : DataTypes.DECIMAL(18,2),
            allowNull : true
        },
        fte : {
            type : DataTypes.DECIMAL(18,2),
            allowNull : true
        },
        volume_kerja : {
            type : DataTypes.DECIMAL(18,2),
            allowNull : true
        },
        beban_kerja : {
            type : DataTypes.DECIMAL(18,2),
            allowNull : true
        },
        pegawai_butuh : {
            type : DataTypes.DECIMAL(18,2),
            allowNull : true
        },
        status : {
            type : DataTypes.ENUM("pokok", "tambahan"),
            allowNull : false, 
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
        tableName : "trx_form_a_anjab", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

RefTugasSubAnjab.hasMany(TrxFormAAnjab, {
    foreignKey : "kode_tugas_sub"
})

TrxFormAAnjab.belongsTo(RefTugasSubAnjab, {
    foreignKey : "kode_tugas_sub"
})

RefSatuanHasilAnjab.hasMany(TrxFormAAnjab, {
    foreignKey : "kode_satuan_hasil"
})

TrxFormAAnjab.belongsTo(RefSatuanHasilAnjab, {
    foreignKey : "kode_satuan_hasil"
})

module.exports = TrxFormAAnjab