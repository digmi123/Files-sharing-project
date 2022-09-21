CREATE TABLE `secure-collaboration`.`owning` (
  `user_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `file_id`));
