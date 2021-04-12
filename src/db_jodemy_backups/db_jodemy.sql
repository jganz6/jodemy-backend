-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Apr 2021 pada 22.14
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_jodemy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `class`
--

CREATE TABLE `class` (
  `id_class` int(11) NOT NULL,
  `id_facilitator` int(40) NOT NULL,
  `class_name` varchar(40) NOT NULL,
  `category` varchar(40) NOT NULL,
  `level` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL,
  `pricing` int(255) NOT NULL,
  `schedule` varchar(25) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `class_logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `class`
--

INSERT INTO `class` (`id_class`, `id_facilitator`, `class_name`, `category`, `level`, `description`, `pricing`, `schedule`, `start_time`, `end_time`, `class_logo`) VALUES
(1, 5, 'Front-end Fundamentals', 'Software', 'Beginner', 'Learn the fundamentals', 0, 'Friday', '12:00:00', '13:30:00', NULL),
(2, 5, 'HTML for beginners', 'Software', 'Beginner', 'HTML from sctratch', 0, 'Friday', '13:45:00', '15:15:00', NULL),
(3, 5, 'History of Europe', 'History', 'Beginner', 'The history of Europe concerns itself...', 0, 'saturday', '09:00:00', '11:00:00', NULL),
(4, 5, 'Trigonometry', 'Math', 'Beginner', 'Trigonometry helps us find angles...', 0, 'Saturday', '12:00:00', '14:00:00', NULL),
(5, 5, 'Algebra', 'Math', 'Beginner', 'Branch of mathematics dealing with...', 0, 'Saturday', '15:00:00', '16:00:00', NULL),
(6, 5, 'Molecular Biology', 'Science', 'Beginner', 'Study the composition, structure...', 0, 'Monday', '09:00:00', '10:00:00', NULL),
(7, 5, 'Banking Finance', 'Finance', 'Beginner', 'Explore the dynamic, fast-paced...', 0, 'Monday', '11:00:00', '12:00:00', NULL),
(8, 5, 'Basic Excel', 'Software', 'Beginner', 'Learn Excel from beginner to...', 0, 'Monday', '13:00:00', '14:00:00', NULL),
(9, 5, 'Thermodynamics and phase equilibria', 'science', 'Beginner', 'Learn thermodynamics and and how...', 0, 'Tuesday', '09:00:00', '11:00:00', NULL),
(10, 5, 'Ancient Egypt and Its Civilization', 'History', 'Beginner', 'Colossal pyramids, imposing temples...', 0, 'Tuesday', '12:00:00', '13:00:00', NULL),
(12, 5, 'DataStructure', 'Software', 'Beginner', '-', 200, 'Friday', '09:00:00', '10:00:00', NULL),
(13, 7, 'Know more Javascript', 'Software', 'Beginner', 'Javascript from the basic for...', 0, 'Tuesday', '13:15:00', '14:15:00', NULL),
(14, 7, 'HTML and CSS to code', 'Software', 'Intermediate', 'Start combining HTML and CSS to...', 10, 'Thursday', '09:00:00', '10:00:00', NULL),
(15, 7, 'Indonesian war history', 'History', 'Advance', 'From the first colonialization until...', 50, 'Thursday', '11:00:00', '12:00:00', NULL),
(16, 7, 'Buddhism and Modern Psychology', 'Psychology', 'Beginner', 'Buddhism and science are deeply...', 0, 'Thursday', '13:00:00', '14:00:00', NULL),
(17, 7, 'Financial markets', 'Finance', 'Intermediate', 'An overview of the ideas, methods...', 10, 'Wednesday', '09:00:00', '10:00:00', NULL),
(18, 7, 'Corporate finance', 'Finance', 'Advance', 'Introduction to the fundamentals...', 50, 'Wednesday', '11:00:00', '12:00:00', NULL),
(19, 7, 'Algorithm specialization', 'Math', 'Advance', 'Learn to think like a computer...', 50, 'Wednesday', '13:00:00', '14:00:00', NULL),
(20, 7, 'Business and Financial Modeling', 'Software', 'Beginner', 'Designed to help you make...', 0, 'Friday', '10:30:00', '11:30:00', NULL),
(21, 7, 'Marketing in a Digital World', 'Software', 'Intermediate', 'This class examines how digital...', 10, 'Wednesday', '15:00:00', '16:00:00', NULL),
(22, 7, 'Social Psychology', 'Psychology', 'Advance', 'This class offers some answers...', 50, 'Thursday', '15:00:00', '16:00:00', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `class_subject`
--

CREATE TABLE `class_subject` (
  `id_subject` int(40) NOT NULL,
  `id_class` int(11) NOT NULL,
  `subject_name` varchar(40) NOT NULL,
  `subject_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `class_subject`
--

INSERT INTO `class_subject` (`id_subject`, `id_class`, `subject_name`, `subject_date`) VALUES
(1, 1, 'HTML Essential Training', '2021-03-05'),
(2, 1, 'CSS Essential Training', '2021-03-12'),
(3, 1, 'Javascript Essential Training', '2021-03-19'),
(4, 1, 'Responsive Layout', '2021-03-26'),
(5, 1, 'Mid-term Exam', '2021-04-02'),
(6, 1, 'Bootstrap4 Essential Training', '2021-04-09'),
(7, 1, 'Sass Essential Training', '2021-04-16'),
(8, 1, 'Learning React.js', '2021-04-23'),
(9, 1, 'UX for Web Design', '2021-04-30'),
(10, 1, 'Final-term Exam', '2021-05-07'),
(11, 3, 'The Origins of the Industrial Revolution', '2021-03-06'),
(12, 3, 'Population and the Thirty Years War', '2021-03-13'),
(13, 3, 'History Lorem ipsum', '2021-03-20'),
(28, 2, 'Introduction to HTML', '2021-03-05'),
(29, 2, 'HTML elements', '2021-03-12'),
(30, 2, 'Project on HTML', '2021-03-19'),
(31, 4, 'What is Trigonometry?', '2021-03-06'),
(32, 4, 'Sin, Cos, Tan', '2021-03-13'),
(33, 4, 'Unit Circle', '2021-03-20'),
(34, 5, 'Introduction to Algebra', '2021-03-06'),
(35, 5, 'Algebra 1', '2021-03-13'),
(36, 5, 'Algebra 2', '2021-03-20'),
(37, 6, 'Introduction to Molecular Biology', '2021-03-01'),
(38, 6, 'Molecular Evolution, The History', '2021-03-08'),
(39, 6, 'Fundamentals Tenets of Molecular Biology', '2021-03-15'),
(40, 7, 'Treasury Management', '2021-03-01'),
(41, 7, 'Future and Options Markets', '2021-03-08'),
(42, 7, 'Property Investment', '2021-03-15'),
(43, 7, 'Banking Law', '2021-03-22'),
(44, 8, 'Getting Started with Excel', '2021-03-01'),
(45, 8, 'Data Entry, Data Editing and Number Form', '2021-03-08'),
(46, 8, 'Data Formatting', '2021-03-15'),
(47, 8, 'Working with Cells and Ranges in Excel', '2021-03-22'),
(48, 9, 'Introduction: Basic Concepts of Thermody', '2021-03-02'),
(49, 9, 'Properties of Pure Substances', '2021-03-09'),
(50, 9, 'Heat Effects', '2021-03-16'),
(51, 9, 'The First Law of Thermodynamics: Closed ', '2021-03-23'),
(52, 10, 'Predynastic History', '2021-03-02'),
(53, 10, 'Early Dynastic Periods', '2021-03-09'),
(54, 10, 'Old Kingdom', '2021-03-16'),
(55, 10, 'First Intermediate Period', '2021-03-23'),
(56, 12, 'Data Structure 1', '2021-03-05'),
(57, 12, 'Data Structure 2', '2021-03-12'),
(58, 12, 'Tree Based DSA 1', '2021-03-19'),
(59, 12, 'Tree Based DSA 2', '2021-03-26'),
(60, 22, 'Introduction to Social Psychology', '2021-03-04'),
(61, 22, 'Concepts in Social Psychology', '2021-03-11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `score_subject_report`
--

CREATE TABLE `score_subject_report` (
  `id_account` int(40) NOT NULL,
  `id_class` int(11) NOT NULL,
  `id_subject` int(40) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `score_subject_report`
--

INSERT INTO `score_subject_report` (`id_account`, `id_class`, `id_subject`, `score`) VALUES
(1, 1, 1, 80),
(1, 1, 2, 56),
(1, 1, 3, 68),
(1, 1, 4, 78),
(1, 1, 5, 98),
(1, 1, 6, 98),
(1, 1, 7, 23),
(1, 1, 8, 49),
(1, 1, 9, 78),
(1, 1, 10, 88),
(1, 3, 11, 80),
(1, 3, 12, 70),
(2, 3, 11, NULL),
(2, 3, 12, NULL),
(3, 1, 1, NULL),
(3, 1, 2, NULL),
(3, 1, 3, 80),
(3, 1, 4, NULL),
(3, 1, 5, NULL),
(3, 1, 6, NULL),
(3, 1, 7, NULL),
(3, 1, 8, NULL),
(3, 1, 9, NULL),
(3, 1, 10, NULL),
(1, 3, 13, NULL),
(2, 3, 13, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_account`
--

CREATE TABLE `tb_account` (
  `id_account` int(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(40) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `photo_profile` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `tb_account`
--

INSERT INTO `tb_account` (`id_account`, `email`, `password`, `username`, `phone_number`, `role`, `photo_profile`) VALUES
(1, 'emirkharisma@gmail.com', '$2a$10$RvPdY4AQtJDTqmQoZ/ffiOIX1T8/idoTI8nzBurX4rd2Oql8cSmNG', 'jodie', '081802088103', 0, '/images/1617942763548-image.png'),
(2, 'nathasia19@gmail.com', '$2a$10$4c.vd7lmo1kntidMw03la.rJ2dMu4WRd.25/gGgE1YIq5e7SQB9hu', 'nathasia', '', 0, ''),
(3, 'nat19@gmail.com', '$2a$10$r68bT6FSNGV.UfezoV9h7.NBq1m7SLTL2rXErks5ugbEdiVMpISLq', 'nat99', '081802088103', 0, ''),
(5, 'kimihime@gmail.com', '$2a$10$saOfoVtj6nm5BCAEnEjwTuM32C/BgHgfBXCVqRFoEleJG27UMcTGu', 'kimihime', '', 1, ''),
(7, 'nurdin88@gmail.com', '$2a$10$qEyeG0P8p8xLehtRQL3ZdeYtH9F5MJqgmQUHfsbSC3yvzF8RljNtW', 'nurdin', '', 1, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_logs`
--

CREATE TABLE `user_logs` (
  `token` varchar(255) NOT NULL,
  `user_logs_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `user_logs`
--

INSERT INTO `user_logs` (`token`, `user_logs_date`) VALUES
('aksjdoasdiojwkqldkqmsoqd.siqdjqi129313m@2ld2949.20231231jdnSUuhsJD', '2021-04-11 20:09:12');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id_class`);

--
-- Indeks untuk tabel `class_subject`
--
ALTER TABLE `class_subject`
  ADD PRIMARY KEY (`id_subject`),
  ADD KEY `id_class` (`id_class`);

--
-- Indeks untuk tabel `score_subject_report`
--
ALTER TABLE `score_subject_report`
  ADD KEY `id_account` (`id_account`),
  ADD KEY `id_class` (`id_class`),
  ADD KEY `id_subject` (`id_subject`);

--
-- Indeks untuk tabel `tb_account`
--
ALTER TABLE `tb_account`
  ADD PRIMARY KEY (`id_account`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `class`
--
ALTER TABLE `class`
  MODIFY `id_class` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `class_subject`
--
ALTER TABLE `class_subject`
  MODIFY `id_subject` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT untuk tabel `tb_account`
--
ALTER TABLE `tb_account`
  MODIFY `id_account` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `class_subject`
--
ALTER TABLE `class_subject`
  ADD CONSTRAINT `id_class` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `score_subject_report`
--
ALTER TABLE `score_subject_report`
  ADD CONSTRAINT `id_account` FOREIGN KEY (`id_account`) REFERENCES `tb_account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_subject` FOREIGN KEY (`id_subject`) REFERENCES `class_subject` (`id_subject`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `score_subject_report_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Event
--
CREATE DEFINER=`root`@`localhost` EVENT `Clean_Older_Than_1_day_logs` ON SCHEDULE EVERY '0 1' DAY_HOUR STARTS '2021-04-12 03:05:39' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Clean up user_logs older than 1 day.' DO DELETE FROM user_logs
    WHERE user_logs_date < DATE_SUB(NOW(), INTERVAL 1 DAY)$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
