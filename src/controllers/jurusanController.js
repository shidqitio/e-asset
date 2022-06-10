const Jurusan = require("../models/jurusan");
const ProgramStudi = require("../models/programStudi")

exports.index = (req, res, next) => {
    ProgramStudi.findAll({
        include: [
            {
                model : Jurusan,
                attributes : ["kode_jurusan","nama_jurusan"],
            },
        ]
    })
    .then((jurusan) => {
        res.json({
            status: "Success", 
            message : "Berhasil Menampilkan Data", 
            data : jurusan,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    Jurusan.findOne({where : {kode_jurusan : req.params.kode_jurusan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jurusan Tidak Ada");
            error.statusCode = 422; 
            throw error ;
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
        next(err)
    });
};

exports.store = (req, res, next) => {
    Jurusan.findAll({
        attributes : ["kode_jurusan"],
        where : {kode_program_studi : req.body.kode_program_studi}
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length ;
        if(data.length === 0){
            let kode_program_studi = req.body.kode_program_studi;
            kode_hasil = kode_program_studi + "." + "1";
        }
        else {
            const {kode_jurusan} = data[index-1];
            let tes = kode_jurusan.split(".");
            let kode_jurus = tes[2];
            let kode_program_studi = req.body.kode_program_studi;

            let kode1 = parseInt(kode_jurus);


            if(kode1 > 0) {
                kode1 = parseInt(kode1) + 1; 
                kode_hasil = kode_program_studi + "." + kode1.toString()
            } 
            else {
                kode_hasil = kode_program_studi + "." + parseInt(kode1) + 1
            }

            if(kode1 === 0) {
                kode1 = parseInt(kode1) + 1;
                kode_hasil = kode_program_studi + "." + kode1.toString();
            }
            else {
                kode_hasil = kode_program_studi + "." + kode1.toString();
            }
            
        }
        return Jurusan.create({
            kode_jurusan : kode_hasil, 
            kode_program_studi : req.body.kode_program_studi, 
            nama_jurusan : req.body.nama_jurusan
        });
    })
    .then((app) => {
        res.json({
            status: "Success", 
            message : "Berhasil Menyimpan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500 ;
        }
        next(err);
    })
}

exports.update = (req, res, next) => {
    const data = {
        kode_jurusan : req.params.kode_jurusan, 
        kode_program_studi : req.body.kode_program_studi, 
        nama_jurusan : req.body.nama_jurusan,
    };
    Jurusan.findOne({where : {kode_jurusan : req.params.kode_jurusan}})
    .then((app) => {
        if(!app){
            const error = new Error("Kode Jurusan Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return Jurusan.update(data,{where: {kode_jurusan : req.params.kode_jurusan}})
    })
        .then((up) => {
            res.json({
                status : "Success", 
                message : "Berhasil Memperbarui Data", 
                data : data,
            });
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }); 
};

exports.destroy = (req, res, next) => {
    Jurusan.findOne({where : {kode_jurusan : req.params.kode_jurusan}})
    .then((app) => {
        if(!app){
            const error = new Error("Kode Jurusan Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Jurusan.destroy({
            where:{kode_jurusan : req.params.kode_jurusan}
        });
    })
    .then((response) => {
        res.json({
            status : "Success",
            message : "Berhasil Menghapus Data",
            data : response,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}