 const {DataTypes} = require("sequelize");
const db = require("../database")
const TrxUnitKerja = require("./trxUnitKerja"); 
const JabatanPegawai = require("./jabatanPegawai");

const TrxAnjabFormA = db.define(
    "TrxAnjabFormA", 
    {
        kode_unit_kerja : {
            type: DataTypes.STRING(25), 
            allowNull : false,
            primaryKey : true
        }, 
        kode_jabatan_unit_kerja : {
            type : DataTypes.STRING(25), 
            allowNull : false, 
            primaryKey : true
        },
        no_urut_01 : {
            type : DataTypes.STRING(5), 
            allowNull : true
        }, 
        tugas_pokok : {
            type : DataTypes.TEXT(), 
            allowNull : true,
        }, 
        no_urut_02 : {
            type : DataTypes.STRING(5), 
            allowNull : true
        },
        no_urut_02_sub : {
            type : DataTypes.STRING(5), 
            allowNull : true
        },
        sub_tugas_pokok : {
            type : DataTypes.TEXT(), 
            allowNull : true
        },
        status_urjab_form_a : {
            type : DataTypes.STRING(25), 
            allowNull : true
        }, 
        a3 : {
            type : DataTypes.STRING(50), 
            allowNull : true
        },
        a4 : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true
        },
        b4 : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true
        }, 
        a5 : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true
        }, 
        a6 : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true
        }, 
        a7 : { type : DataTypes.DECIMAL(18,2), 
            allowNull : true
        }, 
        a8 : {
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
            type: DataTypes.DATE,
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }, 
    {
        tableName : "trx_anjab_form_a", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

TrxUnitKerja.hasMany(TrxAnjabFormA, {
    foreignKey : "kode_unit_kerja",
})

TrxAnjabFormA.belongsTo(TrxUnitKerja, {
    foreignKey : "kode_unit_kerja",
})

JabatanPegawai.hasMany(TrxAnjabFormA, {
    foreignKey : "kode_jabatan_unit_kerja",

})

TrxAnjabFormA.belongsTo(JabatanPegawai, {
    foreignKey : "kode_jabatan_unit_kerja",

})

module.exports = TrxAnjabFormA; 
