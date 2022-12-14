-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_asset
CREATE DATABASE IF NOT EXISTS `db_asset` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db_asset`;

-- Dumping structure for table db_asset.log_rkbmut_pemanfaatan
CREATE TABLE IF NOT EXISTS `log_rkbmut_pemanfaatan` (
  `kode_log_rkbmut_pemanfaatan` int(11) NOT NULL AUTO_INCREMENT,
  `kode_unit_kerja` char(16) NOT NULL,
  `tahun` char(4) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `nup` varchar(50) NOT NULL,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `total_realisasi_pnpb` decimal(20,2) DEFAULT NULL,
  `jumlah_item` int(11) DEFAULT NULL,
  `kode_bentuk_pemanfaatan` char(1) DEFAULT NULL,
  `peruntukan` varchar(255) DEFAULT NULL,
  `jangka_waktu` int(11) DEFAULT NULL,
  `potensi_pnpb` decimal(20,2) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `event_trigger` varchar(50) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_log_rkbmut_pemanfaatan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.log_rkbmut_pemanfaatan: ~0 rows (approximately)

-- Dumping structure for table db_asset.log_rkbmut_pengadaan
CREATE TABLE IF NOT EXISTS `log_rkbmut_pengadaan` (
  `kode_log_rkbmut_pengadaan` int(11) NOT NULL AUTO_INCREMENT,
  `kode_skema_pengadaan` int(11) DEFAULT NULL,
  `kode_kegiatan_rkt` int(11) DEFAULT NULL,
  `kode_unit_kerja` char(16) DEFAULT NULL,
  `kode_asset` char(10) DEFAULT NULL,
  `kuantitas` int(11) DEFAULT NULL,
  `sbsk` int(11) DEFAULT NULL,
  `existing_bmut` int(11) DEFAULT NULL,
  `kebutuhan_riil` int(11) DEFAULT NULL,
  `revisi_ke` int(11) DEFAULT NULL,
  `status_paraf` int(11) DEFAULT NULL,
  `status_revisi` int(11) DEFAULT NULL,
  `event_trigger` varchar(255) DEFAULT NULL,
  `keterangan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_log_rkbmut_pengadaan`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.log_rkbmut_pengadaan: ~8 rows (approximately)
INSERT INTO `log_rkbmut_pengadaan` (`kode_log_rkbmut_pengadaan`, `kode_skema_pengadaan`, `kode_kegiatan_rkt`, `kode_unit_kerja`, `kode_asset`, `kuantitas`, `sbsk`, `existing_bmut`, `kebutuhan_riil`, `revisi_ke`, `status_paraf`, `status_revisi`, `event_trigger`, `keterangan`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	(11, 1, 5, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, NULL, 0, 'CREATE', 'Tidak Ada', NULL, NULL, NULL, '2022-12-28 05:22:50'),
	(12, 1, 5, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, NULL, 0, 'CREATE', 'Tidak Ada', NULL, NULL, NULL, '2022-12-28 05:22:50'),
	(13, 1, 5, 'UN31.UPBJ', '3100102002', 20, 15, 15, 15, 3, 2, 2, 'UPDATE', 'Ganti', NULL, NULL, NULL, '2022-12-28 05:32:55'),
	(14, 1, 5, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 4, 2, 1, 'UPDATE', 'Tetap di Angka Ini', NULL, NULL, NULL, '2022-12-28 05:33:18'),
	(15, 1, 5, 'UN31.UPBJ', '3100102002', 20, 15, 15, 15, 5, 2, 2, 'UPDATE', 'Ganti', NULL, NULL, NULL, '2022-12-28 05:33:30'),
	(16, 1, 5, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 6, 2, 1, 'UPDATE', 'Tetap di Angka Ini', NULL, NULL, NULL, '2022-12-28 05:34:00'),
	(17, 1, 3, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, NULL, 0, 'CREATE', 'Tidak Ada', NULL, NULL, NULL, '2022-12-29 07:43:53'),
	(18, 1, 3, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, NULL, 0, 'CREATE', 'Tidak Ada', NULL, NULL, NULL, '2022-12-29 07:43:53');

-- Dumping structure for table db_asset.ref_asset
CREATE TABLE IF NOT EXISTS `ref_asset` (
  `kode_bidang` char(3) DEFAULT NULL,
  `kode_kartu` varchar(1) DEFAULT NULL,
  `kode_asset` char(10) NOT NULL,
  `nama_asset` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_asset: ~603 rows (approximately)
INSERT INTO `ref_asset` (`kode_bidang`, `kode_kartu`, `kode_asset`, `nama_asset`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('201', '3', '2010104001', 'Tanah Bangunan Kantor Pemerintah                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:53:21'),
	('301', '1', '3010110005', 'Forklift                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:54:27'),
	('301', '1', '3010110015', 'Hand Palet Truck                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:55:31'),
	('301', '1', '3010302001', 'Elevator /Lift                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:55:37'),
	('301', '1', '3010302005', 'Gandola                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:55:46'),
	('301', '1', '3010305005', 'Sumersible Pump                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:55:48'),
	('301', '1', '3010305007', 'Pompa Angin                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:55:55'),
	('301', '1', '3010305010', 'Pompa Air                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:55:57'),
	('301', '1', '3010305999', 'Pompa Lainnya                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:56:02'),
	('301', '1', '3010307010', 'Mesin Diesel                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:56:03'),
	('302', '3', '3020101001', 'Sedan                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:57:13'),
	('302', '3', '3020101002', 'Jeep                                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:57:58'),
	('302', '3', '3020102002', 'Micro Bus ( Penumpang 15 S/D 29 Orang )                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:00'),
	('302', '3', '3020102003', 'Mini Bus ( Penumpang 14 Orang Kebawah )                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:01'),
	('302', '3', '3020103001', 'Truck + Attachment                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:01'),
	('302', '3', '3020103002', 'Pick Up                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:02'),
	('302', '3', '3020103004', 'Semi Trailer                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:03'),
	('302', '3', '3020104001', 'Sepeda Motor                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:03'),
	('302', '3', '3020105001', 'Mobil Ambulance                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:04'),
	('302', '3', '3020105102', 'Mobil Golfcar                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:10'),
	('302', '1', '3020107006', 'Trolly Car/Lori                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:11'),
	('302', '1', '3020201002', 'Gerobak Dorong                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:12'),
	('302', '1', '3020201004', 'Lori Dorong                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:12'),
	('302', '1', '3020201007', 'Pallet Dolly                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:13'),
	('302', '1', '3020201009', 'Baggage Trolly                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:13'),
	('302', '1', '3020201010', 'Meja Dorong Saji/Trolley Saji                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:27'),
	('303', '1', '3030101005', 'Mesin Bor                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:56'),
	('303', '1', '3030103003', 'Transformator                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:57'),
	('303', '1', '3030104001', 'Auto Lift                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:58:58'),
	('303', '1', '3030104003', 'Steam Cleaner                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:00'),
	('303', '1', '3030203001', 'Perkakas Bengkel Service                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:01'),
	('303', '1', '3030205001', 'Tool Kit Set                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:01'),
	('303', '1', '3030205002', 'Tool Kit Box                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:02'),
	('303', '1', '3030205003', 'Tool Cabinet Set                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:02'),
	('303', '1', '3030205027', 'Scafolding Set & Tool                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:03'),
	('303', '1', '3030208013', 'Kunci Pas                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:05'),
	('303', '1', '3030211008', 'Cermin Besar                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:06'),
	('303', '1', '3030212016', 'Mesin Battery Set / Pengisi Accu                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:07'),
	('303', '1', '3030212036', 'Mesin Cuci kendaraan/ Car Washer                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:07'),
	('303', '1', '3030301002', 'Audio Signal Source                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:08'),
	('303', '1', '3030301064', 'Memori Programmer                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:08'),
	('303', '1', '3030307010', 'Scanner (Universal Tester)                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:10'),
	('303', '1', '3030308012', 'Termometer Standar                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:10'),
	('303', '1', '3030308016', 'Hardnes Tester                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:11'),
	('303', '1', '3030308032', 'Tang Plombir / Segel                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:53'),
	('304', '1', '3040102006', 'Penyemprot Mesin (Power Sprayer)                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:56'),
	('304', '1', '3040104003', 'Rak-Rak Penyimpan                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:58'),
	('304', '1', '3040104004', 'Lemari Penyimpan                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:58'),
	('304', '1', '3040106043', 'Alat Pencacah Daun                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 06:59:58'),
	('304', '1', '3040106999', 'Alat Prosesing Lainnya                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:00:00'),
	('305', '1', '3050101001', 'Mesin Ketik Manual Portable (11-13 Inci)                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050101002', 'Mesin Ketik Manual Standard (14-16 Inci)                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050101004', 'Mesin Ketik Listrik                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050101005', 'Mesin Ketik Listrik Potable (11-13 Inci)                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050101008', 'Mesin Ketik Elektronik/Selektrik                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050102001', 'Mesin Hitung Manual                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050102002', 'Mesin Hitung Listrik                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050102003', 'Mesin Hitung Elektronik/Calculator                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050102007', 'Mesin Penghitung Uang                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050102009', 'Mesin Penghitung Kertas/Pita Cukai                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050102999', 'Mesin Hitung/Mesin Jumlah Lainnya                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050103001', 'Mesin Stensil Manual Folio                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050103007', 'Mesin Fotocopy Folio                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050103008', 'Mesin Fotocopy Double Folio                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050103009', 'Mesin Fotocopy Electronic                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050103011', 'Mesin Fotocopy Lainnya                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104001', 'Lemari Besi/Metal                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104002', 'Lemari Kayu                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104003', 'Rak Besi                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104004', 'Rak Kayu                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104005', 'Filing Cabinet Besi                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104006', 'Filing Cabinet Kayu                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104007', 'Brandkas                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104008', 'Peti Uang/Cash Box/Coin Box                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104009', 'Kardex Besi                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104013', 'Buffet                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104014', 'Mobile File                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104015', 'Locker                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104016', 'Roll Opek                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104017', 'Tempat Menyimpan Gambar                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104018', 'Kontainer                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104020', 'Lemari Display                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050104999', 'Alat Penyimpan Perlengkapan Kantor Lainnya                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105001', 'Tabung Pemadam Api                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105002', 'Hydrant                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105004', 'Fire Alarm                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105005', 'Rambu-Rambu                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105007', 'CCTV - Camera Control Television System                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105008', 'Papan Visual/Papan Nama                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105009', 'Movitex Board                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105010', 'White Board                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105011', 'Alat Detektor Uang Palsu                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105013', 'Copy Board/Elektric White Board                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105014', 'Peta                                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105015', 'Alat Penghancur Kertas                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105017', 'Mesin Absensi                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105023', 'Numerator                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105024', 'Alat Pemotong Kertas                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105025', 'Headmachine Besar                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105026', 'Perforator Besar                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105027', 'Alat Pencetak Label                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105028', 'Overhead Projector                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105029', 'Hand Metal Detector                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105031', 'Panel Pameran                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105032', 'Alat Pengaman / Sinyal                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105037', 'White Board Electronic                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105038', 'Laser Pointer                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105039', 'Display                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105044', 'Mesin Laminating                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105045', 'Penangkal Petir                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105046', 'Stempel Timbul/Bulat                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105047', 'Lampu-lampu Kristal                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105048', 'LCD Projector/Infocus                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105049', 'Flip Chart                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105050', 'Binding Machine                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105052', 'Alat Perekam Suara (Voice Pen)                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105053', 'Acces Control System                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105057', 'Pintu Elektrik (yang Memakai Akses)                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105058', 'Focusing Screen/Layar LCD Projector                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105060', 'Proyector Spider Bracket                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105068', 'Board Stan                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105074', 'Alat Penghancur Jarum                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105078', 'Mesin Packing/ Starpping Machine                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105080', 'Mesin Antrian                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105081', 'Papan Pengumuman                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105083', 'Teralis                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105093', 'Pallet Plastik                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105095', 'Wastafel Portable                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050105999', 'Perkakas Kantor Lainnya                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050199999', 'Alat Kantor Lainnya                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201001', 'Meja Kerja Besi/Metal                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201002', 'Meja Kerja Kayu                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201003', 'Kursi Besi/Metal                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201004', 'Kursi Kayu                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201005', 'Sice                                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201006', 'Bangku Panjang Besi/Metal                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201007', 'Bangku Panjang Kayu                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201008', 'Meja Rapat                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201009', 'Meja Komputer                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201010', 'Tempat Tidur Besi                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201011', 'Tempat Tidur Kayu                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201012', 'Meja Ketik                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201013', 'Meja Telepon                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201014', 'Meja Resepsionis                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201016', 'Kasur/Spring Bed                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201017', 'Sketsel                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201018', 'Meja Makan Besi                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201019', 'Meja Makan Kayu                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201020', 'Kursi Fiber Glas/Plastik                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201021', 'Pot Bunga                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201022', 'Partisi                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201024', 'Rak Sepatu ( Almunium )                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201025', 'Gantungan Jas                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201026', 'Nakas                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201028', 'Workstation                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201029', 'Backdrop TV/Wardrobe                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050201999', 'Meubelair Lainnya                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050202001', 'Jam Mekanis                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050202003', 'Jam Elektronik                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050202999', 'Alat Pengukur Waktu Lainnya                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050203001', 'Mesin Penghisap Debu/Vacuum Cleaner                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050203002', 'Mesin Pel/Poles                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050203003', 'Mesin Pemotong Rumput                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050203004', 'Mesin Cuci                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050203005', 'Air Cleaner                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050203999', 'Alat Pembersih Lainnya                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204001', 'Lemari Es                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204002', 'A.C. Sentral                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204003', 'A.C. Window                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204004', 'A.C. Split                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204005', 'Portable Air Conditioner (Alat Pendingin)                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204006', 'Kipas Angin                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204007', 'Exhause Fan                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050204999', 'Alat Pendingin Lainnya                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205001', 'Kompor Listrik (Alat Dapur)                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205002', 'Kompor Gas (Alat Dapur)                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205004', 'Teko Listrik                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205005', 'Rice Cooker (Alat Dapur)                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205006', 'Oven Listrik                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205008', 'Kitchen Set                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205009', 'Tabung Gas                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205011', 'Treng Air/Tandon Air                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205014', 'Alat Pemanggang Roti/Sate                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205015', 'Rak Piring Alumunium                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205018', 'Blender                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205019', 'Mixer                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205025', 'Thermos Air                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050205999', 'Alat Dapur Lainnya                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206001', 'Radio                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206002', 'Televisi                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206004', 'Tape Recorder (Alat Rumah Tangga Lainnya ( Home Use ))           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206005', 'Amplifier                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206006', 'Equalizer                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206007', 'Loudspeaker                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206008', 'Sound System                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206009', 'Compact Disc Player (Alat Rumah Tangga)                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206011', 'Karaoke                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206012', 'Wireless                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206013', 'Megaphone                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206014', 'Microphone                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206015', 'Microphone Table Stand                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206016', 'Mic Conference                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206017', 'Unit Power Supply                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206019', 'Stabilisator                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206020', 'Camera Video                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206023', 'Timbangan Orang                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206024', 'Timbangan Barang                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206025', 'Alat Hiasan                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206026', 'Lambang Garuda Pancasila                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206027', 'Gambar Presiden/Wakil Presiden                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206028', 'Lambang Korpri/Dharma Wanita                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206029', 'Aquarium (Alat Rumah Tangga Lainnya ( Home Use ))                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206030', 'Tiang Bendera                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206032', 'Seterika                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206033', 'Water Filter                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206034', 'Tangga Aluminium                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206035', 'Kaca Hias                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206036', 'Dispenser                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206037', 'Mimbar/Podium                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206042', 'Lambang Instansi                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206043', 'Lonceng/Genta                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206045', 'Coffee Maker                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206046', 'Handy Cam                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206050', 'Meja Potong                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206054', 'Mini Compo                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206055', 'Heater (Alat Rumah Tangga Lainnya ( Home Use ))                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206056', 'Karpet                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206057', 'Vertikal Blind                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206058', 'Gordyin/Kray                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206059', 'Kabel Roll                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206060', 'Asbak Tinggi                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206061', 'Keset Kaki                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206064', 'Lemari Plastik                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206065', 'Mesin Pengering Tangan                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206066', 'Panggung                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206068', 'DVD Player                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206069', 'Lampu Belajar                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206070', 'Tangga                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206071', 'Kabel                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206072', 'Lampu                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206078', 'Bingkai Foto                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206080', 'Bracket Standing Peralatan                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206081', 'Tangki Air                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206082', 'Home Theater                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206085', 'Tempat Sampah                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050206999', 'Alat Rumah Tangga Lainnya ( Home Use )                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('305', '1', '3050299999', 'Alat Rumah Tangga Lainnya                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:03:44'),
	('306', '1', '3060101001', 'Audio Mixing Console                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101002', 'Audio Mixing Portable                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101003', 'Audio Mixing Stationer                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101005', 'Audio Amplifier                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101008', 'Audio Monitor Active                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101009', 'Audio Monitor Passive                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101010', 'Audio Reverberation                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101016', 'Compact Disc Player (Peralatan Studio Audio)                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101017', 'Cassette Duplicator                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101018', 'Disc Record Player                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101022', 'Telephone Hybrid                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101023', 'Audio Phone In                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101025', 'Audio Visual                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101028', 'Audio Compressor                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101031', 'Intercom Unit                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101033', 'Set Studio Light Signal                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101036', 'Microphone/Wireless MIC                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101037', 'Microphone/Boom Stand                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101038', 'Microphone Connector Box                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101040', 'Power Supply Microphone                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101041', 'Professional Sound System                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101042', 'Audio Master Control Unit                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101044', 'Audio Announcer Desk                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101048', 'Uninterruptible Power Supply (UPS)                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101051', 'Automatic Voltage Regulator (AVR)                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101056', 'Battery Charger (Peralatan Studio Audio)                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101060', 'Power Amplifier                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101061', 'Paging Mic                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101065', 'Chairman/Audio Conference                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101073', 'Audio Cassette Recorder                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101078', 'Audio Maximizer                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101088', 'Voice Recorder                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101089', 'AM/FM Measurement                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101091', 'Digital LED Running Text                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101093', 'Digital Keyboard Technics                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101095', 'Paging System                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060101999', 'Peralatan Studio Audio Lainnya                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102003', 'Camera Electronic                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102005', 'Pulse Distribution Amplifier                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102008', 'Character Generator (Peralatan Studio Video Dan Film)            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102011', 'Video Distribution Amplifier                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102012', 'Video Monitor                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102013', 'Video Tape Recorder Portable                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102014', 'Video Tape Recorder Stationer                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102016', 'Video Switcher                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102024', 'Video Processor                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102027', 'Video Delay Unit                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102033', 'Camera Wall Box                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102034', 'Teleprompter                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102039', 'Editing Electronic                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102041', 'Remote Control Unit                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102042', 'Rak Peralatan                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102044', 'Digital Video Effect                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102045', 'Tripod Camera                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102046', 'Dimmer                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102055', 'Lighting Stand Tripod                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102056', 'Film Projector                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102057', 'Slide Projector                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102060', 'Camera Film                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102061', 'Lensa Kamera                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102072', 'Camera Adaptor                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102074', 'Micro Film                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102075', 'Mixer PVC                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102086', 'Alat Pemanas Prosesing ( Water Heater )                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102090', 'Meja Editing Film                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102099', 'Automatic Emergency Light                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102101', 'Photo Tustel                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102107', 'Layar Film/Projector                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102118', 'Head Set                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102120', 'Lighting Head Body                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102128', 'Camera Digital                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102129', 'Tas Kamera                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102130', 'Lampu Blitz Kamera                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102131', 'Lensa Filter                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102132', 'Video Conference                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102134', 'Video Router                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102138', 'Frame Synchronizer                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102146', 'Patch Cord                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102158', 'Monopod                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102159', 'Clipp On                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102163', 'Duplicator DVD                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102164', 'Video Splitter                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102165', 'Camera Conference                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102167', 'Drone                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060102999', 'Peralatan Studio Video Dan Film Lainnya                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060103999', 'Peralatan Studio Gambar Lainnya                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104006', 'Mesin Cetak                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104007', 'Mesin Cetak Offset Sheet                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104009', 'Mesin Cetak Offset Mini                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104013', 'Mesin Jilid Besar                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104014', 'Mesin Jilid                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104022', 'Mesin Pres                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104034', 'Mesin Kertas                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104045', 'Mesin Barcode                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104052', 'Mesin Pembuat ID Card                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060104999', 'Peralatan Cetak Lainnya                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060105041', 'Pantograph                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060199999', 'Alat Studio Lainnya                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201001', 'Telephone (PABX)                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201002', 'Intermediate Telephone/Key Telephone                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201003', 'Pesawat Telephone                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201004', 'Telephone Mobile                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201006', 'Handy Talky (HT)                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201007', 'Telex                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201010', 'Facsimile                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060201999', 'Alat Komunikasi Telephone Lainnya                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060205999', 'Alat Komunikasi Radio UHF Lainnya                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060206001', 'Publik Address (Lapangan)                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060206002', 'Wireless Amplifier                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060206999', 'Alat Komunikasi Sosial Lainnya                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060207005', 'Finger Printer Time and Attandance Acces Control System          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060209003', 'Controll Center                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060209006', 'Switching Matrix and Server                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060209007', 'Digital Recording System                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060209999', 'Alat Komunikasi Digital Dan Konvensional Lainnya                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060210004', 'Wireless Base Station + Surveillance Manpack Kit                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060299999', 'Alat Komunikasi Lainnya                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060310001', 'Antene SHF Portable                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060310999', 'Peralatan Antena SHF/Parabola Lainnya                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060319002', 'Switcher Manual                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060319999', 'Switcher Antena Lainnya                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060323015', 'Switcher/Patch Panel                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060323016', 'Audio Monitor                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060324001', 'Antene Penerima VHF                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060324005', 'Peralatan Antena Penerima MF+HF                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060333999', 'Peralatan Pemancar dan Penerima VHF lainnya                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060334011', 'Message Repeater                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060335002', 'Unit Transceiver SHF Portable                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060346004', 'Hand Set                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('306', '1', '3060347004', 'Charger                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101004', 'Stetoscope (Alat Kedokteran Umum)                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101005', 'Tensimeter                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101009', 'Timbangan Badan (Alat Kedokteran Umum)                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101020', 'Gunting Bengkok                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101026', 'Tabung 02                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101087', 'Kom Stainles (Drain,Gaas,Tampon)                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101097', 'Lemari Obat (Kaca)                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101122', 'Resusitasi Dewasa                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101127', 'Kursi Dorong                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101134', 'Suction Pump                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101155', 'UV Sterilizer                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070101999', 'Alat Kedokteran Umum Lainnya                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070102002', 'Dental Unit                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070102003', 'Dental X-Ray Unit                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070102008', 'Aero Sterisator                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070102056', 'Intra Olral                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070102067', 'Light Curing Unit                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070102999', 'Alat Kedokteran Gigi Lainnya                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070105094', 'Instrument Trolley, Stainless Steel                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070107063', 'Fiber Optic Operating                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070108024', 'Nebulizer                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070108025', 'Ultrasonic Nebulizer                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070108068', 'Defibrilator                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070108130', 'Pulse Oxymetry                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070111059', 'Tabung Periksa HB                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070114001', 'Electrocardiograph                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070114003', 'Oxygen Tank                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070119033', 'Uninterupted Power System                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070201006', 'Compressor                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070204001', 'Sepeda Statis                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('307', '1', '3070204999', 'Alat Kesehatan Olah Raga Lainnya                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080101009', 'Timbangan Elektronik                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080103002', 'Elektronik Thermometer                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080104011', 'Tools                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080106091', 'Pompa Hidrolik                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080110162', 'Electro Plating/Pelapisan Metal                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080111060', 'Condensor (Alat Laboratorium Umum)                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080111118', 'Microscope Dengan Camera                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080111125', 'Refrigerator                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080111137', 'Tripod                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080111156', 'Mesin Pengayak                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080111223', 'Tabung Gas (Alat Laboratorium)                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080112025', 'Stabilizer                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080113081', 'TV Monitor                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080117016', 'Lemari Asam                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080120001', 'Adaptor (Alat Laboratorium Fisika)                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080120013', 'Bangku Optik                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080126013', 'Drawing Equipment                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080130005', 'Press Machine                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080133010', 'Exhaust Fan (Alat Laboratorium Proses Pengolahan Panas)          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080137022', 'Mesin Pemanas                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141005', 'Alat Pemadam Kebakaran                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141055', 'Data Recorder                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141101', 'Generator                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141143', 'Laminar Flow                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141170', 'Microwave Oven                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141194', 'Personal Computer                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141251', 'Stabilizer/UPS                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141270', 'Thermohidrometer                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080141330', 'Boster                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080142002', 'Perkakas                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080153999', 'Lainnya (Alat Laboratorium Kesehatan Kerja)                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080156012', 'Alat Tangki Pengapungan                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080156039', 'Alat Press Kertas                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080156081', 'Meja Kerja (Alat Laboratorium Lainnya)                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080163002', 'Board Display                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080203014', 'Recorder                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080203087', 'Transformer                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080203115', 'Manual Screen                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080204006', 'Water Chiller                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080205011', 'Fire Extinguisher                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080301019', 'Smoke Detecting System and Alarm                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080302035', 'Teletype Scanner                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080302039', 'Serial Scanner/Printer                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080305002', 'Uninterupted Power Supply (UPS)                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080306039', 'Infrared Thermometer                                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080402999', 'Alat Kesehatan Kerja Lainnya                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080403999', 'Proteksi Lingkungan Lainnya                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080603001', 'Tape Recorder (Alat Laboratorium Kebisingan Dan Getaran)         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080704006', 'Control Panel                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('308', '1', '3080715005', 'Lighting Equipment                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('309', '1', '3090402006', 'Public Adress                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100101001', 'Mainframe (Komputer Jaringan)                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100101003', 'Local Area Network (LAN)                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100102001', 'P.C Unit                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100102002', 'Lap Top                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100102003', 'Note Book                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100102006', 'Thinclient                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100102009', 'Tablet PC                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100102999', 'Personal Komputer Lainnya                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201001', 'Card Reader (Peralatan Mainframe)                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201003', 'Floppy Disk Unit (Peralatan Mainframe)                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201004', 'Storage Modul Disk (Peralatan Mainframe)                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201006', 'CPU (Peralatan Mainframe)                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201008', 'Hard Copy Console                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201009', 'Serial Printer                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201010', 'Line Printer                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201012', 'Hard Disk                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201013', 'Keyboard (Peralatan Mainframe)                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100201999', 'Peralatan Mainframe Lainnya                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202001', 'Card Reader (Peralatan Mini Komputer)                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202003', 'Floppy Disk Unit (Peralatan Mini Komputer)                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202004', 'Storage Modul Disk (Peralatan Mini Komputer)                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202006', 'CPU (Peralatan Mini Komputer)                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202010', 'Scanner (Peralatan Mini Komputer)                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202011', 'Computer Compatible                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202014', 'Keyboard (Peralatan Mini Komputer)                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202015', 'Auto Switch/Data Switch                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100202017', 'Speaker Komputer                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203001', 'CPU (Peralatan Personal Komputer)                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203002', 'Monitor                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203003', 'Printer (Peralatan Personal Komputer)                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203004', 'Scanner (Peralatan Personal Komputer)                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203005', 'Plotter (Peralatan Personal Komputer)                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203007', 'External                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203009', 'Keyboard (Peralatan Personal Komputer)                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203013', 'Capture Card                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203015', 'External CD/ DVD Drive (ROM)                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203017', 'External/ Portable Hardisk                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100203999', 'Peralatan Personal Komputer Lainnya                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204001', 'Server                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204002', 'Router                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204003', 'Hub                                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204004', 'Modem                                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204005', 'Netware Interface External                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204006', 'Repeater and Transciever                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204011', 'Character Terminal                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204014', 'Rak Server                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204015', 'Firewall                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204016', 'Switch Rak                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204020', 'CAT 6 Cable                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204021', 'Kabel UTP                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204023', 'Wireless Access Point                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204024', 'Switch                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204026', 'Acces Point                                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204027', 'Rackmount                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204028', 'KVM Keyboard Video Monitor                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204029', 'Mobile Modem GSM/ CDMA                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100204999', 'Peralatan Jaringan Lainnya                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('310', '1', '3100299999', 'Peralatan Komputer Lainnya                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('313', '1', '3130301010', 'Boiler                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('315', '1', '3150399999', 'Alat SAR Lainnya                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('315', '1', '3150404003', 'Public Address Branch Exchange (PABX)                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('315', '1', '3150404008', 'Fire Alarm System                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('315', '1', '3150405001', 'Genset                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('317', '1', '3170119004', 'Jet Pump                                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('317', '1', '3170119019', 'Blower                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('317', '1', '3170120017', 'Pallet                                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('317', '1', '3170122014', 'Microwave Heater                                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('318', '1', '3180102009', 'Rambu-rambu Petunjuk/Penuntun                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('319', '1', '3190102001', 'Alat Tenis Meja                                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('319', '1', '3190102004', 'Alat Badminton                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('319', '1', '3190102999', 'Peralatan Permainan Lainnya                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('319', '1', '3190103019', 'Massage Chair                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('319', '1', '3190106999', 'Peralatan Olah Raga Lainnya                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:16:20'),
	('401', '3', '4010101001', 'Bangunan Gedung Kantor Permanen                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010101002', 'Bangunan Gedung Kantor Semi Permanen                             ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010102001', 'Bangunan Gudang Tertutup Permanen                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010102003', 'Bangunan Gudang Tertutup Darurat                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010102004', 'Bangunan Gudang Terbuka Permanen                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010102999', 'Bangunan Gudang Lainnya                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010104999', 'Bangunan Gedung Instalasi Lainnya                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010105001', 'Bangunan Gedung Laboratorium Permanen                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010106010', 'Bangunan Klinik/Puskesmas                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010108001', 'Bangunan Gedung Tempat Ibadah Permanen                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010109001', 'Bangunan Gedung Pertemuan Permanen                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010110001', 'Bangunan Gedung Pendidikan Permanen                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010110004', 'Bangunan Gedung Pendidikan dan Latihan                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010111004', 'Bangunan Olah Raga Terbuka Permanen                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010111005', 'Bangunan Olah Raga Terbuka Semi Permanen                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010112001', 'Gedung Pertokoan/Koperasi/Pasar Permanen                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010113001', 'Gedung Pos Jaga Permanen                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010114001', 'Gedung Garasi/Pool Permanen                                      ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010114002', 'Gedung Garasi/Pool Semi Permanen                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010116001', 'Bangunan Gedung Perpustakaan Permanen                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010125999', 'Bangunan Terbuka Lainnya                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010132001', 'Bangunan Tempat Parkir                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010133001', 'Bangunan Parkir Terbuka Permanen                                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010133002', 'Bangunan Parkir Terbuka Semi Permanen                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010133999', 'Bangunan Parkir Lainnya                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010134999', 'Taman Lainnya                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('401', '3', '4010204001', 'Mess/Wisma/Bungalow/Tempat Peristirahatan Permanen               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('404', '3', '4040104001', 'Pagar Permanen                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('501', '3', '5010109002', 'Jalan Khusus Kompleks                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('501', '3', '5010109003', 'Jalan Khusus Proyek                                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('501', '3', '5010199999', 'Jalan Lainnya                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('501', '3', '5010209007', 'Jembatan Pada Jalan Khusus Perorangan                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('502', '3', '5020106009', 'Bangunan Pelimpah Sampah                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('502', '3', '5020106017', 'Bangunan Talud Penahan                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('502', '3', '5020501001', 'Embung/Waduk Lapangan                                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('502', '3', '5020605007', 'Bangunan Mandi Cuci Kakus (MCK)                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('502', '3', '5020703002', 'Saluran Pembuang Air Buangan Domestik                            ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030101002', 'Instalasi Air Permukaan Kapasitas Sedang                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030502002', 'Instalasi PLTD Kapasitas Sedang                                  ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030602001', 'Instalasi Gardu Listrik Distribusi Kapasitas Kecil               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030602002', 'Instalasi Gardu Listrik Distribusi Kapasitas Sedang              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030603001', 'Instalasi Pusat Pengatur Listrik Kapasitas Kecil                 ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030603002', 'Instalasi Pusat Pengatur Listrik Kapasitas Sedang                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5030701004', 'Instalasi Komunikasi Elektronik (KOMLEK)                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('503', '3', '5031001004', 'Instalasi Komputer                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('504', '3', '5040199999', 'Jaringan Air Minum Lainnya                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('504', '3', '5040299999', 'Jaringan Listrik Lainnya                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('504', '3', '5040302001', 'Jaringan Telepon Dibawah Tanah Kapasitas Kecil                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('504', '3', '5040302003', 'Jaringan Telepon Dibawah Tanah Kapasitas Besar                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('504', '3', '5040399999', 'Jaringan Telepon Lainnya                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:17:40'),
	('601', '2', '6010101001', 'Monografi                                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010101999', 'Buku Lainnya                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010102004', 'Laporan                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010199999', 'Bahan Perpustakaan Tercetak Lainnya                              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010201003', 'CD/VCD/DVD/LD                                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010201028', 'Peta Digital                                                     ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010299999', 'Bahan Perpustakaan Terekam Dan Bentuk Mikro Lainnya              ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010301001', 'Peta (Map)                                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010301999', 'Bahan Kartografi Lainnya                                         ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010303001', 'Lukisan Kanvas                                                   ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('601', '2', '6010303999', 'Ukiran dan Lukisan Lainnya                                       ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('602', '2', '6020101001', 'Alat Musik Tradisional/Daerah                                    ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('602', '2', '6020101002', 'Alat Musik Modern/Band                                           ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('602', '2', '6020101999', 'Alat Musik Lainnya                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('602', '2', '6020102003', 'Lukisan Cat Minyak                                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('607', '2', '6070301001', 'Gedung dan Bangunan Dalam Renovasi                               ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('801', '2', '8010101001', 'Software Komputer                                                ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('801', '2', '8010101002', 'Lisensi                                                          ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32'),
	('801', '2', '8010101999', 'Aset Tak Berwujud Lainnya                                        ', NULL, NULL, '2022-11-16 13:10:49', '2022-12-14 07:18:32');

-- Dumping structure for table db_asset.ref_bentuk_pemanfaatan
CREATE TABLE IF NOT EXISTS `ref_bentuk_pemanfaatan` (
  `kode_bentuk_pemanfaatan` char(1) NOT NULL,
  `nama_bentuk_pemanfaatan` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_bentuk_pemanfaatan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_bentuk_pemanfaatan: ~6 rows (approximately)
INSERT INTO `ref_bentuk_pemanfaatan` (`kode_bentuk_pemanfaatan`, `nama_bentuk_pemanfaatan`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', 'Sewa ', NULL, NULL, '2022-09-21 09:28:15', '2022-09-21 09:28:26'),
	('2', 'Pinjam Pakai ', NULL, NULL, '2022-09-21 09:28:32', '2022-09-21 09:28:39'),
	('3', 'Kerja Sama Pemanfaatan ', NULL, NULL, '2022-09-21 09:28:43', '2022-09-21 09:28:47'),
	('4', 'Kerja Sama Pemanfaatan Infrastruktur ', NULL, NULL, '2022-09-21 09:28:56', NULL),
	('5', 'Bangun Guna Serah atau Bagun Serah Guna ', NULL, NULL, '2022-09-21 09:29:03', '2022-09-21 09:29:05'),
	('6', 'KETUPI ', NULL, NULL, '2022-09-21 09:29:14', NULL);

-- Dumping structure for table db_asset.ref_bidang
CREATE TABLE IF NOT EXISTS `ref_bidang` (
  `kode_golongan` char(1) DEFAULT NULL,
  `kode_bidang` char(3) NOT NULL,
  `jenis_bidang` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_bidang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_bidang: ~39 rows (approximately)
INSERT INTO `ref_bidang` (`kode_golongan`, `kode_bidang`, `jenis_bidang`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', '101', 'Barang Pakai Habis', NULL, NULL, '2022-12-14 05:01:07', NULL),
	('1', '102', 'Barang Tak Habis Pakai', NULL, NULL, '2022-12-14 05:01:25', NULL),
	('1', '103', 'Barang Bekas Dipakai', NULL, NULL, '2022-12-14 05:00:49', NULL),
	('2', '201', 'Tanah', NULL, NULL, '2022-12-14 05:11:21', NULL),
	('3', '301', 'Alat Besar', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '302', 'Alat Angkutan', NULL, NULL, '2022-12-14 05:11:35', NULL),
	('3', '303', 'Alat Bengkel dan Alat Ukur', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '304', 'Alat Pertanian', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '305', 'Alat Kantor dan Rumah Tangga', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '306', 'Alat Studio, Komunikasi dan Pemancar', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '307', 'Alat Kedokteran dan Kesehatan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '308', 'Alat Laboratorium', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '309', 'Alat Persenjataan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '310', 'Komputer', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '311', 'Alat Eksplorasi', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '312', 'Alat Pengeboran', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '313', 'Alat Produksi, Pengolahan dan Pemurnian', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '314', 'Alat Bantu Eksplorasi', NULL, NULL, '2022-12-14 05:11:56', NULL),
	('3', '315', 'Alat Keselamatan Kerja', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '316', 'Alat Peraga', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '317', 'Peralatan Proses / Produksi', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '318', 'Rambu - Rambu', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('3', '319', 'Peralatan Olahraga', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('4', '401', 'Bangunan Gedung', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('4', '402', 'Monumen', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('4', '403', 'Bangunan Menara', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('4', '404', 'Tugu Titik Kontrol/Pasti', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('5', '501', 'Jalan dan Jembatan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('5', '502', 'Bangunan Air', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('5', '503', 'Instalasi', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('5', '504', 'Jaringan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '601', 'Bahan Perpustakaan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '602', 'Barang Bercorak Kesenian/Kebudayaan/Olahraga', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '603', 'Hewan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '604', 'Ikan', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '605', 'Tanaman', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '606', 'Barang Koleksi Non Budaya', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('6', '607', 'Aset Tetap Dalam Renovasi', NULL, NULL, '2022-12-14 05:12:14', NULL),
	('7', '701', 'Konstruksi Dalam Pengerjaan', NULL, NULL, '2022-12-14 05:12:14', '2022-12-14 06:13:49'),
	('8', '801', 'Aset Tak Berwujud', NULL, NULL, '2022-12-14 05:12:14', '2022-12-14 06:13:54'),
	('8', '802', 'Aset Tak berwujud Dalam Penyelesaian', NULL, NULL, '2022-12-14 05:12:14', '2022-12-14 06:13:52'),
	('8', '803', 'Aset Kemitraan', NULL, NULL, '2022-12-14 05:12:14', '2022-12-14 06:13:46');

-- Dumping structure for table db_asset.ref_catat
CREATE TABLE IF NOT EXISTS `ref_catat` (
  `kode_catat` char(1) NOT NULL,
  `nama_catat` varchar(100) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_catat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_catat: ~3 rows (approximately)
INSERT INTO `ref_catat` (`kode_catat`, `nama_catat`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', 'dbr', NULL, NULL, '2022-07-22 08:57:56', NULL),
	('2', 'dbl', NULL, NULL, '2022-07-22 08:58:00', '2022-07-22 08:58:03'),
	('3', 'kib', NULL, NULL, '2022-07-22 08:58:10', NULL);

-- Dumping structure for table db_asset.ref_daftar_barang
CREATE TABLE IF NOT EXISTS `ref_daftar_barang` (
  `kode_barang` int(11) NOT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `kode_asset_nup` int(11) DEFAULT NULL,
  `nup` varchar(50) DEFAULT NULL,
  `kode_asset` char(10) DEFAULT NULL,
  `merk` varchar(255) DEFAULT NULL,
  `tanggal_perolehan` date DEFAULT NULL,
  `qr_kode` varchar(255) DEFAULT NULL,
  `kode_ruang` char(7) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `nilai_item` decimal(12,2) DEFAULT NULL,
  `kondisi` enum('Baik','Rusak Ringan','Rusak Berat') DEFAULT NULL,
  `optional_key` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_barang`,`kode_pembukuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_daftar_barang: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_dokumen_pemilik
CREATE TABLE IF NOT EXISTS `ref_dokumen_pemilik` (
  `kode_dokumen_pemilik` int(1) DEFAULT NULL,
  `nama_dokumen_pemilik` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_dokumen_pemilik: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_dokumen_tanah
CREATE TABLE IF NOT EXISTS `ref_dokumen_tanah` (
  `kode_dokumen` int(1) NOT NULL DEFAULT 1,
  `nama_dokumen` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_dokumen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_dokumen_tanah: ~2 rows (approximately)
INSERT INTO `ref_dokumen_tanah` (`kode_dokumen`, `nama_dokumen`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(1, 'Bersertifikat atas nama Pemerintah RI c.q Kementrian / Lembaga', NULL, NULL, '2022-08-12 08:17:35', NULL),
	(2, 'Bersertifikat atas nama Kementrian / Lembaga', NULL, NULL, '2022-08-12 08:19:03', '2022-08-12 08:19:21');

-- Dumping structure for table db_asset.ref_golongan
CREATE TABLE IF NOT EXISTS `ref_golongan` (
  `kode_golongan` char(1) NOT NULL,
  `nama_golongan` varchar(50) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_golongan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_golongan: ~8 rows (approximately)
INSERT INTO `ref_golongan` (`kode_golongan`, `nama_golongan`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', 'Persediaan', NULL, NULL, '2022-12-14 04:49:12', NULL),
	('2', 'Tanah', NULL, NULL, '2022-12-14 04:49:17', NULL),
	('3', 'Peralatan dan Mesin', NULL, NULL, '2022-12-14 04:49:29', NULL),
	('4', 'Gedung dan bangunan', NULL, NULL, '2022-12-14 04:49:39', NULL),
	('5', 'Jalan, Irigasi dan Jaringan', NULL, NULL, '2022-12-14 04:49:55', NULL),
	('6', 'Aset Tetap Lainnya', NULL, NULL, '2022-12-14 04:50:09', NULL),
	('7', 'Konstruksti Dalam Pengerjaan', NULL, NULL, '2022-12-14 04:50:27', NULL),
	('8', 'Aset Tak Berwujud', NULL, NULL, '2022-12-14 04:50:37', NULL);

-- Dumping structure for table db_asset.ref_identifikasi_kebutuhan_1
CREATE TABLE IF NOT EXISTS `ref_identifikasi_kebutuhan_1` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `waktu_pemanfaatan` int(11) DEFAULT NULL,
  `perkiraan_pengadaan` int(11) DEFAULT NULL,
  `pihak_pengguna` varchar(255) DEFAULT NULL,
  `ekatalog` enum('iya','tidak') DEFAULT NULL,
  `tingkat_prioritas` enum('tinggi','sedang','kecil') DEFAULT NULL,
  `perkiraan_biaya` decimal(12,2) DEFAULT NULL,
  `kegunaan` varchar(255) DEFAULT NULL,
  `spesifikasi` varchar(255) DEFAULT NULL,
  `kebutuhan_riil` int(11) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_identifikasi_kebutuhan_1: ~3 rows (approximately)
INSERT INTO `ref_identifikasi_kebutuhan_1` (`kode_kegiatan_rkt`, `kode_asset`, `waktu_pemanfaatan`, `perkiraan_pengadaan`, `pihak_pengguna`, `ekatalog`, `tingkat_prioritas`, `perkiraan_biaya`, `kegunaan`, `spesifikasi`, `kebutuhan_riil`, `komentar`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(3, '3100102002', 5, 0, 'User', 'iya', 'tinggi', 5000000000.00, NULL, NULL, NULL, '', NULL, NULL, '2022-12-29 07:48:26', '2022-12-29 10:51:50'),
	(3, '3100102009', 5, 0, 'User', 'iya', 'tinggi', 5000000000.00, NULL, NULL, NULL, '', NULL, NULL, '2022-12-29 07:48:20', '2022-12-29 10:51:53'),
	(5, '3100102002', 5, 0, 'User', 'iya', 'tinggi', 5000000000.00, NULL, NULL, NULL, '', NULL, NULL, '2022-12-28 05:36:52', '2022-12-29 10:50:16'),
	(5, '3100102009', 5, 0, 'User', 'iya', 'tinggi', 5000000000.00, NULL, NULL, NULL, '', NULL, NULL, '2022-12-29 07:48:33', '2022-12-29 10:56:33');

-- Dumping structure for table db_asset.ref_identifikasi_kebutuhan_2
CREATE TABLE IF NOT EXISTS `ref_identifikasi_kebutuhan_2` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `jumlah_pegawai` int(11) DEFAULT NULL,
  `tingkat_beban_tugas` enum('tinggi','sedang','kecil') DEFAULT NULL,
  `jumlah_barang_tersedia` enum('ya','tidak') DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_identifikasi_kebutuhan_2: ~3 rows (approximately)
INSERT INTO `ref_identifikasi_kebutuhan_2` (`kode_kegiatan_rkt`, `kode_asset`, `jumlah_pegawai`, `tingkat_beban_tugas`, `jumlah_barang_tersedia`, `komentar`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(3, '3100102002', 10, 'tinggi', 'ya', '', NULL, NULL, '2022-12-29 07:48:26', '2022-12-29 10:51:50'),
	(3, '3100102009', 10, 'tinggi', 'ya', '', NULL, NULL, '2022-12-29 07:48:20', '2022-12-29 10:51:53'),
	(5, '3100102002', 10, 'tinggi', 'ya', '', NULL, NULL, '2022-12-28 05:36:52', '2022-12-29 10:50:16'),
	(5, '3100102009', 10, 'tinggi', 'ya', '', NULL, NULL, '2022-12-29 07:48:33', '2022-12-29 10:56:33');

-- Dumping structure for table db_asset.ref_identifikasi_kebutuhan_3
CREATE TABLE IF NOT EXISTS `ref_identifikasi_kebutuhan_3` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `existing_bmut` int(11) DEFAULT NULL,
  `kondisi_baik` int(11) DEFAULT NULL,
  `kondisi_rusak_ringan` int(11) DEFAULT NULL,
  `kondisi_rusak_berat` int(11) DEFAULT NULL,
  `pnbp` decimal(12,2) DEFAULT NULL,
  `rm` decimal(12,2) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `ucr` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_identifikasi_kebutuhan_3: ~3 rows (approximately)
INSERT INTO `ref_identifikasi_kebutuhan_3` (`kode_kegiatan_rkt`, `kode_asset`, `existing_bmut`, `kondisi_baik`, `kondisi_rusak_ringan`, `kondisi_rusak_berat`, `pnbp`, `rm`, `komentar`, `uch`, `udcr`, `ucr`, `udch`) VALUES
	(3, '3100102002', 2, 2, 0, 0, 500000000.00, 200000000.00, '', NULL, '2022-12-29 07:48:26', NULL, '2022-12-29 10:51:50'),
	(3, '3100102009', 2, 2, 0, 0, 500000000.00, 200000000.00, '', NULL, '2022-12-29 07:48:20', NULL, '2022-12-29 10:51:53'),
	(5, '3100102002', 2, 2, 0, 0, 500000000.00, 200000000.00, '', NULL, '2022-12-28 05:36:52', NULL, '2022-12-29 10:50:16'),
	(5, '3100102009', 2, 2, 0, 0, 500000000.00, 200000000.00, '', NULL, '2022-12-29 07:48:33', NULL, '2022-12-29 10:56:33');

-- Dumping structure for table db_asset.ref_identifikasi_kebutuhan_4
CREATE TABLE IF NOT EXISTS `ref_identifikasi_kebutuhan_4` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `barang_pasar` enum('ya','tidak') DEFAULT NULL,
  `produsen_syarat` enum('banyak','terbatas') DEFAULT NULL,
  `persyaratan_barang` enum('iya','tidak') DEFAULT NULL,
  `sedikit_tkdn` decimal(12,2) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `ucr` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_identifikasi_kebutuhan_4: ~3 rows (approximately)
INSERT INTO `ref_identifikasi_kebutuhan_4` (`kode_kegiatan_rkt`, `kode_asset`, `barang_pasar`, `produsen_syarat`, `persyaratan_barang`, `sedikit_tkdn`, `komentar`, `uch`, `udcr`, `ucr`, `udch`) VALUES
	(3, '3100102002', 'ya', 'banyak', 'iya', 200000000.00, '', NULL, '2022-12-29 07:48:26', NULL, '2022-12-29 10:51:50'),
	(3, '3100102009', 'ya', 'banyak', 'iya', 200000000.00, '', NULL, '2022-12-29 07:48:20', NULL, '2022-12-29 10:51:53'),
	(5, '3100102002', 'ya', 'banyak', 'iya', 200000000.00, '', NULL, '2022-12-28 05:36:52', NULL, '2022-12-29 10:50:16'),
	(5, '3100102009', 'ya', 'banyak', 'iya', 200000000.00, '', NULL, '2022-12-29 07:48:33', NULL, '2022-12-29 10:56:33');

-- Dumping structure for table db_asset.ref_identifikasi_kebutuhan_5
CREATE TABLE IF NOT EXISTS `ref_identifikasi_kebutuhan_5` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `cara_pengiriman` varchar(255) DEFAULT NULL,
  `cara_pengakuan` varchar(255) DEFAULT NULL,
  `cara_pemasangan` varchar(255) DEFAULT NULL,
  `cara_penimbunan` varchar(255) DEFAULT NULL,
  `cara_pengoperasian` varchar(255) DEFAULT NULL,
  `kebutuhan_pelatihan` varchar(255) DEFAULT NULL,
  `aspek_pengadaan` varchar(255) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `ucr` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_identifikasi_kebutuhan_5: ~4 rows (approximately)
INSERT INTO `ref_identifikasi_kebutuhan_5` (`kode_kegiatan_rkt`, `kode_asset`, `cara_pengiriman`, `cara_pengakuan`, `cara_pemasangan`, `cara_penimbunan`, `cara_pengoperasian`, `kebutuhan_pelatihan`, `aspek_pengadaan`, `komentar`, `uch`, `udcr`, `ucr`, `udch`) VALUES
	(3, '3100102002', 'kirim', 'ngaku', 'pasang', 'timbun', 'operasi', 'pelatihan', 'ada', '', NULL, '2022-12-29 07:48:26', NULL, '2022-12-29 10:51:50'),
	(3, '3100102009', 'kirim', 'ngaku', 'pasang', 'timbun', 'operasi', 'pelatihan', 'ada', '', NULL, '2022-12-29 07:48:20', NULL, '2022-12-29 10:51:53'),
	(5, '3100102002', 'kirim', 'ngaku', 'pasang', 'timbun', 'operasi', 'pelatihan', 'ada', '', NULL, '2022-12-28 05:36:52', NULL, '2022-12-29 10:50:16'),
	(5, '3100102009', 'kirim', 'ngaku', 'pasang', 'timbun', 'operasi', 'pelatihan', 'ada', '', NULL, '2022-12-29 07:48:33', NULL, '2022-12-29 10:56:33');

-- Dumping structure for table db_asset.ref_identifikasi_kebutuhan_6
CREATE TABLE IF NOT EXISTS `ref_identifikasi_kebutuhan_6` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `barang_sejenis` enum('ada','tidak') DEFAULT NULL,
  `konsolidasi` enum('rekomendasi','tidak rekomendasi') DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `ucr` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_identifikasi_kebutuhan_6: ~4 rows (approximately)
INSERT INTO `ref_identifikasi_kebutuhan_6` (`kode_kegiatan_rkt`, `kode_asset`, `barang_sejenis`, `konsolidasi`, `komentar`, `uch`, `udcr`, `ucr`, `udch`) VALUES
	(3, '3100102002', 'ada', 'rekomendasi', '', NULL, '2022-12-29 07:48:26', NULL, '2022-12-29 10:51:50'),
	(3, '3100102009', 'ada', 'rekomendasi', '', NULL, '2022-12-29 07:48:20', NULL, '2022-12-29 10:51:53'),
	(5, '3100102002', 'ada', 'rekomendasi', '', NULL, '2022-12-28 05:36:52', NULL, '2022-12-29 10:50:16'),
	(5, '3100102009', 'ada', 'rekomendasi', '', NULL, '2022-12-29 07:48:33', NULL, '2022-12-29 10:56:33');

-- Dumping structure for table db_asset.ref_jenis_trn
CREATE TABLE IF NOT EXISTS `ref_jenis_trn` (
  `no_sppa` char(5) NOT NULL,
  `kode_trn` char(3) NOT NULL,
  `jenis_trn` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`no_sppa`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_jenis_trn: ~2 rows (approximately)
INSERT INTO `ref_jenis_trn` (`no_sppa`, `kode_trn`, `jenis_trn`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('A0222', '101', 'Pembelian', NULL, NULL, '2022-07-21 03:49:48', NULL),
	('A0422', '103', 'Hibah (Masuk)', NULL, NULL, '2022-07-21 03:50:29', NULL);

-- Dumping structure for table db_asset.ref_kartu
CREATE TABLE IF NOT EXISTS `ref_kartu` (
  `kode_kartu` char(1) NOT NULL,
  `nama_kartu` varchar(15) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kartu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_kartu: ~2 rows (approximately)
INSERT INTO `ref_kartu` (`kode_kartu`, `nama_kartu`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', 'DBR', NULL, NULL, '2022-12-14 06:53:31', NULL),
	('2', 'DBL', NULL, NULL, '2022-12-14 06:53:31', NULL),
	('3', 'KIB', NULL, NULL, '2022-12-14 06:53:31', NULL);

-- Dumping structure for table db_asset.ref_kondisi_asset
CREATE TABLE IF NOT EXISTS `ref_kondisi_asset` (
  `kode_kondisi` char(1) NOT NULL,
  `nama_kondisi` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kondisi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_kondisi_asset: ~3 rows (approximately)
INSERT INTO `ref_kondisi_asset` (`kode_kondisi`, `nama_kondisi`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', 'Baik', NULL, NULL, '2022-07-19 04:16:12', NULL),
	('2', 'Rusak Ringan', NULL, NULL, '2022-07-19 04:16:12', NULL),
	('3', 'Rusak Berat', NULL, NULL, '2022-07-19 04:16:12', NULL);

-- Dumping structure for table db_asset.ref_kriteria_barang
CREATE TABLE IF NOT EXISTS `ref_kriteria_barang` (
  `kode_kriteria` int(11) NOT NULL AUTO_INCREMENT,
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `kriteria_barang` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kriteria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_kriteria_barang: ~8 rows (approximately)
INSERT INTO `ref_kriteria_barang` (`kode_kriteria`, `kode_kegiatan_rkt`, `kode_asset`, `kriteria_barang`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(1, 5, '3100102002', 'export luar negeri', NULL, NULL, '2022-12-28 05:36:52', '2022-12-28 05:36:52'),
	(2, 5, '3100102002', 'export dalam negeri', NULL, NULL, '2022-12-28 05:36:52', '2022-12-28 05:36:52'),
	(3, 3, '3100102009', 'export luar negeri', NULL, NULL, '2022-12-29 07:48:20', '2022-12-29 07:48:20'),
	(4, 3, '3100102009', 'export dalam negeri', NULL, NULL, '2022-12-29 07:48:20', '2022-12-29 07:48:20'),
	(5, 3, '3100102002', 'export luar negeri', NULL, NULL, '2022-12-29 07:48:26', '2022-12-29 07:48:26'),
	(6, 3, '3100102002', 'export dalam negeri', NULL, NULL, '2022-12-29 07:48:26', '2022-12-29 07:48:26'),
	(7, 5, '3100102009', 'export luar negeri', NULL, NULL, '2022-12-29 07:48:33', '2022-12-29 07:48:33'),
	(8, 5, '3100102009', 'export dalam negeri', NULL, NULL, '2022-12-29 07:48:33', '2022-12-29 07:48:33');

-- Dumping structure for table db_asset.ref_metode_kebutuhan
CREATE TABLE IF NOT EXISTS `ref_metode_kebutuhan` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `nama_rup` varchar(255) DEFAULT NULL,
  `jenis_pengadaan` varchar(255) DEFAULT NULL,
  `metode_pengadaan` enum('swakelola','penyedia') DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `uraian_pekerjaan` varchar(255) DEFAULT NULL,
  `spesifikasi` varchar(255) DEFAULT NULL,
  `volume` int(11) DEFAULT NULL,
  `satuan` varchar(255) DEFAULT NULL,
  `produksi_dalam_negeri` enum('ya','tidak') DEFAULT NULL,
  `usaha` enum('kecil','non kecil') DEFAULT NULL,
  `sumber_dana` enum('pnbp','rm') DEFAULT NULL,
  `pilih_penyedia_mulai` date DEFAULT NULL,
  `pilih_penyedia_selesai` date DEFAULT NULL,
  `pelaksanaan_kontrak_mulai` date DEFAULT NULL,
  `pelaksanaan_kontrak_selesai` date DEFAULT NULL,
  `rencana_pemanfaatan_mulai` date DEFAULT NULL,
  `rencana_pemanfaatan_selesai` date DEFAULT NULL,
  `upload_file` varchar(50) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_metode_kebutuhan: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_pembukuan
CREATE TABLE IF NOT EXISTS `ref_pembukuan` (
  `kode_asset` char(10) NOT NULL,
  `no_sppa` char(5) NOT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `jumlah_barang` int(11) DEFAULT NULL,
  `asal_perolehan` varchar(255) DEFAULT NULL,
  `no_bukti_perolehan` varchar(255) DEFAULT NULL,
  `tanggal_perolehan` date DEFAULT NULL,
  `tanggal_pembukuan` date DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `merk` varchar(255) DEFAULT NULL,
  `nilai_item` decimal(12,2) DEFAULT NULL,
  `total_nilai` decimal(20,2) DEFAULT NULL,
  `dasar_harga` enum('Perolehan','Taksiran') DEFAULT NULL,
  `metode_penyusutan` enum('Straight Line','Double Decline') DEFAULT NULL,
  `catat` enum('DBR','DBL','KIB') DEFAULT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_pembukuan`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_pembukuan: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_pindah_tangan
CREATE TABLE IF NOT EXISTS `ref_pindah_tangan` (
  `kode_pindah_tangan` char(1) DEFAULT NULL,
  `nama_pindah_tangan` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_pindah_tangan: ~4 rows (approximately)
INSERT INTO `ref_pindah_tangan` (`kode_pindah_tangan`, `nama_pindah_tangan`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	('1', 'Penjualan', NULL, NULL, NULL, '2022-10-10 06:51:18'),
	('2', 'Tukar Menukar', NULL, NULL, NULL, '2022-10-10 06:51:42'),
	('3', 'Hibah', NULL, NULL, NULL, '2022-10-10 06:51:55'),
	('4', 'PMPP', NULL, NULL, NULL, '2022-10-10 06:52:04');

-- Dumping structure for table db_asset.ref_rkbmut_pemanfaatan
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pemanfaatan` (
  `kode_unit_kerja` char(16) NOT NULL,
  `tahun` char(4) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `nup` varchar(50) NOT NULL,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `kondisi_barang` varchar(50) DEFAULT NULL,
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `status_paraf` int(11) DEFAULT 0,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `total_realisasi_pnpb` decimal(20,2) DEFAULT NULL,
  `jumlah_item` int(11) DEFAULT NULL,
  `kode_bentuk_pemanfaatan` char(1) DEFAULT NULL,
  `peruntukan` varchar(255) DEFAULT NULL,
  `jangka_waktu` int(11) DEFAULT NULL,
  `potensi_pnpb` decimal(20,2) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_asset`,`kode_unit_kerja`,`tahun`,`nup`,`revisi_ke`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pemanfaatan: ~2 rows (approximately)
INSERT INTO `ref_rkbmut_pemanfaatan` (`kode_unit_kerja`, `tahun`, `kode_asset`, `nup`, `status_revisi`, `revisi_ke`, `kondisi_barang`, `kode_status_pemilik`, `status_paraf`, `nama_unit_kerja`, `total_realisasi_pnpb`, `jumlah_item`, `kode_bentuk_pemanfaatan`, `peruntukan`, `jangka_waktu`, `potensi_pnpb`, `keterangan`, `komentar`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	('UN31.UPBJ', '2022', '2010101003', 'UN31.UPBJ.2010101003.1', 1, 0, 'Cek', '5', 2, 'Unit Pengadaan Barang dan Jasa', 2017.00, 20, '5', 'Baik', 2, 0.00, '', 'Tambahkan Sesuatu', NULL, NULL, '2022-11-08 08:30:47', '2022-11-08 08:16:50'),
	('UN31.UPBJ', '2022', '2010101005', 'UN31.UPBJ.2010101005.2', 1, 0, 'Baik', '01', 2, 'Unit Pengadaan Barang dan Jasa', 5000000000.00, 20, '2', 'Untuk', 5, 2340000.00, '', NULL, NULL, NULL, '2022-11-08 08:30:47', '2022-11-08 08:16:50');

-- Dumping structure for table db_asset.ref_rkbmut_pemeliharaan_detail
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pemeliharaan_detail` (
  `tahun` char(4) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `jenis_belanja` char(6) NOT NULL,
  `status_paraf` int(11) DEFAULT 0,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `kondisi_baik` int(11) DEFAULT NULL,
  `kondisi_rusak_ringan` int(11) DEFAULT NULL,
  `kebutuhan_pemeliharaan` int(11) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_asset`,`kode_unit_kerja`,`revisi_ke`,`jenis_belanja`,`tahun`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pemeliharaan_detail: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_rkbmut_pemeliharaan_header
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pemeliharaan_header` (
  `tahun` char(4) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `jenis_belanja` char(6) NOT NULL,
  `nama_jenis_belanja` varchar(255) DEFAULT NULL,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_paraf` int(11) DEFAULT 0,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `status` int(11) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`tahun`,`kode_unit_kerja`,`jenis_belanja`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pemeliharaan_header: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_rkbmut_pemindahtanganan
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pemindahtanganan` (
  `tahun` char(4) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `kode_asset` char(10) NOT NULL,
  `nup` varchar(50) NOT NULL,
  `merk` varchar(255) DEFAULT NULL,
  `umur_ekonomis` int(11) DEFAULT NULL,
  `tahun_perolehan` char(4) DEFAULT NULL,
  `kondisi` varchar(50) DEFAULT NULL,
  `nilai_perolehan` decimal(12,2) DEFAULT NULL,
  `kode_pindah_tangan` char(1) DEFAULT NULL,
  `alasan` varchar(255) DEFAULT NULL,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_paraf` int(11) DEFAULT 0,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`tahun`,`kode_unit_kerja`,`kode_asset`,`nup`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pemindahtanganan: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_rkbmut_pengadaan_detail
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pengadaan_detail` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_revisi` int(11) DEFAULT NULL,
  `status_paraf` int(11) DEFAULT 0,
  `kode_skema_pengadaan` char(1) DEFAULT NULL,
  `kuantitas` varchar(255) DEFAULT NULL,
  `sbsk` int(11) DEFAULT NULL,
  `existing_bmut` int(11) DEFAULT NULL,
  `kebutuhan_riil` int(11) DEFAULT NULL,
  `keterangan` tinytext DEFAULT NULL,
  `status_sippan` tinyint(4) DEFAULT 0 COMMENT '0 : belum identifikasi\r\n1 : sudah identifikasi & bisa edit \r\n2 : Kasubdit pengecekan \r\n3 : Kembali ke Unit untuk pengecekan \r\n4 : Diterima',
  `status_sippan_posisi` tinyint(4) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_asset`,`kode_unit_kerja`,`revisi_ke`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pengadaan_detail: ~4 rows (approximately)
INSERT INTO `ref_rkbmut_pengadaan_detail` (`kode_kegiatan_rkt`, `kode_asset`, `kode_unit_kerja`, `revisi_ke`, `status_revisi`, `status_paraf`, `kode_skema_pengadaan`, `kuantitas`, `sbsk`, `existing_bmut`, `kebutuhan_riil`, `keterangan`, `status_sippan`, `status_sippan_posisi`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	(3, '3100102002', 'UN31.UPBJ', 0, 3, 2, '1', '10', 15, 15, 15, 'Tidak Ada', 2, 1, NULL, NULL, '2022-12-29 10:58:01', '2022-12-29 07:43:53'),
	(3, '3100102009', 'UN31.UPBJ', 0, 3, 2, '1', '10', 15, 15, 15, 'Tidak Ada', 1, 1, NULL, NULL, '2022-12-29 10:58:02', '2022-12-29 07:43:53'),
	(5, '3100102002', 'UN31.UPBJ', 6, 3, 2, '1', '10', 15, 15, 15, 'Tetap di Angka Ini', 3, 1, NULL, NULL, '2022-12-29 10:58:00', '2022-12-28 05:22:50'),
	(5, '3100102009', 'UN31.UPBJ', 6, 3, 2, '1', '10', 15, 15, 15, 'Ubah', 2, 1, NULL, NULL, '2022-12-29 10:58:01', '2022-12-28 05:22:50');

-- Dumping structure for table db_asset.ref_rkbmut_pengadaan_header
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pengadaan_header` (
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `tahun` char(4) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `status_paraf` int(11) DEFAULT 0,
  `nama_kegiatan_rkt` varchar(255) DEFAULT NULL,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `kode_program_rsb` varchar(20) DEFAULT NULL,
  `nama_program_rsb` varchar(255) DEFAULT NULL,
  `kode_jenis_belanja` char(8) DEFAULT NULL,
  `nama_jenis_belanja` varchar(255) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `jenis_revisi` enum('besar','kecil') DEFAULT 'kecil',
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`tahun`,`kode_unit_kerja`,`revisi_ke`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pengadaan_header: ~1 rows (approximately)
INSERT INTO `ref_rkbmut_pengadaan_header` (`kode_kegiatan_rkt`, `tahun`, `kode_unit_kerja`, `revisi_ke`, `status_revisi`, `status_paraf`, `nama_kegiatan_rkt`, `nama_unit_kerja`, `kode_program_rsb`, `nama_program_rsb`, `kode_jenis_belanja`, `nama_jenis_belanja`, `komentar`, `jenis_revisi`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(3, '2022', 'UN31.UPBJ', 0, 3, 2, 'Data Beda ', 'Unit Pengadaan Barang dan Jasa', NULL, NULL, NULL, NULL, NULL, 'kecil', NULL, NULL, '2022-12-29 07:43:53', '2022-12-29 07:44:09'),
	(5, '2022', 'UN31.UPBJ', 6, 3, 2, 'Data3 ', 'Unit Pengadaan Barang dan Jasa', NULL, NULL, NULL, NULL, NULL, 'kecil', NULL, NULL, '2022-12-28 05:22:50', '2022-12-28 05:34:00');

-- Dumping structure for table db_asset.ref_rkbmut_penghapusan
CREATE TABLE IF NOT EXISTS `ref_rkbmut_penghapusan` (
  `tahun` char(4) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `nup` varchar(50) NOT NULL,
  `kode_asset` char(10) NOT NULL,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_paraf` int(11) DEFAULT 0,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `merk` varchar(255) NOT NULL DEFAULT '',
  `kondisi` varchar(100) DEFAULT NULL,
  `tahun_perolehan` char(4) DEFAULT NULL,
  `alasan` tinytext DEFAULT NULL,
  `nilai_perolehan` decimal(12,2) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`nup`,`tahun`,`kode_unit_kerja`,`kode_asset`,`revisi_ke`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_penghapusan: ~0 rows (approximately)
INSERT INTO `ref_rkbmut_penghapusan` (`tahun`, `kode_unit_kerja`, `nup`, `kode_asset`, `status_revisi`, `revisi_ke`, `status_paraf`, `nama_unit_kerja`, `merk`, `kondisi`, `tahun_perolehan`, `alasan`, `nilai_perolehan`, `foto`, `komentar`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('2022', 'UN31.UPBJ', 'UN31.UPBJ.2022.3100102002.3', '3100102002', 3, 0, 2, 'Unit Pengadaan Barang dan jasa', 'tes', 'baik', '2022', 'Jelek', 500000000.00, 'https://dev-sippp.ut.ac.id:2323/public/foto_barang_rusak/1668068787675-891012888.jpg', NULL, NULL, NULL, '2022-11-10 08:26:27', '2022-11-10 08:28:26');

-- Dumping structure for table db_asset.ref_ruang
CREATE TABLE IF NOT EXISTS `ref_ruang` (
  `kode_ruang` int(11) NOT NULL DEFAULT 0,
  `nip` char(20) DEFAULT NULL,
  `nama_pj` varchar(255) DEFAULT NULL,
  `kode_unit` char(16) DEFAULT NULL,
  `nama_unit` varchar(255) DEFAULT NULL,
  `nama_ruang` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_ruang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_ruang: ~338 rows (approximately)
INSERT INTO `ref_ruang` (`kode_ruang`, `nip`, `nama_pj`, `kode_unit`, `nama_unit`, `nama_ruang`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(1, NULL, NULL, 'UN31', 'Rektorat', 'Ruang Rektor', NULL, NULL, '2022-07-28 08:17:10', NULL),
	(2, NULL, NULL, 'UN31.WR1', 'Wakil Rektor 1', 'Ruang Wakil Rektor', NULL, NULL, '2022-07-29 03:31:07', '2022-07-29 03:31:13'),
	(3, '1551241241241233', ' Michael', 'UN31.UPBJ', ' Unit Pengadaan Barang dan Jasa', 'Ruang Kepala Unit', NULL, NULL, '2022-08-12 07:05:36', '2022-08-12 07:05:36'),
	(4, '1551241241241233', ' Michael', 'UN31.UPBJ', ' Unit Pengadaan Barang dan Jasa', 'Ruang Kepala Unit', NULL, NULL, '2022-11-18 01:44:42', '2022-11-18 01:44:42'),
	(5, '1551241241241233', NULL, 'UN31.UPBJ', ' Unit Pengadaan Barang dan Jasa', 'Ruang Kepala Unit', NULL, NULL, '2022-11-18 01:44:58', '2022-11-18 01:44:58'),
	(6, '1551241241241233', ' Michael', 'Unit Pengadaan B', NULL, 'Ruang Kepala Unit', NULL, NULL, '2022-11-18 01:45:13', '2022-11-18 01:45:13');

-- Dumping structure for table db_asset.ref_skema_pengadaan
CREATE TABLE IF NOT EXISTS `ref_skema_pengadaan` (
  `kode_skema_pengadaan` char(1) NOT NULL,
  `nama_skema_pengadaan` varchar(255) DEFAULT NULL,
  `keterangan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_skema_pengadaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_skema_pengadaan: ~3 rows (approximately)
INSERT INTO `ref_skema_pengadaan` (`kode_skema_pengadaan`, `nama_skema_pengadaan`, `keterangan`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('1', 'Pembelian Langsung', 'Barang atau Jasa : < 200 juta\r\nKonstruksi : < 200 Juta \r\nPenanggung Jawab Pejabat Pengadan', NULL, NULL, '2022-08-11 06:51:18', '2022-08-11 06:52:03'),
	('2', 'Pengadaan Langsung', 'Barang atau Jasa : < 200 juta - 500 juta\r\nKonstruksi : < 200 juta -  1 Milyar\r\nPenanggung Jawab Pejabat Pengadaan', NULL, NULL, '2022-08-11 06:53:43', NULL),
	('3', 'Quotation', 'Barang atau Jasa : < 500 juta - 2 Milyar \r\nKonstruksi : 1 Milyar - 10 Milyar \r\nPenanggung Jawab KPA', NULL, NULL, '2022-08-11 06:55:00', NULL);

-- Dumping structure for table db_asset.ref_status_pemilik
CREATE TABLE IF NOT EXISTS `ref_status_pemilik` (
  `kode_status_pemilik` char(2) NOT NULL,
  `nama_status_pemilik` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_status_pemilik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_status_pemilik: ~2 rows (approximately)
INSERT INTO `ref_status_pemilik` (`kode_status_pemilik`, `nama_status_pemilik`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('01', 'Digunakan Sendiri untuk dinas jabatan', NULL, NULL, '2022-08-12 08:34:48', NULL),
	('02', 'Digunakan Sendiri untuk Operasional', NULL, NULL, '2022-08-12 08:35:07', NULL);

-- Dumping structure for table db_asset.trxrkbmutalls
CREATE TABLE IF NOT EXISTS `trxrkbmutalls` (
  `kode_unit_kerja` varchar(16) NOT NULL,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `status_pengadaan` smallint(6) DEFAULT 0,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` datetime DEFAULT NULL,
  `udch` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`kode_unit_kerja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trxrkbmutalls: ~0 rows (approximately)

-- Dumping structure for table db_asset.trx_asset_ut
CREATE TABLE IF NOT EXISTS `trx_asset_ut` (
  `kode_asset` char(10) NOT NULL,
  `kode_asset_nup` int(11) NOT NULL,
  `kode_pembukuan` char(9) DEFAULT NULL,
  `nilai_item` decimal(12,2) DEFAULT NULL,
  `qrkode` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_asset`,`kode_asset_nup`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_asset_ut: ~2 rows (approximately)
INSERT INTO `trx_asset_ut` (`kode_asset`, `kode_asset_nup`, `kode_pembukuan`, `nilai_item`, `qrkode`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('3100102002', 1, 'A04221', 15000000.00, NULL, NULL, NULL, '2022-07-29 03:34:30', '2022-07-29 03:34:30'),
	('3100102002', 2, 'A04221', 15000000.00, NULL, NULL, NULL, '2022-07-29 03:34:30', '2022-07-29 03:34:30');

-- Dumping structure for table db_asset.trx_kib_alatbesar
CREATE TABLE IF NOT EXISTS `trx_kib_alatbesar` (
  `kode_asset` char(10) DEFAULT NULL,
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `nup` varchar(50) DEFAULT NULL,
  `no_asset` int(11) NOT NULL,
  `no_kib_alatbesar` int(11) DEFAULT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `tahun_pembuatan` char(4) DEFAULT NULL,
  `merk` varchar(255) DEFAULT NULL,
  `pabrik` varchar(255) DEFAULT NULL,
  `perakitan` varchar(255) DEFAULT NULL,
  `kapasitas` varchar(255) DEFAULT NULL,
  `sistem_pendinginan` varchar(255) DEFAULT NULL,
  `dudukan_peralatan` varchar(50) DEFAULT NULL,
  `no_mesin` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `negara` varchar(255) DEFAULT NULL,
  `sistem_operasi` varchar(255) DEFAULT NULL,
  `sistem_pembakar` varchar(255) DEFAULT NULL,
  `power_train` varchar(255) DEFAULT NULL,
  `no_rangka` varchar(255) DEFAULT NULL,
  `perlengkapan1` varchar(255) DEFAULT NULL,
  `perlengkapan2` varchar(255) DEFAULT NULL,
  `perlengkapan3` varchar(255) DEFAULT NULL,
  `kode_unit` char(20) DEFAULT NULL,
  `nama_unit` varchar(255) DEFAULT NULL,
  `sumber_dana` enum('APBN','NON APBN') DEFAULT NULL,
  `no_dana` varchar(255) DEFAULT NULL,
  `tanggal_dana` date DEFAULT NULL,
  `harga_wajar` decimal(20,2) DEFAULT NULL,
  `catatan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`no_asset`,`kode_pembukuan`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_kib_alatbesar: ~0 rows (approximately)

-- Dumping structure for table db_asset.trx_kib_angkutan
CREATE TABLE IF NOT EXISTS `trx_kib_angkutan` (
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `kode_asset` char(10) DEFAULT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `nup` varchar(50) DEFAULT NULL,
  `no_asset` int(11) unsigned NOT NULL DEFAULT 1,
  `no_kib_angkutan` int(11) DEFAULT NULL,
  `tahun_pembuatan` char(4) DEFAULT NULL,
  `pabrik` varchar(255) DEFAULT NULL,
  `negara` varchar(255) DEFAULT NULL,
  `perakitan` varchar(255) DEFAULT NULL,
  `daya_muat` varchar(255) DEFAULT NULL,
  `bobot` varchar(255) DEFAULT NULL,
  `daya_mesin` varchar(255) DEFAULT NULL,
  `mesin_penggerak` varchar(255) DEFAULT NULL,
  `jumlah_mesin` int(11) DEFAULT NULL,
  `bahan_bakar` varchar(255) DEFAULT NULL,
  `no_mesin` varchar(255) DEFAULT NULL,
  `no_rangka` varchar(50) DEFAULT NULL,
  `no_bpkb` varchar(50) DEFAULT NULL,
  `no_polisi` varchar(50) DEFAULT NULL,
  `perlengkapan1` varchar(50) DEFAULT NULL,
  `perlengkapan2` varchar(50) DEFAULT NULL,
  `perlengkapan3` varchar(50) DEFAULT NULL,
  `kode_unit` char(16) DEFAULT NULL,
  `nama_unit` varchar(255) DEFAULT NULL,
  `sumber_dana` enum('APBN','NON APBN') DEFAULT NULL,
  `no_dana` varchar(255) DEFAULT NULL,
  `tanggal_dana` date DEFAULT NULL,
  `harga_wajar` decimal(20,2) DEFAULT NULL,
  `catatan` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`no_asset`,`kode_pembukuan`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_kib_angkutan: ~0 rows (approximately)

-- Dumping structure for table db_asset.trx_kib_bangunan
CREATE TABLE IF NOT EXISTS `trx_kib_bangunan` (
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `kode_asset` char(10) DEFAULT NULL,
  `no_kib_bangunan` int(11) DEFAULT NULL,
  `no_asset` int(11) NOT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `luas_bangunan` decimal(12,2) DEFAULT NULL,
  `nup` varchar(50) DEFAULT NULL,
  `luas_dasar_bangunan` decimal(12,2) DEFAULT NULL,
  `jumlah_lantai` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `tahun_bangun` char(4) DEFAULT NULL,
  `tahun_guna` char(4) DEFAULT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `lokasi_bangunan` varchar(255) DEFAULT NULL,
  `nup_tanah` varchar(50) DEFAULT NULL,
  `kode_unit` char(20) DEFAULT NULL,
  `nama_unit` varchar(255) DEFAULT NULL,
  `sumber_dana` enum('APBN','NON APBN') DEFAULT NULL,
  `no_dana` varchar(255) DEFAULT NULL,
  `tanggal_dana` date DEFAULT NULL,
  `nilai_wajar` decimal(20,2) DEFAULT NULL,
  `njop` decimal(20,2) DEFAULT NULL,
  `catatan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`no_asset`,`kode_pembukuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_kib_bangunan: ~0 rows (approximately)

-- Dumping structure for table db_asset.trx_kib_bangunan_air
CREATE TABLE IF NOT EXISTS `trx_kib_bangunan_air` (
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `kode_asset` char(10) DEFAULT NULL,
  `no_kib_bangunan` int(11) DEFAULT NULL,
  `no_asset` int(11) NOT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `luas_bangunan` decimal(12,2) DEFAULT NULL,
  `nup` varchar(50) DEFAULT NULL,
  `luas_dasar_bangunan` decimal(12,2) DEFAULT NULL,
  `kuantitas` decimal(20,2) DEFAULT NULL,
  `kapasitas` decimal(20,2) DEFAULT NULL,
  `tahun_bangun` char(4) DEFAULT NULL,
  `tahun_guna` char(4) DEFAULT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `lokasi_bangunan` varchar(255) DEFAULT NULL,
  `nup_tanah` varchar(50) DEFAULT NULL,
  `kode_unit` char(20) DEFAULT NULL,
  `nama_unit` varchar(255) DEFAULT NULL,
  `sumber_dana` enum('APBN','NON APBN') DEFAULT NULL,
  `no_dana` varchar(255) DEFAULT NULL,
  `tanggal_dana` date DEFAULT NULL,
  `nilai_wajar` decimal(20,2) DEFAULT NULL,
  `njop` decimal(20,2) DEFAULT NULL,
  `catatan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_pembukuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_kib_bangunan_air: ~0 rows (approximately)
INSERT INTO `trx_kib_bangunan_air` (`kode_status_pemilik`, `kode_asset`, `no_kib_bangunan`, `no_asset`, `kode_pembukuan`, `luas_bangunan`, `nup`, `luas_dasar_bangunan`, `kuantitas`, `kapasitas`, `tahun_bangun`, `tahun_guna`, `pdf`, `lokasi_bangunan`, `nup_tanah`, `kode_unit`, `nama_unit`, `sumber_dana`, `no_dana`, `tanggal_dana`, `nilai_wajar`, `njop`, `catatan`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('01', '5020703002', NULL, 1, 'A04221', 134.20, NULL, 123.40, 15.00, 20.25, '2020', '2020', '', NULL, 'UN31.UPBJ.2022.2010101003.1', 'UN31.UPBJ', ' Unit Pengadaan Barang Jasa', 'APBN', '1233141412', '2015-05-08', NULL, NULL, 'Tidak Ada', NULL, NULL, '2022-12-15 10:44:58', '2022-12-15 10:44:58');

-- Dumping structure for table db_asset.trx_kib_tanah
CREATE TABLE IF NOT EXISTS `trx_kib_tanah` (
  `kode_asset` char(10) DEFAULT NULL,
  `kode_status_pemilik` char(2) DEFAULT NULL,
  `kode_dokumen` char(1) DEFAULT NULL,
  `no_asset` int(11) NOT NULL,
  `kode_pembukuan` char(9) NOT NULL,
  `no_kib_tanah` int(11) DEFAULT NULL,
  `nup` varchar(50) DEFAULT NULL,
  `kode_unit` char(16) DEFAULT NULL,
  `nama_unit` varchar(255) DEFAULT NULL,
  `alamat` tinytext DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `tanah_bangunan` decimal(12,0) DEFAULT NULL,
  `tanah_sarana` decimal(12,0) DEFAULT NULL,
  `tanah_kosong` decimal(12,0) DEFAULT NULL,
  `tanah_seluruh` decimal(12,0) DEFAULT NULL,
  `batas_utara` varchar(255) DEFAULT NULL,
  `batas_timur` varchar(255) DEFAULT NULL,
  `batas_barat` varchar(255) DEFAULT NULL,
  `batas_selatan` varchar(255) DEFAULT NULL,
  `tanggal_dokumen` date DEFAULT NULL,
  `instansi_penerbit` varchar(50) DEFAULT NULL,
  `dana` enum('APBN','NON APBN') DEFAULT NULL,
  `no_dana` varchar(255) DEFAULT NULL,
  `tanggal_dana` date DEFAULT NULL,
  `harga_taksiran_satuan` decimal(12,2) DEFAULT NULL,
  `harga_taksiran_total` decimal(20,2) DEFAULT NULL,
  `harga_njop_satuan` decimal(12,2) DEFAULT NULL,
  `harga_njop_total` decimal(20,2) DEFAULT NULL,
  `catatan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_pembukuan`,`no_asset`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_kib_tanah: ~0 rows (approximately)

-- Dumping structure for table db_asset.trx_rkbmut_all
CREATE TABLE IF NOT EXISTS `trx_rkbmut_all` (
  `kode_unit_kerja` char(16) NOT NULL,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `status_pengadaan` smallint(6) DEFAULT 0,
  `status_pemeliharaan` smallint(6) DEFAULT 0,
  `status_pemindahtanganan` smallint(6) DEFAULT 0,
  `status_pemanfaatan` smallint(6) DEFAULT 0,
  `status_penghapusan` smallint(6) DEFAULT 0,
  `pdf` varchar(255) DEFAULT NULL,
  `status_rkbmutall` smallint(6) DEFAULT 0,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_unit_kerja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_rkbmut_all: ~0 rows (approximately)
INSERT INTO `trx_rkbmut_all` (`kode_unit_kerja`, `nama_unit_kerja`, `status_pengadaan`, `status_pemeliharaan`, `status_pemindahtanganan`, `status_pemanfaatan`, `status_penghapusan`, `pdf`, `status_rkbmutall`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('UN31.UPBJ', 'UPBJ', 1, 1, 1, 1, 1, 'https://sippp.ut.ac.id/hrd/pdf-rkbm/UN31.UPBJ.pdf', 1, NULL, NULL, '2022-10-31 03:06:47', '2022-12-28 05:34:00');

-- Dumping structure for trigger db_asset.insert_rkbmut_pengadaan_detail
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `insert_rkbmut_pengadaan_detail` AFTER INSERT ON `ref_rkbmut_pengadaan_detail` FOR EACH ROW 
BEGIN 
INSERT INTO log_rkbmut_pengadaan
SET kode_kegiatan_rkt = NEW.kode_kegiatan_rkt, 
kode_skema_pengadaan = NEW.kode_skema_pengadaan, 
kuantitas = NEW.kuantitas, 
sbsk = NEW.sbsk, 
existing_bmut = NEW.existing_bmut, 
kebutuhan_riil = NEW.kebutuhan_riil, 
keterangan = NEW.keterangan,
revisi_ke = NEW.revisi_ke, 
kode_asset = NEW.kode_asset, 
kode_unit_kerja = NEW.kode_unit_kerja, 
event_trigger = "CREATE",
status_revisi = NEW.status_revisi;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger db_asset.update_rkbmut_pengadaan_detail
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_rkbmut_pengadaan_detail` AFTER UPDATE ON `ref_rkbmut_pengadaan_detail` FOR EACH ROW BEGIN 
IF NOT EXISTS (SELECT * FROM log_rkbmut_pengadaan WHERE kode_unit_kerja = OLD.kode_unit_kerja AND revisi_ke = OLD.revisi_ke) THEN
	INSERT INTO log_rkbmut_pengadaan
	SET kode_kegiatan_rkt = OLD.kode_kegiatan_rkt, 
	kode_skema_pengadaan = OLD.kode_skema_pengadaan, 
	kuantitas = OLD.kuantitas, 
	sbsk = OLD.sbsk, 
	existing_bmut = OLD.existing_bmut, 
	kebutuhan_riil = OLD.kebutuhan_riil, 
	keterangan = OLD.keterangan,
	revisi_ke = OLD.revisi_ke,
	kode_asset = OLD.kode_asset, 
	kode_unit_kerja = OLD.kode_unit_kerja, 
	status_paraf = OLD.status_paraf,
	event_trigger = "UPDATE",
	status_revisi = OLD.status_revisi;
	END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
