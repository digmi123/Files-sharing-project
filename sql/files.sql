CREATE TABLE `secure-collaboration`.`files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `physical_path` VARCHAR(150) NOT NULL,
  `folder` INT NOT NULL,
  `type` VARCHAR(200) NULL,
  `size` BIGINT(3) NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `physical_path_UNIQUE` (`physical_path` ASC) VISIBLE);
