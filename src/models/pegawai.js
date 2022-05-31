const { DataTypes } = require("sequelize");
const db = require("../database");
const Agama = require("./agama");
const Jafung = require("./jafung");
const Golongan_Ruang = require("./golonganRuang")

const Pegawai = db.define(
  "Pegawai",
  {
    nip: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    nama_pegawai: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    kode_jafung: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    nidn: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan", "Lain-lain"),
      allowNull: false,
    },
    kode_agama: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    tmt_cpns: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tmt_pns: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    nomor_telp: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_nikah: {
      type: DataTypes.ENUM("Nikah", "Belum Nikah"),
      allowNull: false,
    },
    status_pegawai: {
      type: DataTypes.ENUM("Aktif", "Pensiun", "Diberhentikan", "Meninggal"),
      allowNull: false,
    },
    foto_pegawai : {
      type: DataTypes.STRING(255), 
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
    tableName: "ref_pegawai",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

Pegawai.belongsTo(Agama, {
  foreignKey: "kode_agama",
});

Agama.hasOne(Pegawai, {
  foreignKey: "nip",
});

Pegawai.belongsTo(Jafung, {
  foreignKey: "kode_jafung",
});

Jafung.hasOne(Pegawai, {
  foreignKey: "nip",
});

Pegawai.belongsTo(Golongan_Ruang,{
  foreignKey: "kode_golongan_ruang",
});

Golongan_Ruang.hasOne(Pegawai, {
  foreignKey: "kode_golongan_ruang",
})

module.exports = Pegawai;
