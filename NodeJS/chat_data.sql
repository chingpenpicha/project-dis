-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: chat_data
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `groupId` int(10) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `groupDescription` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`groupId`),
  UNIQUE KEY `groupId_UNIQUE` (`groupId`)
) ENGINE=InnoDB AUTO_INCREMENT=10028 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (10000,'Test',NULL),(10001,'Test2',NULL),(10002,'Test3',NULL);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupmember`
--

DROP TABLE IF EXISTS `groupmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupmember` (
  `groupId` int(10) NOT NULL,
  `userId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `messageId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`groupId`,`userId`),
  KEY `userId_fk_idx` (`userId`),
  CONSTRAINT `groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupmember`
--

LOCK TABLES `groupmember` WRITE;
/*!40000 ALTER TABLE `groupmember` DISABLE KEYS */;
INSERT INTO `groupmember` VALUES (10000,'Boss','85'),(10000,'Kie','121'),(10000,'natty','274'),(10000,'Sun','274'),(10000,'Test','0'),(10001,'Boss','0'),(10001,'Ching','241'),(10001,'natty','241'),(10001,'Sun','241'),(10001,'Test','0'),(10002,'Ching','204'),(10002,'natty','204'),(10002,'Test','18');
/*!40000 ALTER TABLE `groupmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `messageId` int(10) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `timeStamp` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `userId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `groupId` int(10) NOT NULL,
  PRIMARY KEY (`messageId`),
  KEY `userId_fk_idx` (`userId`),
  KEY `groupId_fkm_idx` (`groupId`),
  CONSTRAINT `groupId_fkm` FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userId_fkm` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (65,'lfjszg','Sat, 5/5/2018, 20:24:18','natty',10000),(66,'d;lsgjd','Sat, 5/5/2018, 20:24:19','natty',10000),(67,'dfnflks','Sat, 5/5/2018, 20:24:19','natty',10000),(68,'mflkdjsh','Sat, 5/5/2018, 20:24:20','natty',10000),(69,'lgsh','Sat, 5/5/2018, 20:24:21','natty',10000),(70,'adfsjgjagrjpgak[p','Sat, 5/5/2018, 20:24:25','natty',10000),(71,'dgs[','Sat, 5/5/2018, 20:24:25','natty',10000),(72,'pkgdidfkdfsjlkfgoguewa','Sat, 5/5/2018, 20:24:27','natty',10000),(73,'aksodpoaksd','Sat, 5/5/2018, 20:25:29','Sun',10000),(74,'l;qkwef','Sat, 5/5/2018, 20:25:32','Sun',10000),(75,'kwefqlkwe','Sat, 5/5/2018, 20:25:34','Sun',10000),(76,'qwekfqwkepoqewf','Sat, 5/5/2018, 20:25:35','Sun',10000),(77,'fdd','Sat, 5/5/2018, 20:26:17','natty',10000),(78,'fdasd','Sat, 5/5/2018, 20:26:22','natty',10000),(79,'sad','Sat, 5/5/2018, 20:28:03','natty',10000),(80,'fda','Sat, 5/5/2018, 20:28:04','natty',10000),(81,'asd','Sat, 5/5/2018, 20:28:07','Ching',10000),(82,'sda','Sat, 5/5/2018, 20:28:09','Ching',10000),(83,'1','Sat, 5/5/2018, 20:28:47','Sun',10000),(84,'2','Sat, 5/5/2018, 20:28:48','Sun',10000),(85,'3','Sat, 5/5/2018, 20:28:48','Sun',10000),(86,'','Sat, 5/5/2018, 20:56:44','Ching',10001),(87,'erwer','Sat, 5/5/2018, 20:56:57','Ching',10000),(88,'were','Sat, 5/5/2018, 20:57:01','Ching',10001),(89,'sad','Sat, 5/5/2018, 20:58:27','Ching',10000),(90,'f','Sat, 5/5/2018, 20:58:28','Ching',10000),(91,'d','Sat, 5/5/2018, 20:58:29','Ching',10000),(92,'s','Sat, 5/5/2018, 20:58:29','Ching',10000),(93,'s','Sat, 5/5/2018, 20:58:29','Ching',10000),(94,'s','Sat, 5/5/2018, 20:58:30','Ching',10000),(95,'aw','Sat, 5/5/2018, 20:58:31','Ching',10000),(96,'qowekf','Sat, 5/5/2018, 20:58:52','Kie',10000),(97,'apsdlf','Sat, 5/5/2018, 20:58:53','Kie',10000),(98,'354684','Sat, 5/5/2018, 20:58:54','Kie',10000),(99,'5340212','Sat, 5/5/2018, 20:58:56','Kie',10000),(100,'w\'elfwfef','Sat, 5/5/2018, 20:59:17','Sun',10000),(101,'123','Sat, 5/5/2018, 20:59:17','natty',10000),(102,'weflw\'lef','Sat, 5/5/2018, 20:59:18','Sun',10000),(103,'213145','Sat, 5/5/2018, 20:59:18','natty',10000),(104,'wefplwefpwe','Sat, 5/5/2018, 20:59:19','Sun',10000),(105,'pewl','Sat, 5/5/2018, 20:59:20','Sun',10000),(106,'wp','Sat, 5/5/2018, 20:59:20','Sun',10000),(107,'sd\'f;','Sat, 5/5/2018, 20:59:22','Sun',10000),(108,'dfs;','Sat, 5/5/2018, 20:59:23','Sun',10000),(109,';lwer','Sat, 5/5/2018, 20:59:35','Sun',10000),(110,'qwew','Sat, 5/5/2018, 20:59:54','Ching',10000),(111,'qwe','Sat, 5/5/2018, 20:59:55','Ching',10000),(112,'wqe','Sat, 5/5/2018, 20:59:55','Ching',10000),(113,'wq','Sat, 5/5/2018, 20:59:55','Ching',10000),(114,'qw','Sat, 5/5/2018, 20:59:58','Ching',10000),(115,'w','Sat, 5/5/2018, 20:59:59','Ching',10000),(116,'s;dlf','Sat, 5/5/2018, 21:00:05','Sun',10000),(117,'4sdf','Sat, 5/5/2018, 21:00:07','Sun',10000),(118,']sdf','Sat, 5/5/2018, 21:00:08','Sun',10000),(119,'sdmf;l;\'','Sat, 5/5/2018, 21:00:09','Sun',10000),(120,'','Sat, 5/5/2018, 21:00:09','Sun',10000),(121,'l\'','Sat, 5/5/2018, 21:00:09','Sun',10000),(122,';s;a','Sat, 5/5/2018, 21:00:34','Sun',10000),(123,'x;','Sat, 5/5/2018, 21:00:36','Sun',10000),(124,'[we','Sat, 5/5/2018, 21:00:37','Sun',10000),(125,'ls,d','Sat, 5/5/2018, 21:00:38','Sun',10000),(126,'start','Sat, 5/5/2018, 21:05:49','Sun',10000),(127,'a;sd;','Sat, 5/5/2018, 21:06:29','Sun',10000),(128,'asadf','Sat, 5/5/2018, 21:06:29','natty',10000),(129,'sfdsd','Sat, 5/5/2018, 21:06:30','natty',10000),(130,'\'asdll','Sat, 5/5/2018, 21:06:30','Sun',10000),(131,';f','Sat, 5/5/2018, 21:06:31','Sun',10000),(132,'afasf','Sat, 5/5/2018, 21:06:32','natty',10000),(133,';;d','Sat, 5/5/2018, 21:06:33','Sun',10000),(134,'sfasad','Sat, 5/5/2018, 21:06:34','natty',10000),(135,'\'a;s','Sat, 5/5/2018, 21:06:34','Sun',10000),(136,'sadsa','Sat, 5/5/2018, 21:38:54','Ching',10000),(137,'asd','Sat, 5/5/2018, 21:38:56','Ching',10000),(138,'sad','Sat, 5/5/2018, 21:38:56','Ching',10000),(139,'s','Sat, 5/5/2018, 21:38:57','Ching',10000),(140,'dsa','Sat, 5/5/2018, 21:38:59','Ching',10000),(141,'asdsa','Sat, 5/5/2018, 21:39:04','Ching',10000),(142,'qwswqsw','Sat, 5/5/2018, 21:50:34','Ching',10000),(143,'xzxzzx','Sat, 5/5/2018, 21:50:39','Ching',10001),(144,'','Sat, 5/5/2018, 21:50:40','Ching',10001),(145,'','Sat, 5/5/2018, 21:50:40','Ching',10001),(146,'','Sat, 5/5/2018, 21:50:40','Ching',10001),(147,'zxc','Sat, 5/5/2018, 21:50:43','Ching',10001),(148,'','Sat, 5/5/2018, 21:50:43','Ching',10001),(149,'','Sat, 5/5/2018, 21:50:43','Ching',10001),(150,'12323','Sat, 5/5/2018, 21:51:58','Ching',10000),(151,'qweew','Sat, 5/5/2018, 21:52:01','Ching',10000),(152,'qweqwe','Sat, 5/5/2018, 21:52:05','Ching',10000),(153,'qwe','Sat, 5/5/2018, 21:54:05','Ching',10000),(154,'qwe','Sat, 5/5/2018, 21:54:05','Ching',10000),(155,'wq','Sat, 5/5/2018, 21:54:06','Ching',10000),(156,'e','Sat, 5/5/2018, 21:54:06','Ching',10000),(157,'we','Sat, 5/5/2018, 21:54:06','Ching',10000),(158,'qw','Sat, 5/5/2018, 21:54:06','Ching',10000),(159,'564654654','Sat, 5/5/2018, 21:55:40','natty',10000),(160,'456','Sat, 5/5/2018, 21:55:41','natty',10000),(161,'456','Sat, 5/5/2018, 21:55:41','natty',10000),(162,'456','Sat, 5/5/2018, 21:55:42','natty',10000),(163,'123','Sat, 5/5/2018, 21:55:43','natty',10000),(164,'123546','Sat, 5/5/2018, 21:55:44','natty',10000),(165,'sad','Sat, 5/5/2018, 21:59:13','Ching',10000),(166,'sada','Sat, 5/5/2018, 21:59:36','Ching',10000),(167,'asdfasw','Sat, 5/5/2018, 21:59:38','Ching',10000),(168,'wqe','Sat, 5/5/2018, 21:59:51','Ching',10000),(169,'wqd','Sat, 5/5/2018, 21:59:51','Ching',10000),(170,'sa','Sat, 5/5/2018, 22:00:03','Ching',10000),(171,'s','Sat, 5/5/2018, 22:00:03','Ching',10000),(172,'a','Sat, 5/5/2018, 22:00:04','Ching',10000),(173,'sadasd','Sat, 5/5/2018, 22:00:10','Ching',10001),(174,'sa','Sat, 5/5/2018, 22:00:10','Ching',10001),(175,'sad','Sat, 5/5/2018, 22:00:10','Ching',10001),(176,'s','Sat, 5/5/2018, 22:00:10','Ching',10001),(177,'21654','Sat, 5/5/2018, 22:00:11','natty',10000),(178,'','Sat, 5/5/2018, 22:00:11','natty',10000),(179,'564','Sat, 5/5/2018, 22:00:12','natty',10000),(180,'a','Sat, 5/5/2018, 22:00:12','Ching',10001),(181,'sd','Sat, 5/5/2018, 22:01:12','Ching',10000),(182,'wqe','Sat, 5/5/2018, 22:01:12','Ching',10000),(183,'qw','Sat, 5/5/2018, 22:01:13','Ching',10000),(184,'eqw','Sat, 5/5/2018, 22:01:13','Ching',10000),(185,'e','Sat, 5/5/2018, 22:01:13','Ching',10000),(186,'q','Sat, 5/5/2018, 22:01:13','Ching',10000),(187,'','Sat, 5/5/2018, 22:01:14','Ching',10000),(188,'asdas','Sat, 5/5/2018, 22:01:22','Ching',10001),(189,'sad','Sat, 5/5/2018, 22:01:22','Ching',10001),(190,'','Sat, 5/5/2018, 22:01:22','Ching',10001),(191,'a','Sat, 5/5/2018, 22:01:22','Ching',10001),(192,'asda','Sat, 5/5/2018, 22:01:26','Ching',10000),(193,'asd','Sat, 5/5/2018, 22:01:26','Ching',10000),(194,'','Sat, 5/5/2018, 22:01:26','Ching',10000),(195,'','Sat, 5/5/2018, 22:01:26','Ching',10000),(196,'','Sat, 5/5/2018, 22:01:27','Ching',10000),(197,'123','Sat, 5/5/2018, 22:02:15','natty',10002),(198,'qwewe','Sat, 5/5/2018, 22:02:18','Ching',10000),(199,'123','Sat, 5/5/2018, 22:02:21','natty',10000),(200,'qweqwe','Sat, 5/5/2018, 22:02:22','Ching',10002),(201,'654','Sat, 5/5/2018, 22:02:22','natty',10000),(202,'qwe','Sat, 5/5/2018, 22:02:23','Ching',10002),(203,'qw','Sat, 5/5/2018, 22:02:23','Ching',10002),(204,'e','Sat, 5/5/2018, 22:02:23','Ching',10002),(205,'21','Sat, 5/5/2018, 22:02:23','natty',10000),(206,'21254','Sat, 5/5/2018, 22:02:25','natty',10000),(207,'98789546','Sat, 5/5/2018, 22:02:28','natty',10000),(208,'54654','Sat, 5/5/2018, 22:02:38','natty',10000),(209,'456','Sat, 5/5/2018, 22:02:39','natty',10000),(210,'56','Sat, 5/5/2018, 22:02:39','natty',10000),(211,'156','Sat, 5/5/2018, 22:02:40','natty',10000),(212,'023','Sat, 5/5/2018, 22:02:41','natty',10000),(213,'651456','Sat, 5/5/2018, 22:02:43','natty',10000),(214,'456','Sat, 5/5/2018, 22:02:43','natty',10000),(215,'1561','Sat, 5/5/2018, 22:02:44','natty',10000),(216,'Chindasd','Sat, 5/5/2018, 22:03:18','Ching',10000),(217,'32125','Sat, 5/5/2018, 22:03:19','natty',10000),(218,'1654','Sat, 5/5/2018, 22:03:20','natty',10000),(219,'189','Sat, 5/5/2018, 22:03:21','natty',10000),(220,'15648','Sat, 5/5/2018, 22:03:23','natty',10000),(221,'51648','Sat, 5/5/2018, 22:03:24','natty',10000),(222,'asdasdl;a\'ad\'s;AS','Sat, 5/5/2018, 22:03:24','Ching',10000),(223,'sa','Sat, 5/5/2018, 22:03:24','Ching',10000),(224,'as','Sat, 5/5/2018, 22:03:24','Ching',10000),(225,'asd','Sat, 5/5/2018, 22:03:24','Ching',10000),(226,'asd','Sat, 5/5/2018, 22:03:25','Ching',10000),(227,'','Sat, 5/5/2018, 22:03:25','Ching',10000),(228,'1561861','Sat, 5/5/2018, 22:03:25','natty',10000),(229,'asd','Sat, 5/5/2018, 22:03:25','Ching',10000),(230,'ads','Sat, 5/5/2018, 22:03:25','Ching',10000),(231,'','Sat, 5/5/2018, 22:03:26','Ching',10000),(232,'sa','Sat, 5/5/2018, 22:03:26','Ching',10000),(233,'','Sat, 5/5/2018, 22:03:27','Ching',10000),(234,'efaf5ds1f561s','Sat, 5/5/2018, 22:03:27','natty',10000),(235,'sd1f56sadf','Sat, 5/5/2018, 22:03:27','natty',10000),(236,'f1das86','Sat, 5/5/2018, 22:03:28','natty',10000),(237,'fdsa651','Sat, 5/5/2018, 22:03:29','natty',10000),(238,'qweqwe','Sat, 5/5/2018, 22:03:59','Ching',10001),(239,'qwe','Sat, 5/5/2018, 22:04:00','Ching',10001),(240,'qw','Sat, 5/5/2018, 22:04:00','Ching',10001),(241,'e','Sat, 5/5/2018, 22:04:00','Ching',10001),(242,'564f56g','Sat, 5/5/2018, 22:04:07','natty',10000),(243,'fdsg156fg','Sat, 5/5/2018, 22:04:08','natty',10000),(244,'df15g6gf','Sat, 5/5/2018, 22:04:09','natty',10000),(245,'dasdf','Sat, 5/5/2018, 22:04:09','natty',10000),(246,'sadf','Sat, 5/5/2018, 22:04:10','natty',10000),(247,'sadf','Sat, 5/5/2018, 22:04:10','natty',10000),(248,'sdf','Sat, 5/5/2018, 22:04:10','natty',10000),(249,'asdf','Sat, 5/5/2018, 22:04:11','natty',10000),(250,'asdf','Sat, 5/5/2018, 22:04:11','natty',10000),(251,'sadf','Sat, 5/5/2018, 22:04:11','natty',10000),(252,'','Sat, 5/5/2018, 22:06:28','natty',10000),(253,'','Sat, 5/5/2018, 22:06:29','natty',10000),(254,'eieieieiei','Sat, 5/5/2018, 22:09:48','Sun',10000),(255,'eieiei','Sat, 5/5/2018, 22:09:49','Sun',10000),(256,'aksdfk','Sat, 5/5/2018, 22:09:51','Sun',10000),(257,'asld','Sat, 5/5/2018, 22:12:19','Sun',10000),(258,'asld','Sat, 5/5/2018, 22:12:21','Sun',10000),(259,'adls;','Sat, 5/5/2018, 22:12:22','Sun',10000),(260,'55','Sat, 5/5/2018, 22:12:24','Sun',10000),(261,'akf;','Sat, 5/5/2018, 22:12:51','Sun',10000),(262,'','Sat, 5/5/2018, 22:12:54','Sun',10000),(263,'gtgttgt','Sat, 5/5/2018, 22:15:10','natty',10000),(264,'k','Sat, 5/5/2018, 22:15:11','natty',10000),(265,'k','Sat, 5/5/2018, 22:15:11','natty',10000),(266,'k','Sat, 5/5/2018, 22:15:11','natty',10000),(267,';llrlw','Sat, 5/5/2018, 22:15:13','Sun',10000),(268,';o;p','Sat, 5/5/2018, 22:15:13','natty',10000),(269,'fl;l','Sat, 5/5/2018, 22:15:14','Sun',10000),(270,'lfkfk','Sat, 5/5/2018, 22:15:15','Sun',10000),(271,'lfw\';erl','Sat, 5/5/2018, 22:15:16','Sun',10000),(272,'ol','Sat, 5/5/2018, 22:15:17','natty',10000),(273,';l','Sat, 5/5/2018, 22:15:17','Sun',10000),(274,'adas','Sat, 5/5/2018, 22:15:22','Sun',10000);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(7) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Boss','1234','#a2e312'),('Ching','1234','#7265E6'),('Kie','1234',''),('natty','1234','#058734'),('Sun','1234','#ffbf00'),('Test','1234','#7265E6');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'chat_data'
--

--
-- Dumping routines for database 'chat_data'
--
/*!50003 DROP PROCEDURE IF EXISTS `saveMessage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `saveMessage`(
inMessage varchar(200),
Ttime varchar(30),
user varchar(20),
inGroupname varchar(10)
)
BEGIN
 declare maxID int;
    declare gid varchar(10);
    
    select groupId into gid from Chat_data.group where  groupname = inGroupName;
    
 INSERT INTO message(message.text,message.timeStamp,message.userId,message.groupId) VALUES 
    (inMessage,Ttime ,user,gid);
    
    select max(messageID) into maxID from message where groupId = gid and userId = user; 
    select messageId from message where messageID = maxID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-06  1:09:41
