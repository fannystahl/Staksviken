-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 17 jan 2019 kl 10:04
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `avloppsdb`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `kontroll`
--

CREATE TABLE `kontroll` (
  `ID` int(11) NOT NULL,
  `Fname` varchar(100) NOT NULL,
  `Lname` varchar(100) NOT NULL,
  `Cdate` date NOT NULL,
  `Cpoint` varchar(100) NOT NULL,
  `Cstatus` varchar(1) NOT NULL,
  `Ccomment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `kontroll`
--

INSERT INTO `kontroll` (`ID`, `Fname`, `Lname`, `Cdate`, `Cpoint`, `Cstatus`, `Ccomment`) VALUES
(6, 'Lisa', 'Marin', '2018-11-16', 'Brunn', 'N', NULL),
(7, 'Urban', 'StÃ¥hl', '2019-01-01', 'Andra fÃ¶rdelningsbrunn', 'Y', ''),
(8, 'Monica', 'Johansson', '2019-01-09', 'FÃ¶rsta utloppsbrunn', 'Y', 'Bra!');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `kontroll`
--
ALTER TABLE `kontroll`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `kontroll`
--
ALTER TABLE `kontroll`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
