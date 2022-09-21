CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `folder_id` int NOT NULL,
  PRIMARY KEY (`id`)
)
