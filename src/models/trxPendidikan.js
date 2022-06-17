const {DataTypes} = require("sequelize")
const db = require("../database")
const TingkatPendidikan = require("./tingkatPendidikan")
const Pegawai = require("./pegawai")

const TrxPendidikan = db.define(
    "TrxPendidikan",
    {
        nip : {
            type : DataTypes.STRING(20), 
            primaryKey : true, 
            allowNull : false
        }, 
        kode_tingkat_pendidikan : {
            type : DataTypes.STRING(2), 
            primaryKey : true, 
            allowNull : false
        }, 
        nama_sekolah : {
            type : DataTypes.STRING(100),
            allowNull : false 
        }, 
        jurusan : {
            type : DataTypes.STRING(200), 
            allowNull : true, 
        }, 
        tahun_lulus : {
            type : DataTypes.STRING(4), 
            allowNull : false,
        },
        lokasi_sekolah : {
            type: DataTypes.STRING(100), 
            allowNull : true
        },
        nama_pimpinan_sekolah : {
            type : DataTypes.STRING(255), 
            allowNull : true,
        }, 
        nomor_ijazah : {
            type : DataTypes.STRING(100), 
            allowNull : true
        }, 
        judul_skripsi : {
            type : DataTypes.TEXT(),
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
        tableName : "trx_pendidikan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
)

Pegawai.hasMany(TrxPendidikan, {
    foreignKey : "nip"
})

TrxPendidikan.belongsTo(Pegawai, {
    foreignKey : "nip"
})

TingkatPendidikan.hasMany(TrxPendidikan, {
    foreignKey : "kode_tingkat_pendidikan"
})

TrxPendidikan.belongsTo(TingkatPendidikan, {
    foreignKey : "kode_tingkat_pendidikan"
})

module.exports = TrxPendidikan;