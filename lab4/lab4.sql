
# 1)
SHOW GRANTS;

# 2)
CREATE USER 'abc'@'localhost' IDENTIFIED BY 'abc';
GRANT ALL PRIVILEGES ON * TO 'abc'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'abc'@'localhost';

# 3)
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'abc'@'localhost';

# 4)
SHOW GRANTS FOR 'abc'@'localhost';

# 5)
GRANT SELECT (user_id, login, moderator) ON `mydb`.`user` TO 'abc'@'localhost';

# 6)
DELIMITER ;;
DROP PROCEDURE IF EXISTS `insert_user`;;
CREATE PROCEDURE `insert_user` (
    IN login VARCHAR(64),
    IN password VARCHAR(256),
    IN moderator BOOLEAN,
    IN status INTEGER
)
SQL SECURITY DEFINER
BEGIN
    INSERT INTO `user` (`login`, `password`, `moderator`, `status`)
    VALUE (login, password, moderator, status);
END;;
DELIMITER ;
GRANT EXECUTE ON PROCEDURE `insert_user` TO 'abc'@'localhost';

# 7)
SHOW GRANTS FOR 'abc'@'localhost';
SELECT * FROM mydb.user;
CALL insert_user('zyx', 'zyx', false, 0);

# 8)
DROP USER 'abc'@'localhost';

# 9 + 10)
DROP PROCEDURE IF EXISTS `insert_user_tr`;
DELIMITER ;;
CREATE PROCEDURE `insert_user_tr` (
    IN login VARCHAR(64),
    IN password VARCHAR(256),
    IN moderator BOOLEAN,
    IN status INTEGER
)
SQL SECURITY DEFINER
BEGIN
    DECLARE `c` INT DEFAULT 0;
    START TRANSACTION;
    CALL `insert_user`(login, password, moderator, status);
    SELECT COUNT(1) INTO `c` FROM `user`;
    IF `c` % 2 = 0 THEN
        ROLLBACK ;
    ELSE
        COMMIT;
    END IF;
END
;;
DELIMITER ;
CALL `insert_user_tr`('user123', 'user123', true, 1);
CALL `insert_user_tr`('user1234', 'user1234', true, 1);