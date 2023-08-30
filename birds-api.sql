-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2023 at 04:04 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `birds-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorybirds`
--

CREATE TABLE `categorybirds` (
  `id` int(255) NOT NULL,
  `category_birds` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorybirds`
--

INSERT INTO `categorybirds` (`id`, `category_birds`) VALUES
(1, '(C) Common - a species that is commonly found in Asia'),
(2, '(U) Uncommon - a species that is less frequently encountered in Asia'),
(3, '(R) Rare - a species that is seldom seen or has restricted distribution in Asia'),
(4, '(V) Vulnerable - a species that is at risk of becoming endangered in Asia'),
(5, '(E) Endangered - a species that is critically threatened and at risk of extinction in Asia'),
(6, '(X) Extinct - a species or subspecies that no longer exists in Asia.');

-- --------------------------------------------------------

--
-- Table structure for table `infobirds`
--

CREATE TABLE `infobirds` (
  `id` int(225) NOT NULL,
  `name_of_bird` varchar(500) NOT NULL,
  `type_of_bird` int(255) NOT NULL DEFAULT 1,
  `categories_bird` int(255) NOT NULL DEFAULT 1,
  `pict_bird` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `infobirds`
--

INSERT INTO `infobirds` (`id`, `name_of_bird`, `type_of_bird`, `categories_bird`, `pict_bird`) VALUES
(19, 'Common ostrich, Struthio camelus', 1, 1, '../uploads/burungunta.jpg'),
(20, 'Arabian ostrich, Struthio camelus syriacus', 1, 6, '../uploads/burunguntaarab.jpg'),
(21, 'North African ostrich, Struthio camelus camelus', 1, 1, '../uploads/northafricancamel.jpg'),
(22, 'Southern cassowary, Casuarius casuarius', 2, 1, '../uploads/kasuari.jpg'),
(23, 'Dwarf cassowary, Casuarius bennetii', 2, 1, '../uploads/Walsrode - Casuarius bennetti (9).JPG'),
(24, 'Northern cassowary, Casuarius unappendiculatus', 2, 1, '../uploads/Northern cassowary.jpeg'),
(25, 'Magpie goose, Anseranas semipalmata', 3, 1, '../uploads/animals_hero_magpie_goose.jpg'),
(26, 'Spotted whistling-duck, Dendrocygna guttata', 4, 1, '../uploads/Spotted_Whistling_Duck_RWD3.jpg'),
(27, 'Plumed whistling-duck, Dendrocygna eytoni', 4, 3, '../uploads/Dendrocygna_eytoni_-_Macquarie_University.jpg'),
(28, 'Fulvous whistling-duck, Dendrocygna bicolor', 4, 1, '../uploads/Dendrocygna_bicolor_wilhelma.jpg'),
(29, 'Wandering whistling-duck, Dendrocygna arcuata', 4, 1, '../uploads/1800.jpeg'),
(31, 'Lesser whistling-duck, Dendrocygna javanica', 4, 1, '../uploads/1800 (1).jpeg'),
(32, 'Wattled brushturkey, Aepypodius arfakinus', 20, 1, '../uploads/Wattled_Brush-turkey_(Aepypodius_arfakianus)_(7937162662).jpg'),
(33, 'Waigeo brushturkey, Aepypodius bruijni', 20, 1, '../uploads/Annales_des_sciences_naturelles_(1881)_(18204839675).jpg'),
(34, 'Red-billed brushturkey, Talegalla cuvieri', 20, 1, '../uploads/Talegalla_cuvieri.jpg'),
(35, 'Yellow-legged brushturkey, Talegalla fuscirostris', 20, 1, '../uploads/The_genera_of_birds_-_Talegalla_fuscirostris_(19140083500)_(cropped).jpg'),
(36, 'Red-legged brushturkey, Talegalla jobiensis', 20, 1, '../uploads/Talegalla_jobiensis_2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `randomimages`
--

CREATE TABLE `randomimages` (
  `id` int(225) NOT NULL,
  `url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `randomimages`
--

INSERT INTO `randomimages` (`id`, `url`) VALUES
(1, 'https://th.bing.com/th/id/OIP.MS_AcGcsB3glYaKJWCSSCwHaE8?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7');

-- --------------------------------------------------------

--
-- Table structure for table `typebirds`
--

CREATE TABLE `typebirds` (
  `id` int(255) NOT NULL,
  `type_of_birds` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `typebirds`
--

INSERT INTO `typebirds` (`id`, `type_of_birds`) VALUES
(1, 'Ostriches'),
(2, 'Cassowaries and emu'),
(3, 'Magpie goose'),
(4, 'Ducks, geese, and waterfowl'),
(20, 'Megapodes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorybirds`
--
ALTER TABLE `categorybirds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `infobirds`
--
ALTER TABLE `infobirds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `randomimages`
--
ALTER TABLE `randomimages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `typebirds`
--
ALTER TABLE `typebirds`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorybirds`
--
ALTER TABLE `categorybirds`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `infobirds`
--
ALTER TABLE `infobirds`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `randomimages`
--
ALTER TABLE `randomimages`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `typebirds`
--
ALTER TABLE `typebirds`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
