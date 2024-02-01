-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2023 at 12:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datvexemphim`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner_phim`
--

CREATE TABLE `banner_phim` (
  `maBanner` bigint(20) UNSIGNED NOT NULL,
  `maPhim` int(11) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banner_phim`
--

INSERT INTO `banner_phim` (`maBanner`, `maPhim`, `hinhAnh`, `created_at`, `updated_at`) VALUES
(1, 2, 'http://127.0.0.1:8000/images/banner/DL3QakkcEOPJ.jpg', '2023-07-07 19:42:25', '2023-07-07 19:42:25');

-- --------------------------------------------------------

--
-- Table structure for table `danhsachghe`
--

CREATE TABLE `danhsachghe` (
  `maGhe` bigint(20) UNSIGNED NOT NULL,
  `stt` int(11) NOT NULL,
  `loaiGhe` varchar(255) NOT NULL,
  `giaVe` int(11) NOT NULL,
  `daDat` tinyint(1) NOT NULL,
  `taiKhoanNguoiDat` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hethongrap`
--

CREATE TABLE `hethongrap` (
  `maHeThongRap` bigint(20) UNSIGNED NOT NULL,
  `tenHeThongRap` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hethongrap`
--

INSERT INTO `hethongrap` (`maHeThongRap`, `tenHeThongRap`, `logo`, `created_at`, `updated_at`) VALUES
(3, 'CGV', 'http://127.0.0.1:8000/images/hethongrap/fM5pUmcUdYhE.jpg', '2023-07-08 10:04:27', '2023-07-08 10:04:27'),
(4, 'BHD', 'http://127.0.0.1:8000/images/hethongrap/qKjiwknxg5px.png', '2023-07-09 10:17:58', '2023-07-09 10:17:58');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(10, '2023_06_28_171800_banner_table', 1),
(11, '2023_07_01_142911_create_movies_table', 1),
(12, '2023_07_02_172155_create_table_hethongrap', 1),
(13, '2023_07_03_141715_create_rapchieu', 1),
(14, '2023_07_03_151149_danhsachghe', 1),
(19, '2023_07_11_050059_showtimes', 2),
(20, '2023_07_11_070535_add_foreign_key_to_showtimes', 2),
(21, '2023_07_11_101403_create_seats', 3),
(22, '2023_07_11_101908_add_foreign_key_to_seats', 4);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `maPhim` bigint(20) UNSIGNED NOT NULL,
  `tenPhim` varchar(255) NOT NULL,
  `trailer` varchar(255) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `moTa` varchar(255) NOT NULL,
  `ngayKhoiChieu` varchar(255) NOT NULL,
  `danhGia` int(11) NOT NULL,
  `hot` tinyint(1) NOT NULL,
  `dangChieu` tinyint(1) NOT NULL,
  `sapChieu` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`maPhim`, `tenPhim`, `trailer`, `hinhAnh`, `moTa`, `ngayKhoiChieu`, `danhGia`, `hot`, `dangChieu`, `sapChieu`, `created_at`, `updated_at`) VALUES
(1, 'Avatar', 'https://www.youtube.com/watch?v=gq2xKJXYZ80', 'http://127.0.0.1:8000/images/movie/WqTZcR5ygvkR.jpg', 'https://www.youtube.com/watch?v=gq2xKJXYZ80', '15/07/2023', 8, 1, 1, 0, '2023-07-07 00:00:26', '2023-07-10 06:23:57'),
(2, 'Spiderman', 'https://www.youtube.com/embed/shW9i6k8cB0', 'http://127.0.0.1:8000/images/movie/SmEscJwWKMFg.jpg', 'https://www.youtube.com/embed/shW9i6k8cB0', '08/07/2023', 9, 1, 1, 0, '2023-07-07 19:41:49', '2023-07-07 19:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('01c4ab1f9ee01683f45ef19aed0d7db0e45aebb516cfd6a645479c7097288c3da3e7278082d6b868', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:59:06', '2023-07-07 01:59:06', '2024-07-07 08:59:06'),
('08ccd21beb3166c38015b1d7a175201179a9e69e884b17d64e79d12d918929028eae33ec5a51c880', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:11:13', '2023-07-07 01:11:13', '2024-07-07 08:11:13'),
('0aea0a1f978b815de77664a54bcc6de13c1dd4dd5d8e27acb984a83aa60f1ccd3e4290932be49dbc', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:14:34', '2023-07-07 01:14:34', '2024-07-07 08:14:34'),
('0d8b64a6baad8c57d5b160bc9c44cf734412a6400b34652dc0d2e2a4e6d3883afcfd1f407389c531', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:44:39', '2023-07-07 01:44:39', '2024-07-07 08:44:39'),
('10a2d356394a9062ac12ea1ce8257722bb0e56c9a32f587398e65f6b630d752a44441403443338ed', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:46:22', '2023-07-07 00:46:22', '2024-07-07 07:46:22'),
('14c6a3063067d7ff0fdc371dd8cb6b16b8a65985b8d9f0efa109487f9087411085d98d0ab4e2b77f', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:54:21', '2023-07-07 00:54:21', '2024-07-07 07:54:21'),
('18d8314a5afda3506c53ceff109dc2f969e488a0d659bcd47894546efeee7a194979de2ee78a4aa0', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:58:27', '2023-07-07 00:58:27', '2024-07-07 07:58:27'),
('1b899520da1bc538d6f2a1deafbc7f2c74d6c669eb1d3b713c1d0bc5e6fead24ee3f1b782e4eac2d', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:22:19', '2023-07-07 01:22:19', '2024-07-07 08:22:19'),
('236750eddbf138301c79d639fb5c5ad6fc3c1ab32b8c57ce4183b84aa9fd6064afe70b95562c73e1', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:08:36', '2023-07-07 01:08:36', '2024-07-07 08:08:36'),
('25f4bf3434ef4e7cbf42123dd655c03312839b87e68652a0f2fad0c4debb37db86007401fc34398d', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:49:26', '2023-07-07 00:49:26', '2024-07-07 07:49:26'),
('2a1f45d6c851edd15630191442ae8da6bf54f8bff52539f739ca710c007a338149fc4c6a47948d9e', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:56:10', '2023-07-07 00:56:10', '2024-07-07 07:56:10'),
('2c1a8bc7237c85278d70e4bf032690478a250f78589d3a47cdce135a1efee7b58ad4b46efa33c203', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:41:33', '2023-07-07 01:41:33', '2024-07-07 08:41:33'),
('3022f6d352f5796a6ad659b38f49aa9a2e75fe456bb65305536e031114297f9754cfe01c63ecf7cb', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:14:48', '2023-07-07 02:14:48', '2024-07-07 09:14:48'),
('32c5b1a22c8fd702971e7361c784de4d4f206caba949021101795a6711570ff32fa395ad05130b1f', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:51:17', '2023-07-07 01:51:17', '2024-07-07 08:51:17'),
('33a171a495c39ba1fdc6784fe96a0468e181fedd80f049938b4ac9388498e62ea100277f19a4c886', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:03:29', '2023-07-07 02:03:29', '2024-07-07 09:03:29'),
('34596eccbe63d36baa726b85953b87bec5ec48eac66f69ca19bf784450d6c4d53f6fa2715c4c5014', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:37:24', '2023-07-07 01:37:24', '2024-07-07 08:37:24'),
('4135d180006be5cf0576ffd49aba2d2751ba83c55fdc000e4a04537d4483c3b946bab3d2e4fc401d', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:49:43', '2023-07-07 00:49:43', '2024-07-07 07:49:43'),
('4418747785785f291796045eb1b27c0a46d2758e9346771ad7239c8b9ecea0967dd98c5f18dd8430', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:54:18', '2023-07-07 00:54:18', '2024-07-07 07:54:18'),
('4773c7196ed6de73d53da31b91cf61daddce87f5c314bcd14b0990c1e2d3c945e3b63f57922c83ce', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:09:44', '2023-07-07 02:09:44', '2024-07-07 09:09:44'),
('5155a3be5c9132c27fa89120f1451daa2e49b9cfb78f30124859b734db6d43d498490ccce48aead5', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:11:53', '2023-07-07 02:11:53', '2024-07-07 09:11:53'),
('5348d350f552bbe4c50274a2c9888d79906bd6da8552f6d17c15202da0a3e0a35315830387738778', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 06:17:56', '2023-07-07 06:17:56', '2024-07-07 13:17:56'),
('54e3f422f5657851e51ec61100e4dd90c4349349b488229872c1d46dde956e6fbe477f650b7cb2ad', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:05:48', '2023-07-07 02:05:48', '2024-07-07 09:05:48'),
('56ee290ab4a69ae76d6eb8cca93aa129ec692366c54a2be365e7f26bccf77e7664e377e8e5389169', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:46:01', '2023-07-07 00:46:01', '2024-07-07 07:46:01'),
('571a23217555d840858bd8142fec91fce16eeff61185cb592350165c2153829583b479da3d1741f2', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:08:58', '2023-07-07 01:08:58', '2024-07-07 08:08:58'),
('5779b6ef57a705da5b9a76e8e868a3964b23c73daf4339be77b8d3ee50317a072e069dca39f43073', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:08:24', '2023-07-07 02:08:24', '2024-07-07 09:08:24'),
('663b2055bf8cdeadb2e45b6c250c98b955e7ab6e9de4281b4c6aeefcca0833e5e05d6e4f77733ff9', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 19:40:00', '2023-07-07 19:40:01', '2024-07-08 02:40:00'),
('6694bb3b4babf376ed798ae6f1132d8c9878ac9fabcd27bb8ad9caa63bcd847639d585547c4172b0', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:54:12', '2023-07-07 01:54:12', '2024-07-07 08:54:12'),
('68e9d9bcb0b6dc16ebc0923ab436138d500cc7a12474b1d6d293f77e56efda92e0c8bee813e8d4ab', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-06 20:14:35', '2023-07-06 20:14:35', '2024-07-07 03:14:35'),
('722a1cc7a99d5597dac36f46257d886bb02059c999d8e07915906d2d940a5bf0ac2024a8a918c62c', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:19:34', '2023-07-07 01:19:34', '2024-07-07 08:19:34'),
('7352132334cc2a037e4a647c4e5bfcf13bceafebbc19bf2789659e399f20b92e07e180ef48b97ac1', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:54:58', '2023-07-07 01:54:58', '2024-07-07 08:54:58'),
('7503b26fecf5c878858531cc7580275c39863a6961882aab118ecd1dd0ec438ea8b0018139527e9e', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:02:27', '2023-07-07 02:02:27', '2024-07-07 09:02:27'),
('7e4153f57f21404d1929c00898e2dc19d68d75354e3f642415ff106c9d457f5cb5aa990e4830d783', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:47:35', '2023-07-07 00:47:35', '2024-07-07 07:47:35'),
('803d40b0e11bd372d0c6af1bf6e5fd9120730d4b8058da692e86f015a674534f7520b5b64ab5243e', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:09:05', '2023-07-07 01:09:05', '2024-07-07 08:09:05'),
('8a15ba5dbf7932e7d72b9acfd4d4c9b841abaae5dcf202ab7c7327da5a7a931991a44beea94a653e', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:06:32', '2023-07-07 01:06:32', '2024-07-07 08:06:32'),
('95d62afeed179670266ab5323793bb58c199a2ecf24769718d571807a866bf6b57091acfa81b0e56', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:55:35', '2023-07-07 01:55:35', '2024-07-07 08:55:35'),
('98640b4fbb2ba4c374b6e20cd7b3004a32a1ed4a8771378cf2638e9ddc588645857b6b4251387d9f', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:00:28', '2023-07-07 01:00:28', '2024-07-07 08:00:28'),
('9e0be338f9913cdded45a19b83d16f65bef3bd3a0634364ece218ad2fc1bddd43ee8922866d10ea9', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:45:45', '2023-07-07 00:45:45', '2024-07-07 07:45:45'),
('a30bc48d0890b2a13d3f8177e30ef88bb56f4d3c6b379df311ac351f04a38d02085cdeb09e0e6801', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:54:24', '2023-07-07 00:54:24', '2024-07-07 07:54:24'),
('acff943a650b2c12d028b53bc23eec7e93da3fe7dc6a14f42bf9218143f1a81b216543b66a5edda1', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:13:59', '2023-07-07 01:13:59', '2024-07-07 08:13:59'),
('bdf0af54dba90bc39a8bb1e68b07df443ddc5b3df0206c07c852dff399b5440146965abc5b716278', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:53:45', '2023-07-07 00:53:45', '2024-07-07 07:53:45'),
('c1ac95aa0e32bb5f941e8129acbdf508d30681940460c37b30fc717550a7e7125485efad6322c41f', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:02:47', '2023-07-07 01:02:47', '2024-07-07 08:02:47'),
('c81d021c9be3e7e8e71e8c4db2c928e5936bd91c8b422267622934d3f1a81a0f196bfe3361e223dd', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:13:29', '2023-07-07 01:13:29', '2024-07-07 08:13:29'),
('d422746683e1ed35a1d47b14cf8b47c6dd63b1aa23f37585287e7757ae94dede77d8020b74821b83', 1, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:04:55', '2023-07-07 01:04:55', '2024-07-07 08:04:55'),
('d4431393f00ff1b7f3e9fe21a11012187986a26eb0a8b76187a705b934720dc7dfbf90e4dcb23bcf', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:57:23', '2023-07-07 01:57:23', '2024-07-07 08:57:23'),
('dfbb8d47295ad2944e94d3cfe62ab30e176c0e78df3b207bfbfb06aaf6460301e56f2cc0e30ae699', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 02:13:51', '2023-07-07 02:13:51', '2024-07-07 09:13:51'),
('dfcb0d22ca2709d559bc280b9df77a53d70ec1562e9df4b54cf3c86a44ae522fa161af0e8369a3f0', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:49:30', '2023-07-07 00:49:30', '2024-07-07 07:49:30'),
('e91715bf6ca0d0d1165819924140d8b81bfb7a34ced26f4afa151c14d60038965adbc26a60cab38d', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:49:22', '2023-07-07 00:49:22', '2024-07-07 07:49:22'),
('eba93df3f4f59a04600a1857a0986d98cf374d67728a76e6b6c2ac084d68a0b1febc53e032255a43', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:40:28', '2023-07-07 01:40:28', '2024-07-07 08:40:28'),
('ed107ce2a9f545d4397eb12d1d432b5117f233417190ac8a523b733ec15ba6fe5e88a94b8b441d4b', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 00:59:21', '2023-07-07 00:59:21', '2024-07-07 07:59:21'),
('f4694c7172b5a1cb77642c866ee6a6aac2059b716bad1aa9f9a12a1fd0460eafbb601f4d76dbe2a7', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 01:55:02', '2023-07-07 01:55:02', '2024-07-07 08:55:02'),
('fdc34d5ba6b3aa5041ffafc7a2b8d497a13a82b8382fb3e1b4b88f463a51b78fc3dc9df16c6fc774', 2, 3, 'Personal Access Token', '[]', 0, '2023-07-07 06:25:50', '2023-07-07 06:25:50', '2024-07-07 13:25:50');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', '8NJnNihphW9wM6DoOv2iqcSHK2XBjYwje2OFrLZd', NULL, 'http://localhost', 1, 0, 0, '2023-07-06 20:14:16', '2023-07-06 20:14:16'),
(2, NULL, 'Laravel Password Grant Client', 'aTSczHWaAAsf2gHtyXEJjcUyV9EAHMXaNGhAwL6D', 'users', 'http://localhost', 0, 1, 0, '2023-07-06 20:14:16', '2023-07-06 20:14:16'),
(3, NULL, 'Laravel Personal Access Client', 'DsRk6O4R4ZCf7A5y7DtrULpCWQvF1yJep591rLKq', NULL, 'http://localhost', 1, 0, 0, '2023-07-06 20:14:28', '2023-07-06 20:14:28'),
(4, NULL, 'Laravel Password Grant Client', 'mS4PmIBbNT6RAhfJaXcNfxZY5r6Liugp7ECOAeHe', 'users', 'http://localhost', 0, 1, 0, '2023-07-06 20:14:28', '2023-07-06 20:14:28');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-07-06 20:14:16', '2023-07-06 20:14:16'),
(2, 3, '2023-07-06 20:14:28', '2023-07-06 20:14:28');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rapchieu`
--

CREATE TABLE `rapchieu` (
  `maRap` bigint(20) UNSIGNED NOT NULL,
  `tenRap` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rapchieu`
--

INSERT INTO `rapchieu` (`maRap`, `tenRap`, `diachi`, `created_at`, `updated_at`) VALUES
(1, 'BHD Nguyen Gia Tri', 'Nguyen Gia Tri, Binh Thanh', '2023-07-09 10:21:26', '2023-07-09 10:21:26'),
(2, 'Lotte - Cantavil', 'L7-Cantavil Premier, Xa Lộ Hà Nội, Q.2', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `maGhe` bigint(20) UNSIGNED NOT NULL,
  `loaGhe` varchar(255) NOT NULL,
  `daDat` tinyint(1) NOT NULL,
  `taiKhoanNguoiDat` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `maRap` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`maGhe`, `loaGhe`, `daDat`, `taiKhoanNguoiDat`, `created_at`, `updated_at`, `maRap`) VALUES
(1, 'thuong', 0, NULL, NULL, NULL, 1),
(2, 'thuong', 0, NULL, NULL, NULL, 1),
(3, 'vip', 0, NULL, NULL, NULL, 1),
(4, 'thuong', 0, NULL, NULL, NULL, 2),
(5, 'thuong', 0, NULL, NULL, NULL, 2),
(6, 'vip', 0, NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `showtimes`
--

CREATE TABLE `showtimes` (
  `maLichChieu` bigint(20) UNSIGNED NOT NULL,
  `ngayChieu` date NOT NULL,
  `suatChieu` time NOT NULL,
  `giaVe` int(11) NOT NULL,
  `maPhim` bigint(20) UNSIGNED NOT NULL,
  `maRap` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`maLichChieu`, `ngayChieu`, `suatChieu`, `giaVe`, `maPhim`, `maRap`, `created_at`, `updated_at`) VALUES
(1, '2000-01-02', '09:00:00', 70000, 2, 2, '2023-07-11 02:18:25', '2023-07-11 03:00:06'),
(2, '2000-01-02', '09:00:00', 70000, 2, 1, '2023-07-11 03:00:29', '2023-07-11 03:00:29'),
(3, '2000-01-02', '09:00:00', 70000, 1, 2, '2023-07-11 03:29:40', '2023-07-11 03:29:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'KhachHang',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'concobebe', 'conco@gmail.com', NULL, '$2y$10$zt2Wws8HOV7fM0jyTVuPIulHY0HejalwgEncuRO.3rRRfuzmG11Cm', 'KhachHang', NULL, '2023-07-06 20:12:29', '2023-07-06 20:12:29'),
(2, 'Hoang', 'concobebe@gmail.com', NULL, '$2y$10$xL8YGZ4CRTQxPT3i/bCqQOUagbkH2NmvDkEDomiYwqSSNCM42pNHG', 'QuanTri', NULL, '2023-07-07 00:30:51', '2023-07-07 00:30:51'),
(3, 'Toan', 'toan@gmail.com', NULL, '123', 'QuanTri', NULL, '2023-07-09 08:14:10', '2023-07-09 08:14:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner_phim`
--
ALTER TABLE `banner_phim`
  ADD PRIMARY KEY (`maBanner`);

--
-- Indexes for table `danhsachghe`
--
ALTER TABLE `danhsachghe`
  ADD PRIMARY KEY (`maGhe`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hethongrap`
--
ALTER TABLE `hethongrap`
  ADD PRIMARY KEY (`maHeThongRap`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`maPhim`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rapchieu`
--
ALTER TABLE `rapchieu`
  ADD PRIMARY KEY (`maRap`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`maGhe`),
  ADD KEY `seats_marap_foreign` (`maRap`);

--
-- Indexes for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`maLichChieu`),
  ADD KEY `showtimes_maphim_foreign` (`maPhim`),
  ADD KEY `showtimes_marap_foreign` (`maRap`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner_phim`
--
ALTER TABLE `banner_phim`
  MODIFY `maBanner` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `danhsachghe`
--
ALTER TABLE `danhsachghe`
  MODIFY `maGhe` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hethongrap`
--
ALTER TABLE `hethongrap`
  MODIFY `maHeThongRap` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `maPhim` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rapchieu`
--
ALTER TABLE `rapchieu`
  MODIFY `maRap` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `maGhe` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `maLichChieu` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_marap_foreign` FOREIGN KEY (`maRap`) REFERENCES `rapchieu` (`maRap`);

--
-- Constraints for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_maphim_foreign` FOREIGN KEY (`maPhim`) REFERENCES `movies` (`maPhim`),
  ADD CONSTRAINT `showtimes_marap_foreign` FOREIGN KEY (`maRap`) REFERENCES `rapchieu` (`maRap`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
