CREATE TABLE `secure-collaboration`.`access` (
  `user_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `roll` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`, `project_id`));
