CREATE TABLE `permissions`
(
    `name`     VARCHAR(255) NOT NULL,
    `upload`   TINYINT      NOT NULL,
    `download` TINYINT      NOT NULL,
    `delete`   TINYINT      NOT NULL,
    `rename`   TINYINT      NOT NULL,
    `move`     TINYINT      NOT NULL,
    PRIMARY KEY (`name`)
);
