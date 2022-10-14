
exports.kodetugaspokok = (kode) => {
    let gen_kode = "00";

    if(kode !== null ) {
        gen_kode = kode 
    }
    
    let kode1 = parseInt(gen_kode.charAt(2));
    let kode2 = parseInt(gen_kode.charAt(3));

    if(kode1 > 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1 ;
            kode2 = 0 ;
            kode_hasil = "P." + kode1.toString() + kode2.toString();
        } else {
            kode_hasil = "P." + parseInt(gen_kode) + 1
        }
    }

    if(kode1 === 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1;
            kode2 = 0;
            kode_hasil = "P." + kode1.toString() + kode2.toString();
        } else {
            kode_hasil = "P." + kode1.toString() + String(parseInt(kode2) + 1);
        }
    }

    if(kode === null) {
        kode_hasil = "P.01";
    }
    
    return kode_hasil;
}

exports.kodetugastambahan = (kode) => {
    let gen_kode = "00";

    if(kode !== null ) {
        gen_kode = kode 
    }
    
    let kode1 = parseInt(gen_kode.charAt(2));
    let kode2 = parseInt(gen_kode.charAt(3));

    if(kode1 > 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1 ;
            kode2 = 0 ;
            kode_hasil = "T." + kode1.toString() + kode2.toString();
        } else {
            kode_hasil = "T." + parseInt(gen_kode) + 1
        }
    }

    if(kode1 === 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1;
            kode2 = 0;
            kode_hasil = "T." + kode1.toString() + kode2.toString();
        } else {
            kode_hasil = "T." + kode1.toString() + String(parseInt(kode2) + 1);
        }
    }

    if(kode === null) {
        kode_hasil = "T.01";
    }
    
    return kode_hasil;
}

exports.kodesubtugas = (kode) => {
    let gen_kode = "00";

    if(kode !== null ) {
        gen_kode = kode 
    }
    
    let kode1 = parseInt(gen_kode.charAt(5));
    let kode2 = parseInt(gen_kode.charAt(6));

    if(kode1 > 0) {
        if(kode2 === 9) {
            kode1 = parseInt(kode1) + 1 ;
            kode2 = 0 ;
            kode_hasil =  kode1.toString() + kode2.toString();
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
        kode_hasil = "01";
    }
    
    return kode_hasil;
}

