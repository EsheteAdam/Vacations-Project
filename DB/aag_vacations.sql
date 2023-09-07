-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: aag_vacations
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_key` int NOT NULL,
  `vacation_key` int NOT NULL,
  KEY `user_key` (`user_key`),
  KEY `vacation_key` (`vacation_key`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `users` (`user_key`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_key`) REFERENCES `vacations` (`vacation_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,7),(2,4),(2,5),(2,1),(2,6),(2,8),(2,3),(2,2),(2,10),(2,15),(2,14),(2,13),(3,2),(3,7),(3,8),(3,4),(3,3),(3,5),(3,14),(3,12),(3,11),(3,9),(3,10),(3,16),(3,13),(4,1),(4,6),(4,8),(4,4),(4,9),(4,11),(4,16),(4,12),(4,5),(4,7),(5,3),(5,2),(5,6),(5,1),(5,4),(5,10),(5,14),(5,12),(5,16),(5,9),(5,15),(6,1),(6,3),(6,6),(6,5),(6,7),(6,8),(6,15),(6,14),(6,13),(6,11),(6,12),(6,10),(8,3),(8,1),(8,2),(8,7),(8,13),(8,12),(9,6),(9,4),(9,3),(9,7),(3,15);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_key` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`user_key`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Adam','Eshete','adam@adam.adam','admin','admin'),(2,'adi','yona','adiyona@gmail.com','1111','user'),(3,'yonatan','waiss','yonatanwaiss@gamil.com','1111','user'),(4,'liran','piastro','liranpiastro@gmail.com','1111','user'),(5,'avi','mesholam','avi@mesholam.com','1111','user'),(6,'efi','eshete','efieshete@gmail.com','1111','user'),(7,'osher','lankri','osherlankri@gamil.com','1111','user'),(8,'noy','sium','noysium@gmail.com','1111','user'),(9,'shoval','farbshtain','shovalfarbshtiat@gmail.com','1111','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_key` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(400) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `picture_file` varchar(90) NOT NULL,
  PRIMARY KEY (`vacation_key`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Cape Town','Explore the beauty of Cape Town with its stunning landscapes and vibrant culture.','2023-08-15','2023-08-25',3000,'cape_town.jpg'),(2,'Dubai','Experience the luxury and grandeur of Dubai with its modern architecture and exciting attractions.','2023-09-01','2023-09-10',4000,'dubai.jpg'),(3,'Egypt','Uncover the mysteries of ancient Egypt and visit iconic landmarks like the pyramids and Sphinx.','2023-10-01','2023-10-10',2500,'egypt.jpg'),(4,'Ethiopia','Immerse yourself in the rich history and diverse culture of Ethiopia.','2023-11-01','2023-11-10',2000,'ethiopia.jpg'),(5,'Israel','Discover the historic sites and vibrant atmosphere of Israel.','2023-12-01','2023-12-10',3500,'israel.jpg'),(6,'London','Experience the cosmopolitan city of London with its iconic landmarks and thriving arts scene.','2024-01-01','2024-01-10',4000,'london.jpg'),(7,'Los Angeles','Explore the glitz and glamour of Los Angeles, the entertainment capital of the world.','2024-02-01','2024-02-10',3500,'los_angeles.jpg'),(8,'New York','Discover the bustling streets and iconic landmarks of New York City.','2024-03-01','2024-03-10',3800,'new_york.jpg'),(9,'Paris','Experience the romantic charm and artistic beauty of Paris, the City of Light.','2024-04-01','2024-04-10',4200,'paris.jpg'),(10,'Rio','Enjoy the vibrant culture and breathtaking beaches of Rio de Janeiro.','2024-05-01','2024-05-10',3000,'rio.jpg'),(11,'Tokyo','Immerse yourself in the unique blend of tradition and modernity in Tokyo.','2024-06-01','2024-06-10',4500,'tokyo.jpg'),(12,'Sydney','Experience the beauty of Sydney with its iconic Opera House and stunning beaches.','2024-07-01','2024-07-10',3800,'sydney.jpg'),(13,'Barcelona','Explore the vibrant city of Barcelona with its rich history, art, and delicious cuisine.','2024-08-01','2024-08-10',4200,'barcelona.jpg'),(14,'Amsterdam','Discover the charming canals, historic architecture, and vibrant culture of Amsterdam.','2024-09-01','2024-09-10',3500,'amsterdam.jpg'),(15,'Bangkok','Immerse yourself in the bustling streets, vibrant markets, and ornate temples of Bangkok.','2024-10-01','2024-10-10',3000,'bangkok.jpg'),(16,'Cancun','Relax and enjoy the beautiful beaches and crystal-clear waters of Cancun.','2024-11-01','2024-11-10',2800,'cancun.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 16:05:05
