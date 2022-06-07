const {DataTypes} = require("sequelize"); 
const db = require("../database");
const ProgramStudi = require("./programStudi");

const Jurusan = db.define(
    "Jurusan",
    {
        kode_program_studi : {
            type: DataTypes.STRING(3), 
            allowNull: false
        }, 
        kode_jurusan : {
            type: DataTypes.STRING(6),
            primaryKey : true, 
            allowNull : false, 
        }, 
        nama_jurusan : {
            type : DataTypes.STRING(255), 
            allowNull : false,
        }, 
        ucr : {
            type : DataTypes.STRING(100), 
            allowNull : true,
        }, 
        uch : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        udcr : {
            type : DataTypes.DATE(), 
            allowNull : true,
        }, 
        udch : {
            type : DataTypes.DATE(), 
            allowNull : true,
        }, 
    }, 
    {
        tableName : "ref_jurusan", 
        createdAt : "udcr", 
        updatedAt : "udch"
    }
); 

ProgramStudi.hasMany(Jurusan, {
    foreignKey : "kode_program_studi",
  })
  
  Jurusan.belongsTo(ProgramStudi, {
    foreignKey:"kode_program_studi"
  })



module.exports = Jurusan;