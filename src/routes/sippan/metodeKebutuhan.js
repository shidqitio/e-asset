const express = require("express")
const router = express.Router()


const path = require("path")
const fs = require("fs")
const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "./public/file/excel_metode_kebutuhan")
    },
    filename : (req,file,callback) => {
        const nama_image = Date.now() + "-" +  Math.round(Math.random() * 1E9) + path.parse(file.originalname).ext
        callback(null, nama_image)
    }
})

const uploadImage = multer({
    
})