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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.log_rkbmut_pengadaan: ~38 rows (approximately)
INSERT INTO `log_rkbmut_pengadaan` (`kode_log_rkbmut_pengadaan`, `kode_skema_pengadaan`, `kode_kegiatan_rkt`, `kode_unit_kerja`, `kode_asset`, `kuantitas`, `sbsk`, `existing_bmut`, `kebutuhan_riil`, `revisi_ke`, `status_paraf`, `status_revisi`, `event_trigger`, `keterangan`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	(1, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:28:08'),
	(2, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:28:09'),
	(3, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:28:16'),
	(4, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:28:16'),
	(5, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:28:23'),
	(6, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:28:24'),
	(7, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:29:52'),
	(8, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:29:52'),
	(9, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:33:10'),
	(10, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:33:12'),
	(27, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:53:01'),
	(28, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:53:01'),
	(29, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:53:49'),
	(30, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:53:49'),
	(31, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:54:52'),
	(32, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:54:52'),
	(33, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:57:56'),
	(34, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:57:56'),
	(35, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:58:10'),
	(36, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 03:58:14'),
	(37, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:11:59'),
	(38, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:11:59'),
	(39, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:13:34'),
	(40, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:13:34'),
	(41, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:13:36'),
	(42, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:13:37'),
	(43, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:14:33'),
	(44, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:14:33'),
	(45, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:15:30'),
	(46, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:15:30'),
	(47, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:15:36'),
	(48, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:15:36'),
	(49, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:15:52'),
	(50, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:15:53'),
	(51, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:18:26'),
	(52, 1, 4, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:18:26'),
	(53, 1, 2, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:18:41'),
	(54, 1, 2, 'UN31.UPBJ', '3100102009', 10, 15, 15, 15, 0, 2, 1, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:18:41'),
	(55, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 3, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:48:47'),
	(56, 1, 4, 'UN31.UPBJ', '3100102002', 10, 15, 15, 15, 0, 2, 31, 'UPDATE', 'Tidak Ada', NULL, NULL, NULL, '2022-10-31 04:48:49');

-- Dumping structure for table db_asset.ref_asset
CREATE TABLE IF NOT EXISTS `ref_asset` (
  `kode_asset` char(10) NOT NULL,
  `nama_asset` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_asset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_asset: ~11,863 rows (approximately)

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

-- Dumping data for table db_asset.ref_daftar_barang: ~3 rows (approximately)
INSERT INTO `ref_daftar_barang` (`kode_barang`, `kode_pembukuan`, `kode_asset_nup`, `nup`, `kode_asset`, `merk`, `tanggal_perolehan`, `qr_kode`, `kode_ruang`, `deskripsi`, `nilai_item`, `kondisi`, `optional_key`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(1, 'A04221', 1, 'UN31.2022.3100102009.1', '3100102009', 'Lenovo', '2022-05-06', '/src/public/images/qrcode/UN31.2022.3100102009.1.png', '1', 'Laptop1', 2000000.00, 'Baik', NULL, NULL, NULL, '2022-11-15 09:06:11', '2022-11-15 09:36:52'),
	(1, 'A04222', 3, 'UN31.2022.3100102009.3', '3100102009', 'Lenovo', '2022-05-06', '/src/public/images/qrcode/UN31.2022.3100102009.3.png', '1', 'Laptop1', 2000000.00, 'Baik', NULL, NULL, NULL, '2022-11-15 09:40:36', '2022-11-15 09:40:45'),
	(2, 'A04221', 2, 'UN31.2022.3100102009.2', '3100102009', 'Lenovo', '2022-05-06', '/src/public/images/qrcode/UN31.2022.3100102009.2.png', '1', 'Laptop2', 2000000.00, 'Baik', NULL, NULL, NULL, '2022-11-15 09:06:11', '2022-11-15 09:36:52'),
	(2, 'A04222', 4, 'UN31.2022.3100102009.4', '3100102009', 'Lenovo', '2022-05-06', '/src/public/images/qrcode/UN31.2022.3100102009.4.png', '1', 'Laptop2', 2000000.00, 'Baik', NULL, NULL, NULL, '2022-11-15 09:40:36', '2022-11-15 09:40:45');

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

-- Dumping data for table db_asset.ref_pembukuan: ~4 rows (approximately)
INSERT INTO `ref_pembukuan` (`kode_asset`, `no_sppa`, `kode_pembukuan`, `jumlah_barang`, `asal_perolehan`, `no_bukti_perolehan`, `tanggal_perolehan`, `tanggal_pembukuan`, `keterangan`, `merk`, `nilai_item`, `total_nilai`, `dasar_harga`, `metode_penyusutan`, `catat`, `pdf`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	('3100102009', 'A0422', 'A04221', 2, 'Alvin', 'a', '2022-05-06', '2022-05-06', '', 'Lenovo', 2000000.00, 6000000.00, 'Perolehan', 'Straight Line', 'DBR', NULL, NULL, NULL, '2022-11-15 09:06:22', '2022-11-15 09:06:11'),
	('3100102009', 'A0422', 'A04222', 3, 'Alvin', 'a', '2022-05-06', '2022-05-06', '', 'Lenovo', 2000000.00, 6000000.00, 'Perolehan', 'Straight Line', 'DBR', NULL, NULL, NULL, '2022-11-15 09:40:36', '2022-11-15 09:40:36');

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
  PRIMARY KEY (`kode_asset`,`kode_unit_kerja`,`revisi_ke`,`jenis_belanja`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pemeliharaan_detail: ~2 rows (approximately)
INSERT INTO `ref_rkbmut_pemeliharaan_detail` (`kode_unit_kerja`, `kode_asset`, `revisi_ke`, `jenis_belanja`, `status_paraf`, `status_revisi`, `kode_status_pemilik`, `kondisi_baik`, `kondisi_rusak_ringan`, `kebutuhan_pemeliharaan`, `keterangan`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	('UN31', '3100102002', 0, '2222', 0, 0, NULL, 3, 2, 5, 'Tes Keterangan', NULL, NULL, '2022-11-04 02:06:13', '2022-11-04 02:05:45'),
	('UN31', '3100102009', 0, '1122', 0, 0, NULL, 3, 2, 5, 'Tes Keterangan', NULL, NULL, '2022-11-04 02:06:07', '2022-11-04 01:57:27');

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

-- Dumping data for table db_asset.ref_rkbmut_pemeliharaan_header: ~2 rows (approximately)
INSERT INTO `ref_rkbmut_pemeliharaan_header` (`tahun`, `kode_unit_kerja`, `nama_unit_kerja`, `jenis_belanja`, `nama_jenis_belanja`, `revisi_ke`, `status_paraf`, `status_revisi`, `status`, `komentar`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	('2022', 'UN31', 'Unit Pengadaan Barang dan Jasa', '1122', 'Belanja Aja', 0, 0, 0, NULL, NULL, NULL, NULL, '2022-11-04 02:05:08', '2022-11-04 01:57:27'),
	('2022', 'UN31', 'Unit Pengadaan Barang dan Jasa', '2222', 'Belanja Aja', 0, 0, 0, NULL, NULL, NULL, NULL, '2022-11-04 02:05:58', '2022-11-04 02:05:45');

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

-- Dumping data for table db_asset.ref_rkbmut_pemindahtanganan: ~2 rows (approximately)
INSERT INTO `ref_rkbmut_pemindahtanganan` (`tahun`, `kode_unit_kerja`, `nama_unit_kerja`, `kode_asset`, `nup`, `merk`, `umur_ekonomis`, `tahun_perolehan`, `kondisi`, `nilai_perolehan`, `kode_pindah_tangan`, `alasan`, `status_revisi`, `revisi_ke`, `status_paraf`, `komentar`, `ucr`, `uch`, `udch`, `udcr`) VALUES
	('2022', 'UN31.DEWAS', 'Dewan Pengawas', '3100102002', 'UN31.2022.3100102002.1', 'Cek', 5, '2017', 'Baik', 5000000.00, '2', 'Tau Gelap', 1, 1, 2, 'Tambahkan Sesuatu', NULL, NULL, '2022-11-08 07:58:54', '2022-11-08 07:50:16'),
	('2022', 'UN31.DEWAS', 'Dewan Pengawas', '3100102002', 'UN31.2022.3100102002.3', 'Tes', 5, '2017', 'Baik', 5000000.00, '2', 'Perpindahan tanpa alasan', 1, 0, 2, NULL, NULL, NULL, '2022-11-08 07:58:54', '2022-11-08 07:50:16');

-- Dumping structure for table db_asset.ref_rkbmut_pengadaan_detail
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pengadaan_detail` (
  `kode_skema_pengadaan` char(1) DEFAULT NULL,
  `kode_asset` char(10) NOT NULL,
  `kode_unit_kerja` char(16) NOT NULL,
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_revisi` int(11) DEFAULT NULL,
  `status_paraf` int(11) DEFAULT 0,
  `kuantitas` int(11) DEFAULT NULL,
  `sbsk` int(11) DEFAULT NULL,
  `existing_bmut` int(11) DEFAULT NULL,
  `kebutuhan_riil` int(11) DEFAULT NULL,
  `keterangan` tinytext DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`kode_unit_kerja`,`kode_asset`,`revisi_ke`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pengadaan_detail: ~0 rows (approximately)

-- Dumping structure for table db_asset.ref_rkbmut_pengadaan_header
CREATE TABLE IF NOT EXISTS `ref_rkbmut_pengadaan_header` (
  `kode_unit_kerja` char(16) NOT NULL,
  `tahun` char(4) NOT NULL,
  `kode_kegiatan_rkt` int(11) NOT NULL,
  `status_revisi` int(11) NOT NULL DEFAULT 0,
  `revisi_ke` int(11) NOT NULL DEFAULT 0,
  `status_paraf` int(11) DEFAULT 0,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `kode_program_rsb` varchar(20) DEFAULT NULL,
  `nama_program_rsb` varchar(255) DEFAULT NULL,
  `nama_kegiatan_rkt` varchar(255) DEFAULT NULL,
  `kode_jenis_belanja` char(7) DEFAULT NULL,
  `nama_jenis_belanja` varchar(255) DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_kegiatan_rkt`,`tahun`,`kode_unit_kerja`,`status_revisi`,`revisi_ke`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.ref_rkbmut_pengadaan_header: ~0 rows (approximately)

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

-- Dumping data for table db_asset.ref_ruang: ~3 rows (approximately)
INSERT INTO `ref_ruang` (`kode_ruang`, `nip`, `nama_pj`, `kode_unit`, `nama_unit`, `nama_ruang`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	(1, NULL, NULL, 'UN31', 'Rektorat', 'Ruang Rektor', NULL, NULL, '2022-07-28 08:17:10', NULL),
	(2, NULL, NULL, 'UN31.WR1', 'Wakil Rektor 1', 'Ruang Wakil Rektor', NULL, NULL, '2022-07-29 03:31:07', '2022-07-29 03:31:13'),
	(3, '1551241241241233', ' Michael', 'UN31.UPBJ', ' Unit Pengadaan Barang dan Jasa', 'Ruang Kepala Unit', NULL, NULL, '2022-08-12 07:05:36', '2022-08-12 07:05:36');

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
  `ucr` varchar(100) DEFAULT NULL,
  `uch` varchar(100) DEFAULT NULL,
  `udcr` timestamp NULL DEFAULT current_timestamp(),
  `udch` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`kode_unit_kerja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_asset.trx_rkbmut_all: ~0 rows (approximately)
INSERT INTO `trx_rkbmut_all` (`kode_unit_kerja`, `nama_unit_kerja`, `status_pengadaan`, `status_pemeliharaan`, `status_pemindahtanganan`, `status_pemanfaatan`, `status_penghapusan`, `ucr`, `uch`, `udcr`, `udch`) VALUES
	('UN31.UPBJ', 'UPBJ', 1, 1, 0, 1, 1, NULL, NULL, '2022-10-31 03:06:47', '2022-11-10 08:28:26');

-- Dumping structure for trigger db_asset.insert_rkbmut_detail
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `insert_rkbmut_detail` AFTER INSERT ON `ref_rkbmut_pengadaan_detail` FOR EACH ROW BEGIN 
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
status_paraf = NEW.status_paraf, 
event_trigger = "CREATE",
status_revisi = NEW.status_revisi;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger db_asset.update_rkbmut_detail
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_rkbmut_detail` AFTER UPDATE ON `ref_rkbmut_pengadaan_detail` FOR EACH ROW BEGIN 
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
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
