const ProgramStudi = require("../models/programStudi");
const Fakultas = require("../models/fakultas")

exports.index = (req, res, next) => {
    ProgramStudi.findAll()
    .then((prodi) => {
        if(!prodi) {
            const error = new Error("Program Studi Tidak Ditemukan");
            error.statuCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : prodi
        });
    })
    .catch((err) => {
        if(!err){ 
            err.statuCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    ProgramStudi.findOne({where : {kode_program_studi : req.params.kode_program_studi}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Program Studi Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    ProgramStudi.findAll({
        attributes : ["kode_program_studi"],
        where : {kode_fakultas : req.body.kode_fakultas}
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length; 
        if(data.length === 0){
            let kode_fakultas = req.body.kode_fakultas;
            kode_hasil = kode_fakultas + "." + "1";
        }
        else {
            const {kode_program_studi} = data[index - 1]; 
            let tes = kode_program_studi.split(".");
            let kode_prodi = tes[1];
            let kode_awal = req.body.kode_fakultas;

            let kode1 = parseInt(kode_prodi);

            if(kode1 > 0 ){
                kode1 = parseInt(kode1) + 1;
                kode_hasil = kode_awal + "." + kode1.toString();
            }
            else {
                kode_hasil =  kode_awal + "." + parseInt(kode1) + 1
            }

            if(kode1 === 0) {
                kode1 = parseInt(kode1) + 1; 
                kode_hasil =  kode_awal + "." + kode1.toString();
            }
            else {
                kode_hasil =  kode_awal + "." + kode1.toString();
            }
        }

        return ProgramStudi.create({
            kode_fakultas : req.body.kode_fakultas, 
            kode_program_studi : kode_hasil, 
            nama_program_studi : req.body.nama_program_studi,
        });
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.update = (req, res, next) => {
    const data = {
        kode_fakultas : req.body.kode_fakultas, 
        kode_program_studi : req.params.kode_program_studi, 
        nama_program_studi : req.body.nama_program_studi
    };
    ProgramStudi.findOne({ where : {kode_program_studi : req.params.kode_program_studi}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Program Studi Tidak Ada");
            error.statuCode = 422; 
            throw error;
        }
        return ProgramStudi.update(data, {where : {kode_program_studi : req.params.kode_program_studi}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statuCode){
            err.statuCode = 500;
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    ProgramStudi.findOne({where : {kode_program_studi : req.params.kode_program_studi}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Program Studi Tidak Ada");
            error.statuCode = 422; 
            throw error;
        }
        return ProgramStudi.destroy({
            where : {kode_program_studi : req.params.kode_program_studi}
        });
    })
    .then((response) => {
        res.json({
            status : "Successs", 
            message : "Berhasil Menghapus Data",
            data : response,
        });
    })
    .catch((err) => {
        if(!err.statuCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};