const {DataTypes} = require("sequelize")
const db = require("../database")
const Pegawai = require("./pegawai");
const Fakultas = require("./fakultas");
const ProgramStudi = require("./programStudi");
const Jurusan = require("./jurusan");

const TrxProgramStudiPegawai = db.define(
    "TrxProgramStudiPegawai", 
    {
        nip : {
            type : DataTypes.STRING(20), 
            primaryKey : true, 
            allowNull : false
        }, 
        kode_fakultas : {
            type : DataTypes.STRING(1), 
            allowNull : false, 
        }, 
        kode_program_studi : {
            type : DataTypes.STRING(3), 
            primaryKey : true,
            allowNull : false,
        }, 
        kode_jurusan : {
            type : DataTypes.STRING(6),
            primaryKey : true, 
            allowNull :false
        }, 
        tanggal_mulai : {
            type : DataTypes.DATE(), 
            allowNull : false,
        }, 
        tanggal_akhir : {
            type : DataTypes.DATE(), 
            allowNull : true,
        }, 
        kode_pindah : {
            type : DataTypes.INTEGER(), 
            allowNull : false, 
            primaryKey : true
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
        tableName : "trx_program_studi_pegawai", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

Pegawai.hasMany(TrxProgramStudiPegawai, {
    foreignKey : "nip",
})

TrxProgramStudiPegawai.belongsTo(Pegawai, {
    foreignKey : "nip"
})

Fakultas.hasMany(TrxProgramStudiPegawai, {
    foreignKey : "kode_fakultas",
})

TrxProgramStudiPegawai.belongsTo(Fakultas, {
    foreignKey : "kode_fakultas",
})

ProgramStudi.hasMany(TrxProgramStudiPegawai, {
    foreignKey : "kode_program_studi",
})

TrxProgramStudiPegawai.belongsTo(ProgramStudi, {
    foreignKey : "kode_program_studi",
})

Jurusan.hasMany(TrxProgramStudiPegawai, {
    foreignKey : "kode_jurusan",
})

TrxProgramStudiPegawai.belongsTo(Jurusan, {
    foreignKey : "kode_jurusan"
})

module.exports = TrxProgramStudiPegawai