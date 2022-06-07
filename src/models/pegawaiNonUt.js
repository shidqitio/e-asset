const {DataTypes} = require("sequelize");
const db = require("../database")

const PegawaiNonUT = db.define(
    "PegawaiNonUT" , 
    {
        nip : {
            type : DataTypes.STRING(20),
            primaryKey : true, 
            allowNull : false,
        },
        nama_pegawai : {
            type : DataTypes.STRING(100), 
            allowNull : false,
        }, 
        nidn : {
            type : DataTypes.STRING(10), 
            allowNull: true,
        }, 
        tempat_lahir : {
            type : DataTypes.STRING(100),
            allowNull : false,
        }, 
        tanngal_lahir : {
            type : DataTypes.DATE(),
            allowNull : false,
        },
        jenis_kelamin : {
            type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
            allowNull : false,
        },
        alamat : {
            type : DataTypes.STRING(300), 
            allowNull : false,
        },
        nomor_telp : {
            type : DataTypes.STRING(30), 
            allowNull : false,
        }, 
        email : {
            type : DataTypes.STRING(100), 
            allowNull : false, 
        }, 
        nomor_rekening : {
            type : DataTypes.STRING(100), 
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
            type: DataTypes.DATE,
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }, 
    {
        tableName : "ref_pegawai_non_ut", 
        createdAt : "udcr", 
        updatedAt : "udch",
    }
); 

module.exports = PegawaiNonUT;