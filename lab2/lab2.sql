DELIMITER ;;

DROP TABLE IF EXISTS `user`;;
CREATE TABLE IF NOT EXISTS `user` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(64) COLLATE utf8_unicode_ci NOT NULL CHECK ( LENGTH(`login`) >= 2 ),
    `password` VARCHAR(256) COLLATE utf8_unicode_ci NOT NULL CHECK ( LENGTH(`password`) >= 2 ),
    `moderator` BOOLEAN NOT NULL DEFAULT FALSE,
    `status` INTEGER NOT NULL DEFAULT -1 CHECK ( `status` IN (-1, 1) ),
    PRIMARY KEY (`user_id`),
    UNIQUE KEY (`login`)
)
ENGINE=InnoDB
AUTO_INCREMENT=1
DEFAULT CHARSET=utf8
COLLATE=utf8_unicode_ci
;;

DROP TABLE IF EXISTS `log_user`;;
CREATE TABLE IF NOT EXISTS `log_user` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT,
    `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `type` CHAR(1) COLLATE utf8_unicode_ci NOT NULL CHECK ( `type` IN ( 'I', 'U', 'D' ) ),
    `user_id` BIGINT,
    `login` VARCHAR(64) COLLATE utf8_unicode_ci,
    `password` VARCHAR(256) COLLATE utf8_unicode_ci,
    `moderator` BOOLEAN,
    `status` INTEGER,
    PRIMARY KEY (`log_id`)
)
ENGINE=InnoDB
AUTO_INCREMENT=1
DEFAULT CHARSET=utf8
COLLATE=utf8_unicode_ci
;;


DROP TRIGGER IF EXISTS `user_BEFORE_INSERT`;
CREATE TRIGGER `user_BEFORE_INSERT`
BEFORE INSERT
ON `user`
FOR EACH ROW
BEGIN
    IF ( NEW.`status` <> -1 ) THEN
        SIGNAL SQLSTATE '45000' SET message_text='NEW USER MUST BE DISABLED';
    ELSEIF ( NEW.`moderator` IS NOT FALSE ) THEN
        SIGNAL SQLSTATE '45000' SET message_text='NEW USER MUST BE SIMPLE';
    END IF;
END
;;

DROP TRIGGER IF EXISTS `user_BEFORE_UPDATE`;
CREATE TRIGGER `user_BEFORE_UPDATE`
BEFORE UPDATE
ON `user`
FOR EACH ROW
BEGIN
    IF ( NEW.`moderator` IS TRUE AND NEW.`status` <> 1 ) THEN
        SIGNAL SQLSTATE '45000' SET message_text='NEW MODERATOR MUST BE ENABLED';
    END IF;
END
;;

DROP PROCEDURE IF EXISTS `do_log_user`;
CREATE PROCEDURE `do_log_user` (
    IN log_type CHAR(1),
    IN user_id BIGINT,
    IN login VARCHAR(64),
    IN password VARCHAR(256),
    IN moderator BOOLEAN,
    IN status INTEGER
)
SQL SECURITY INVOKER
BEGIN
    INSERT INTO `log_user` (`type`, `user_id`, `login`, `password`, `moderator`, `status`)
    VALUE (log_type, user_id, login, password, moderator, status);
END
;;

DROP TRIGGER IF EXISTS `user_AFTER_INSERT`;
CREATE TRIGGER `user_AFTER_INSERT`
AFTER INSERT
ON `user`
FOR EACH ROW
BEGIN
    CALL `do_log_user` ('I', NEW.`user_id`, NEW.`login`, NEW.`password`, NEW.`moderator`, NEW.`status`);
END
;;

DROP TRIGGER IF EXISTS `user_AFTER_UPDATE`;
CREATE TRIGGER `user_AFTER_UPDATE`
AFTER UPDATE
ON `user`
FOR EACH ROW
BEGIN
    CALL `do_log_user` ('U', NEW.`user_id`, NEW.`login`, NEW.`password`, NEW.`moderator`, NEW.`status`);
END
;;

DROP TRIGGER IF EXISTS `user_AFTER_DELETE`;
CREATE TRIGGER `user_AFTER_DELETE`
AFTER DELETE
ON `user`
FOR EACH ROW
BEGIN
    CALL `do_log_user` ('D', OLD.`user_id`, OLD.`login`, OLD.`password`, OLD.`moderator`, OLD.`status`);
END
;;

INSERT INTO `user`
    (`login`, `password`)
VALUES
    ('root', '123'),
    ('user1', '111'),
    ('user2', '111'),
    ('user3', '111'),
    ('user4', '111'),
    ('user5', '111')
;;

UPDATE `user`
SET `status` = 1
WHERE `login` LIKE 'root'
;;

UPDATE `user`
SET `moderator` = TRUE
WHERE `login` LIKE 'root'
;;

UPDATE `user`
SET `moderator` = TRUE, `status` = 1
WHERE `login` LIKE 'user4'
;;

DELETE FROM `user`
WHERE `login` LIKE 'user4'
;;

SELECT
    lu.`user_id`,
    SUM( IF( lu.`log_id` IS NOT NULL, 1, 0) ) AS logsTotal,
    SUM( IF( lu.`type` = 'I', 1, 0) ) AS logsI,
    SUM( IF( lu.`type` = 'U', 1, 0) ) AS logsU,
    SUM( IF( lu.`type` = 'D', 1, 0) ) AS logsD,
    IF( u.`user_id`, 'EXISTS', 'NOT EXISTS' ) AS userExists
FROM `log_user` lu
LEFT JOIN `user` u
ON u.`user_id` = lu.`user_id`
GROUP BY lu.`user_id`
ORDER BY lu.`user_id` ASC
;;

DELIMITER ;