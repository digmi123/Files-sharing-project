CREATE TABLE `users`
(
    `id`             INT          NOT NULL AUTO_INCREMENT,
    `email`          VARCHAR(45)  NOT NULL,
    `hashed_password` VARCHAR(140) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);
