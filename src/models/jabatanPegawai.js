const {DataTypes} = require("sequelize")
const db = require("../database");
const TrxUnitKerja = require("./trxUnitKerja");
const IhtisarJabatan = require("./ihtisarJabatan")

const JabatanPegawai = db.define(
    "JabatanPegawai",
    {
        kode_jabatan_unit_kerja : {
            type : DataTypes.STRING(25), 
            primaryKey : true, 
            allowNull : false
        }, 
        kode_unit_kerja : {
            type : DataTypes.STRING(25), 
            primaryKey : true, 
            allowNull : false
        }, 
        status_aktif : {
            type : DataTypes.STRING(1), 
            primaryKey : true, 
            allowNull :false
        }, 
        nama_jabatan_unit_kerja : {
            type: DataTypes.STRING(), 
            allowNull : false, 
        }, 
        beban_kerja : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull :true,
        }, 
        kebutuhan_pegawai : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull :true,
        }, 
        isi_data : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull :true,
        }, 
        jumlah_pegawai : {
            type : DataTypes.DECIMAL(18,2), 
            allowNull :true,
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
        tableName : 'ref_jabatan_pegawai', 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
)




TrxUnitKerja.hasMany(JabatanPegawai, {
    foreignKey : 'kode_unit_kerja'
})

JabatanPegawai.belongsTo(TrxUnitKerja, {
    foreignKey : "kode_unit_kerja",
})

JabatanPegawai.hasOne(IhtisarJabatan, {
    foreignKey : "kode_jabatan_unit_kerja"
})

IhtisarJabatan.belongsTo(JabatanPegawai, {
    foreignKey : "kode_jabatan_unit_kerja"
})


module.exports = JabatanPegawai;