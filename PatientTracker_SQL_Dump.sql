-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: us-cdbr-east-03.cleardb.com    Database: heroku_ae370199c293c49
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hospitalstaff`
--

DROP TABLE IF EXISTS `hospitalstaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospitalstaff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_email` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `position` varchar(30) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitalstaff`
--

LOCK TABLES `hospitalstaff` WRITE;
/*!40000 ALTER TABLE `hospitalstaff` DISABLE KEYS */;
INSERT INTO `hospitalstaff` VALUES (4,'A11111111@gmail.com','Jieun Yu','$2a$10$kEGG9mllKD7iIFE8VV3MMOMyHxu9ESNZzYOhXC9RAxRYl4li9dYO6','Psychiatrist',0),(14,'A01234567@gmail.com','Jay Han','$2a$10$.KIz82SWnnZbbgxayIGESuulFSCAIits1esXtB.vCy2FTYBKkhx3C','Surgeon',1),(24,'A76543210@gmail.com','Melody Oh','$2a$10$MI9RY8dlUHg2vLZc.kcRlOqFsLh3uDP.z9iNtLLWnDPrOkFGQFGx6','Dermatology',0);
/*!40000 ALTER TABLE `hospitalstaff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medication` (
  `medication_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (4,'Adderall'),(14,'Aspirin'),(24,'Methadone'),(34,'Ibuprofen'),(44,'Codeine'),(54,'Hydrocodone'),(64,'Corticosteroids'),(74,'Xanax');
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(30) NOT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `patient_condition` varchar(200) NOT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (4,'gimoring','Male',21,65.20,'Nightmare'),(14,'Jane Doe','Female',34,49.12,'Heart Disease'),(64,'','',0,0.00,''),(74,'jay','Female',23,24.50,'zombie'),(84,'melody','Female',15,15.00,'zombie'),(104,'jay han','Male',30,30.00,'zombie'),(114,'tyler','Male',22,22.00,'zombie'),(124,'jay','Female',24,45.00,'zombie');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patientdosage`
--

DROP TABLE IF EXISTS `patientdosage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patientdosage` (
  `medication_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `dosage` int(11) NOT NULL,
  PRIMARY KEY (`medication_id`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `patientdosage_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`medication_id`),
  CONSTRAINT `patientdosage_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patientdosage`
--

LOCK TABLES `patientdosage` WRITE;
/*!40000 ALTER TABLE `patientdosage` DISABLE KEYS */;
INSERT INTO `patientdosage` VALUES (4,84,13),(14,4,80),(14,14,20),(24,4,15),(24,14,12),(34,4,5);
/*!40000 ALTER TABLE `patientdosage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'heroku_ae370199c293c49'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-09 23:49:18
