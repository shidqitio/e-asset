const {DataTypes} = require("sequelize");
const db = require("../database")
const TrxUnitKerja = require("./trxUnitKerja"); 
const JabatanPegawai = require("./jabatanPegawai");

const TrxAnjabFormD = db.define(
    "TrxAnjabFormD", 
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
        beban_kerja : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true,
        }, 
        butuh_pegawai : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true,
        }, 
        butuh_pegawai_real : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true,
        }, 
        isi_data : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true,
        }, 
        jumlah_pegawai : {
            type : DataTypes.DECIMAL(18,0), 
            allowNull : true,
        }, 
        plus_minus : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true,
        }, 
        ej : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull : true,
        }, 
        ep : {
            type : DataTypes.STRING(2), 
            allowNull : true,
        }, 
        predikat : {
            type : DataTypes.STRING(15), 
            allowNull : true,
        }, 
        status : {
            type : DataTypes.STRING(1), 
            allowNull : true,
        }, 
        kode_kategori : {
            type : DataTypes.STRING(2), 
            allowNull : true,
        }, 
        keterangan : {
            type : DataTypes.STRING(), 
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
        tableName : "trx_anjab_form_d", 
        createdAt : "udcr", 
        updatedAt : "udch"
    },
)

TrxUnitKerja.hasMany(TrxAnjabFormD, {
    foreignKey : "kode_unit_kerja",
})

TrxAnjabFormD.belongsTo(TrxUnitKerja, {
    foreignKey : "kode_unit_kerja",
})

JabatanPegawai.hasMany(TrxAnjabFormD, {
    foreignKey : "kode_jabatan_unit_kerja",

})

TrxAnjabFormD.belongsTo(JabatanPegawai, {
    foreignKey : "kode_jabatan_unit_kerja",

})

module.exports = TrxAnjabFormD;