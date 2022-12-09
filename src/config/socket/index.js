const db = require("../database")
const RkbmutPengadaanHeader = require('../../models/rkbmutPengadaanHeader')

class SocketIo {
    constructor(socket) {
        this.socket = socket;
    }

    
    getDataFromPengadaanHeader() {
        RkbmutPengadaanHeader.findAll()
        .then((data) => {
            return res.json ({
                data : data
            })
            .then((cek) => {
                return this.socket.emit("pengadaan", cek)
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
              }
              throw err;
        })
    }
    
}

module.exports = SocketIo;