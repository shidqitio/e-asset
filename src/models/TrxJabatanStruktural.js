const db = require("../database");
const {DataTypes} = require("sequelize");
const Pegawai = require("./pegawai");
const JabatanStruktural = require("./jabatanStruktural")

const TrxJabatanStruktural = db.define(
    "TrxJabatanStruktural",
    {
        nip : {
            type : DataTypes.STRING(20),
            primaryKey : true, 
            allowNull : false,
        }, 
        kode_jabatan_struktural : {
            type : DataTypes.STRING(3), 
            primaryKey : true, 
            allowNull : false,
        }, 
        periode : {
            type : DataTypes.ENUM("1","2"),
            primaryKey : true, 
            allowNull : false
        }, 
        kelas : {
            type : DataTypes.STRING(2), 
            allowNull : true,
        }, 
        tmt_awal : {
            type : DataTypes.DATE(),
            allowNull : false,
        }, 
        tmt_akhir : {
            type : DataTypes.DATE(), 
            allowNull : false,
        }, 
        nomor_sk_jabatan_struktural : {
            type : DataTypes.STRING(100), 
            allowNull : false
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
        tableName : "trx_jabatan_struktural", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)

Pegawai.hasMany(TrxJabatanStruktural, {
    foreignKey : "nip",
})

TrxJabatanStruktural.belongsTo(Pegawai, {
    foreignKey : "nip",
})

JabatanStruktural.hasMany(TrxJabatanStruktural, {
    foreignKey : "kode_jabatan_struktural"
})

TrxJabatanStruktural.belongsTo(JabatanStruktural, {
    foreignKey : "kode_jabatan_struktural",
})

module.exports = TrxJabatanStruktural;