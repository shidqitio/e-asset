const {DataTypes} = require("sequelize");
const db = require("../database");
const Pegawai = require("./pegawai"); 
const JenisFungsional = require("./jenisFungsional")
const Jafung = require("./jafung");
const JafungPangkat = require("./jafungPangkat");

const TrxJabatanFungsional = db.define(
    "TrxJabatanFungsional", 
    {
        nip : {
            type : DataTypes.STRING(20), 
            primaryKey : true, 
            allowNull : false,
        }, 
        kode_jenis_fungsional : {
            type : DataTypes.STRING(2), 
            allowNull : false,
        }, 
        kode_jafung : {
            type : DataTypes.STRING(5), 
            allowNull : false,
        }, 
        kode_jafung_pangkat : {
            type : DataTypes.STRING(8), 
            primaryKey : true, 
            allowNull : false,
        }, 
        kelas : {
            type : DataTypes.STRING(2), 
            allowNull : true
        }, 
        tmt_awal : {
            type : DataTypes.DATE(), 
            allowNull : false,
        },
        tmt_akhir : {
            type : DataTypes.DATE(), 
            allowNull : true, 
        }, 
        nomor_sk_jafung : {
            type : DataTypes.STRING(100), 
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
        tableName : "trx_jabatan_fungsional", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
);

Pegawai.hasMany(TrxJabatanFungsional, {
    foreignKey : "nip",
})

TrxJabatanFungsional.belongsTo(Pegawai, {
    foreignKey : "nip",
})

JenisFungsional.hasMany(TrxJabatanFungsional, {
    foreignKey : "kode_jenis_fungsional",
})

TrxJabatanFungsional.belongsTo(JenisFungsional, {
    foreignKey : "kode_jenis_fungsional",
})

Jafung.hasMany(TrxJabatanFungsional, {
    foreignKey : "kode_jafung",
})

TrxJabatanFungsional.belongsTo(Jafung, {
    foreignKey : "kode_jafung",
})

JafungPangkat.hasMany(TrxJabatanFungsional,{
    foreignKey : "kode_jafung_pangkat",
})

TrxJabatanFungsional.belongsTo(JafungPangkat, {
    foreignKey : "kode_jafung_pangkat",
})

module.exports = TrxJabatanFungsional;





