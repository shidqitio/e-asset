const TrxRkbmutAll = require("../models/trxRkbmutAll")
const puppeteer = require("puppeteer")


exports.index = (req, res, next) => {
    return TrxRkbmutAll.findAll()
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422;
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan",
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

exports.genpdf = (req, res, next) => {
    let kode_unit = req.body.kode_unit
    let html_script = `<html>
    <head>
       <style>
          @font-face {
             font-family: "Times";
             font-weight: normal;
             font-style: normal;
             font-variant: normal;
             /* src: url("http://eclecticgeek.com/dompdf/fonts/Elegance.ttf") format("truetype"); */
          }
 
          body {
             font-family: "Times", "sans-serif";
          }
       </style>
       <style>
          @page {
             margin-top: 0px;
             margin-bottom: 260px;
             margin-left: 55px;
             margin-right: 55px;
          }
 
          header {
             position: fixed;
             top: -179px;
             left: 0px;
             right: 0px;
             /* background-color: lightblue; */
             height: 160px;
          }
 
          footer {
             width: 100%;
             text-align: center;
             bottom: -120px;
          }
 
          .sign {
             position: absolute;
             bottom: 0px;
             height: 0cm;
             left: -55px;
             right: -55px;
             font-family: "Arial", "sans-serif";
          }
 
          .barcode {
             position: fixed;
             bottom: -150px;
             height: 0cm;
             left: -55px;
             right: 0px;
             text-align: left;
          }
 
          p {
             page-break-after: always;
          }
 
          p:last-child {
             page-break-after: never;
          }
       </style>
    </head>
    <body>
       <main>
          <br />
          <table style="padding: 0px 0px 0px 0px; font-size: 12pt" width="100%">
             <tr>
                <td style="text-align: center; font-size: larger">
                   <b>
                      Lembar Persetujuan RKBMUT Hasil Penelaahan <br />
                      Unit Pengadaan Barang dan Jasa <br />Tahun Anggaran 2022
                   </b>
                </td>
             </tr>
          </table>
          <br />
          <br />
          <table width="100%" class="table table-bordered" style="padding: 0px 0px 0px 0px; font-size: 10pt; border-collapse: collapse; border: 1px solid black">
             <tr>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 5%" colspan="1" rowspan="2">#</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 30%" colspan="1" rowspan="2">Deskripsi</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" colspan="2">Usulan</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" colspan="2">Di Setujuai</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="2">Tidak Disetujui</th>
             </tr>
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: center; padding-left: 2; font-weight: 300" colspan="1">Unit</td>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: center; padding-left: 2; font-weight: 300" colspan="1">Luas</td>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: center; padding-left: 2; font-weight: 300" colspan="1">Unit</td>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: center; padding-left: 2; font-weight: 300" colspan="1">Luas</td>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: center; padding-left: 2; font-weight: 300" colspan="1">Unit</td>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: center; padding-left: 2; font-weight: 300" colspan="1">Luas</td>
             </tr>
             <tr>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 5%; padding-left: 2" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 29%" colspan="1">Pengadaan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 5%; padding-left: 2" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 29%" colspan="1">Pemeliharaan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 5%; padding-left: 2" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 29%" colspan="1">Pemanfaatan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 5%; padding-left: 2" colspan="1">4</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 29%" colspan="1">Pemindahtanganan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 5%; padding-left: 2" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 29%" colspan="1">Penghapusan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 11%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 90%; padding-left: 2" colspan="7">Total</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%; padding-left: 2" colspan="1">-</td>
             </tr>
          </table>
          <br />
          <hr />
          <br />
          <table style="padding: 0px 0px 0px 0px; font-size: 10pt" width="100%">
             <tr>
                <td style="text-align: center; font-size: larger">
                   <b>RKBMUT Pengadaan</b>
                </td>
             </tr>
          </table>
          <br />
          <table width="100%" class="table table-bordered" style="padding: 0px 0px 0px 0px; font-size: 10pt; border-collapse: collapse; border: 1px solid black; vertical-align: top">
             <tr>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Kode</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" colspan="1">Program/ Kegiatan/ Aktivitas/ Jenis Belanja/Kode Barang</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Kuantitas</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">SBSK</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Existing BMN</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Rill Kebutuhan</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Skema Pengadaan</th>
             </tr>
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p style="color: #c13e3e">1.1.1.1</p>
                </td>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>Penyediaan program pendidikan bergelar</p>
                </td>
             </tr>
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p style="color: #c13e3e">1.1.1.1.2</p>
                </td>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>Menyediakan program pendidikan sarjana</p>
                </td>
             </tr>
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300; vertical-align: top" colspan="1" rowspan="5">
                   <p style="color: #c13e3e">1.1.1.1.2.2</p>
                </td>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>Ouput (atau aktivitas)</p>
                </td>
             </tr>
             <tr>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>525112.512</p>
                </td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 20%; padding-left: 2" colspan="1">31001020001 || P.C Unit</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Pembelian Langsung</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 20%; padding-left: 2" colspan="1">31001020001 || P.C Unit</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Pembelian Langsung</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 20%; padding-left: 2" colspan="1">31001020001 || P.C Unit</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Pembelian Langsung</td>
             </tr>
 
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p style="color: #c13e3e">1.1.1.1</p>
                </td>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>Penyediaan program pendidikan bergelar</p>
                </td>
             </tr>
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p style="color: #c13e3e">1.1.1.1.2</p>
                </td>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>Menyediakan program pendidikan sarjana</p>
                </td>
             </tr>
             <tr>
                <td style="width: 10%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300; vertical-align: top" colspan="1" rowspan="5">
                   <p style="color: #c13e3e">1.1.1.1.2.2</p>
                </td>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>Output (atau aktivitas)</p>
                </td>
             </tr>
             <tr>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>525112.512</p>
                </td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 20%; padding-left: 2" colspan="1">31001020001 || P.C Unit</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Pembelian Langsung</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 20%; padding-left: 2" colspan="1">31001020001 || P.C Unit</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Pembelian Langsung</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 20%; padding-left: 2" colspan="1">31001020001 || P.C Unit</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">2</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">1</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 10%" colspan="1">Pembelian Langsung</td>
             </tr>
          </table>
          <br />
          <hr />
          <br />
          <table style="padding: 0px 0px 0px 0px; font-size: 10pt" width="100%">
             <tr>
                <td style="text-align: center; font-size: larger">
                   <b> RKBMUT Pemeliharaan </b>
                </td>
             </tr>
          </table>
          <br />
          <table width="100%" class="table table-bordered" style="padding: 0px 0px 0px 0px; font-size: 10pt; border-collapse: collapse; border: 1px solid black">
             <tr>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 30%" colspan="1">Jenis Belanja/Kode Barang</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Status Baranag</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Kondisi Baik</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">kondisi Rusak ringan</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Kebutuhan Pemeliharaan</th>
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p><strong>523136 - Belanja Barang Peresediaan Pemeliharaan Jaringan </strong></p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 30%; padding-left: 2" colspan="1">3060209006 - Switch Matrix And Server</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Milik Sendiri</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 30%; padding-left: 2" colspan="1">3060209006 - Switch Matrix And Server</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Milik Sendiri</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 30%; padding-left: 2" colspan="1">3060209006 - Switch Matrix And Server</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Milik Sendiri</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p><strong>523136 - Belanja Barang Peresediaan Pemeliharaan Jaringan </strong></p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 30%; padding-left: 2" colspan="1">3060209006 - Switch Matrix And Server</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Milik Sendiri</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 30%; padding-left: 2" colspan="1">3060209006 - Switch Matrix And Server</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Milik Sendiri</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">8</td>
             </tr>
             <tr>
                <td style="text-align: left; border-collapse: collapse; border: 1px solid black; width: 30%; padding-left: 2" colspan="1">3060209006 - Switch Matrix And Server</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Milik Sendiri</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">5</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">3</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">8</td>
             </tr>
          </table>
          <br />
          <hr />
          <br />
          <table style="padding: 0px 0px 0px 0px; font-size: 10pt" width="100%">
             <tr>
                <td style="text-align: center; font-size: larger">
                   <b> RKBMUT Pemindahtanganan </b>
                </td>
             </tr>
          </table>
          <br />
          <table width="100%" class="table table-bordered" style="padding: 0px 0px 0px 0px; font-size: 10pt; border-collapse: collapse; border: 1px solid black">
             <tr>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" colspan="1">Kode Barang/NUP/Merk</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Umur Ekonomis</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Kondisi Baranag</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Nilai Perolehan</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Bentuk Pemindahtanganan</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" colspan="1">Alasan</th>
             </tr>
             <tr>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>31001020001 || P.C Unit</p>
                </td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%; padding-left: 2" rowspan="3" colspan="1">5 Tahun</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="3" colspan="1">Baik</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="3" colspan="1">300.000,00</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="3" colspan="1">Penjualan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" rowspan="3" colspan="1">Karna Jumlah PC terlalu Banyak</td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>023.17.2900.677531 022.2022 3100102001 032</p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>BenQ</p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 20%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>31001020001 || P.C Unit</p>
                </td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%; padding-left: 2" rowspan="3" colspan="1">5 Tahun</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="3" colspan="1">Baik</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="3" colspan="1">300.000,00</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="3" colspan="1">Penjualan</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 20%" rowspan="3" colspan="1">Karna Jumlah PC terlalu Banyak</td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>023.17.2900.677531 022.2022 3100102001 032</p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="6">
                   <p>BenQ</p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
          </table>
          <br />
          <hr />
          <br />
          <table style="padding: 0px 0px 0px 0px; font-size: 10pt" width="100%">
             <tr>
                <td style="text-align: center; font-size: larger">
                   <b> RKBMUT Penghapusan </b>
                </td>
             </tr>
          </table>
          <br />
          <table width="100%" class="table table-bordered" style="padding: 0px 0px 0px 0px; font-size: 10pt; border-collapse: collapse; border: 1px solid black">
             <tr>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 25%" colspan="1">Kode Barang/NUP</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Merek</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Kondisi Baranag</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" colspan="1">Nilai Perolehan</th>
                <th style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 30%" colspan="1">Alasan</th>
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>31001020001 || P.C Unit</p>
                </td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%; padding-left: 2" rowspan="2" colspan="1">BenQ</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="2" colspan="1">Baik</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="2" colspan="1">300.000,00</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 30%" rowspan="2" colspan="1">Karna Jumlah PC terlalu Banyak</td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>023.17.2900.677531 022.2022 3100102001 032</p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>31001020001 || P.C Unit</p>
                </td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%; padding-left: 2" rowspan="2" colspan="1">BenQ</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="2" colspan="1">Baik</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 15%" rowspan="2" colspan="1">300.000,00</td>
                <td style="text-align: center; border-collapse: collapse; border: 1px solid black; width: 30%" rowspan="2" colspan="1">Karna Jumlah PC terlalu Banyak</td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
             <tr>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: start; padding-left: 2; font-weight: 300" colspan="1">
                   <p>023.17.2900.677531 022.2022 3100102001 032</p>
                </td>
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
                <!-- <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Akun Pajak / Denda</td>
                <td style="width: 25%; border-collapse: collapse; border: 1px solid; text-align: center">Jumlah Uang</td> -->
             </tr>
          </table>
          <br />
       </main>
    </body>
    <footer data-role="footer">
       <!-- <img src="http://172.16.100.69:5800/image/footer/selendang-01-01.png" width="100%" /> -->
    </footer>
 </html>`
    return TrxRkbmutAll.findAll({
        where : {
            kode_unit_kerja : kode_unit
        }
    })
    .then((app) => {
        if(app.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422;
            throw error
        }
            return puppeteer.launch({
                headless : true
            })
            .then((browser) => {
                return browser.newPage()
            .then((page) => {
                // const string_html = JSON.stringify(html_script)
                const html = html_script
                return page.setContent(html, {
                    waitUntil : 'domcontentloaded'
                })
                .then(() => {
                    // const date = new Date()
                    // let today = date.toDateString()
                    // let randomchar = Math.floor(Math.random() * 100) + 1
                    return page.pdf({
                        format: 'A4',
                        path : `./public/files/pdf_rkbmut/${kode_unit}.pdf`
                    })
                    .then((cetak) => {
                        if(!cetak) {
                            const error = new Error("Data Gagal Simpan")
                            error.statusCode = 422
                            throw error
                        }
                        console.log("HTML SCRIPT : ", html_script)
                        console.log("Kode Unit : ", kode_unit)
                        return browser.close()
                    })
                    .then((data) => {
                        return TrxRkbmutAll.update({
                            pdf : `https://sippp.ut.ac.id/hrd/pdf-rkbm/${kode_unit}.pdf`,
                            status_rkbmutall : 1
                        }, 
                        {where : {
                            kode_unit_kerja : kode_unit
                        }
                    })
                    .then((upd) => {
                        if(!upd) {
                            const error = new Error("Data Gagal Update")
                            error.statusCode = 422
                            throw error
                        }
                        return res.json({
                            status : "Success", 
                            message : "PDF berhasil Dibuat",
                            data : upd
                        })
                    })
                    })
                })
            })
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}