

exports.generateKode = (kode) => {
    let gen_kode = "00";

    if(kode !== null) {
        gen_kode = kode;
    }

    let kode1 = parseInt(gen_kode.charAt(0));
    let kode2 = parseInt(gen_kode.charAt(1));

    if(kode1 > 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1 ;
            kode2 = 0 ;
            kode_hasil = kode1.toString() + kode2.toString();
        } else {
            kode_hasil = parseInt(gen_kode) + 1
        }
    }

    if(kode1 === 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1;
            kode2 = 0;
            kode_hasil = kode1.toString() + kode2.toString();
        } else {
            kode_hasil = kode1.toString() + String(parseInt(kode2) + 1);
        }
    }

    if(kode === null) {
        gen_kode = "00";
    }
    
    return kode_hasil;
}