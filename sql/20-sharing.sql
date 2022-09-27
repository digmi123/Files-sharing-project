CREATE TABLE `sharing`
(
    `collab_id` INT NOT NULL,
    `file_id`   INT NOT NULL,
    PRIMARY KEY (`collab_id`, `file_id`)
);
