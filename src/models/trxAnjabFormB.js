const {DataTypes} = require("sequelize")
const db = require("../database")
const TrxUnitKerja = require("./trxUnitKerja");
const JabatanPegawai = require("./jabatanPegawai")

const TrxAnjabFormB = db.define(
    "TrxAnjabFormB", 
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
        no_urut : {
            type : DataTypes.DECIMAL(18,0), 
            allowNull : true
        }, 
        nama : {
            type : DataTypes.STRING(255), 
            allowNull : true, 
        }, 
        pendidikan : {
            type : DataTypes.STRING(255),
            allowNull : true,
        }, 
        gol : {
            type : DataTypes.STRING(10), 
            allowNull : true,
        }, 
        jumlah : {
            type : DataTypes.DECIMAL(18,0), 
            allowNull : true,
        }, 
        ket : {
            type : DataTypes.STRING(255), 
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
        tableName : "trx_anjab_form_b", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

TrxUnitKerja.hasMany(TrxAnjabFormB, {
    foreignKey : "kode_unit_kerja",
})

TrxAnjabFormB.belongsTo(TrxUnitKerja, {
    foreignKey : "kode_unit_kerja",
})

JabatanPegawai.hasMany(TrxAnjabFormB, {
    foreignKey : "kode_jabatan_unit_kerja",

})

TrxAnjabFormB.belongsTo(JabatanPegawai, {
    foreignKey : "kode_jabatan_unit_kerja",

})

module.exports = TrxAnjabFormB; 