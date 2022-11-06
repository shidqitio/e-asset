const axios = require('axios')
const open = require('open')



const token = (req, res, next) => {
    let token = req.body.tokenBaru
    let kode_app = req.body.kode_app
    let nama_app = req.body.nama_app
    let menu = req.body.menu

    return cek_token = axios.post("https://usman.ut.ac.id", {
        token : token
    })
    .then((cek_token) => {
        if(!cek_token) {
            throw error
        }
        const tokenBaru = cek_token.tokenBaru
        global.menu = {
            kode_app, 
            nama_app, 
            menu, 
            tokenBaru
        }
        open('https://anjab.ut.ac.id', {
            token : tokenBaru
        })

    })
}

const tesopen = (req, res, next) => {
    let token = req.body.token 
    const global = {
        token : token
    }
    if (token === "12345"){
        const cek = open(`https://localhost:3000/${token}`, {
            token : token
        })
    }
    else {
        console.log("gagal Buka ")
    }

    return global
}

const index = (req, res, next) => {
    const tes = tesopen()
    console.log(tes)
}

module.exports = {
    tesopen, 
    index
}