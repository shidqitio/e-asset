
const axios = require('axios')
const session = require('express-session')

const token = (req, res, next) => {
    let token = req.body.token 
    global._token = token
    return res.json({
        status : "Success", 
        message : "Token Berhasil Disimpan", 
        data : token
    })
}

const get_token = (req, res, next) => {
    const token = global._token
    try {
        if(!token) {
            const error = new Error("Data gagal kirim")
            error.statusCode = 422 
            throw error
        }
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
    
    console.log(token)
}

const index = (req, res, next) => {
    let data = {
        id_user : req.body.id_user,
        kode_group : req.body.kode_group, 
        token : global._token 
    }
    
    let header = {
        Authorization : global._token 
    }

    axios.post("https://dev-sippp.ut.ac.id:6999/sippp/menu-app",data , {
        headers : header
    })
    .then((respons) => {
        if(!respons) {
            const error = new Error("Data gagal kirim")
            error.statusCode = 422 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Diinput",
            data : respons.data.data  
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

const session_option = {
    
}

module.exports = {token, get_token, index}

// ======================================================================
// const axios = require('axios')
// const open = require('open')
// =====================================================================
// ======================================================================

// const token = (req, res, next) => {
//     let token = req.body.tokenBaru
//     let kode_app = req.body.kode_app
//     let nama_app = req.body.nama_app
//     let menu = req.body.menu

//     return cek_token = axios.post("https://usman.ut.ac.id", {
//         token : token
//     })
//     .then((cek_token) => {
//         if(!cek_token) {
//             throw error
//         }
//         const tokenBaru = cek_token.tokenBaru
//         global.menu = {
//             kode_app, 
//             nama_app, 
//             menu, 
//             tokenBaru
//         }
//         open('https://anjab.ut.ac.id', {
//             token : tokenBaru
//         })

//     })
// }

// const tesopen = (req, res, next) => {
//     let token = req.body.token 
//     const global = {
//         token : token
//     }
//     if (token === "12345"){
//         const cek = open(`https://localhost:3000/${token}`, {
//             token : token
//         })
//     }
//     else {
//         console.log("gagal Buka ")
//     }

//     return global
// }

// const index = (req, res, next) => {
//     const tes = tesopen()
//     console.log(tes)
// }

// module.exports = {
//     tesopen, 
//     index
// }