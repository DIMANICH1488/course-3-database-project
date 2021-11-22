DELIMITER  ;;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user`
(
    `user_id` SERIAL PRIMARY KEY,
    `login` VARCHAR(64) NOT NULL UNIQUE ,
    `password` VARCHAR(64)  NOT NULL,
    `password_hash` VARCHAR(512) NOT NULL DEFAULT '',
    `moderator` BOOLEAN NOT NULL DEFAULT FALSE,
    `status` INTEGER NOT NULL DEFAULT -1
);

INSERT INTO `user` (`user_id`, `login`, `moderator`, `password`, `status`)
    VALUES
    (1, 'root', TRUE, '111111', 1),
    (10, 'admin', TRUE, '111111', 1),
    (11, 'admin1', TRUE, '111111', 1),
    (12, 'admin2', TRUE, '111111', 1),
    (13, 'admin3', TRUE, '111111', 1),
    (14, 'admin4', TRUE, '111111', 1),
    (15, 'admin5', TRUE, '111111', 1),
    (16, 'admin6', TRUE, '111111', 1),
    (100, 'user', DEFAULT, '111111', 1),
    (101, 'user1', DEFAULT, '111111', 1),
    (102, 'user2', DEFAULT, '111111', 1),
    (103, 'user3', DEFAULT, '111111', 1),
    (104, 'user4', DEFAULT, '111111', 1),
    (105, 'user5', DEFAULT, '111111', 1),
    (106, 'user6', DEFAULT, '111111', 1),
    (1000, 'guest', DEFAULT, '111111', DEFAULT);

DELIMITER ;


DELIMITER ;;

DROP TABLE IF EXISTS `driver`;
CREATE TABLE IF NOT EXISTS `driver`
(
    `user_id` SERIAL PRIMARY KEY,
    `info`    JSON,
    `status`  INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE `driver`
    ADD CONSTRAINT `driver_user_id_foreign`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON UPDATE RESTRICT
    ON DELETE CASCADE;

INSERT INTO `driver` (`user_id`, `info`, `status`)
    VALUES
    (12, '{ "AUTOBYMBER": "AA 1488 OO" }', 1),
    (101, '{ "AUTOBYMBER": "BB" }', -1),
    (102, '{ "AUTOBYMBER": "AI 3265 TT" }', 0),
    (103, '{ "AUTOBYMBER": "AH 1234 II" }', 0),
    (104, '{ "AUTOBYMBER": "BX 1256 CC" }', 1);

DELIMITER ;


DELIMITER ;;

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order`
(
    `order_id` SERIAL PRIMARY KEY,
    `user_id` BIGINT UNSIGNED,
    `status` INTEGER NOT NULL,
    `volume` JSON,
    `weight` JSON,
    `from` JSON,
    `to` JSON,
    `comment` TEXT,
    `actual_tile` JSON,
    `phone` VARCHAR(32) NOT NULL,
    `price` JSON
);

ALTER TABLE `order`
    ADD CONSTRAINT `order_user_id_foreign`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON UPDATE RESTRICT
    ON DELETE CASCADE;

INSERT INTO `order`(`order_id`, `user_id`, `status`, `volume`, `weight`, `from`, `to`, `comment`, `actual_tile`, `phone`, `price`)
    VALUES
    (1, 100, 0, '{}', '{ "value": 850 }', '{}', '{}', NULL, '{ "value": "2021-12-11" }', '+380441234567', '{ "value": 450 }'),
    (2, 101, 0, '{}', '{ "value": 600 }', '{}', '{}', NULL, '{ "value": "2021-12-14" }', '+380441287767', '{ "value": 800 }'),
    (3, 101, 0, '{}', '{ "value": 1200 }', '{}', '{}', NULL, '{ "value": "2021-12-12" }', '+380484994567', '{ "value": 750 }'),
    (4, 102, 0, '{}', '{ "value": 300 }', '{}', '{}', NULL, '{ "value": "2021-11-21" }', '+380441956767', '{ "value": 600 }'),
    (5, 102, 0, '{}', '{ "value": 1550 }', '{}', '{}', NULL, '{ "value": "2021-12-01" }', '+380441249297', '{ "value": 1000 }'),
    (6, 105, 0, '{}', '{ "value": 1700 }', '{}', '{}', NULL, '{ "value": "2021-12-09" }', '+380443458577', '{ "value": 1200 }'),
    (7, DEFAULT, 0, '{}', '{ "value": 9999 }', '{}', '{}', NULL, '{ "value": "2021-12-09" }', '+380443458577', '{ "value": 1200 }');

DELIMITER ;


DELIMITER ;;

DROP TABLE IF EXISTS `drive`;
CREATE TABLE IF NOT EXISTS `drive`
(
    `drive_id` SERIAL PRIMARY KEY,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `driver_id` BIGINT UNSIGNED NOT NULL,
    `status` INTEGER NOT NULL,
    `volume` JSON,
    `weight` JSON,
    `from` JSON,
    `to` JSON,
    `comment` TEXT,
    `actual_tile` JSON,
    `phone` VARCHAR(32) NOT NULL,
    `price` JSON
);

ALTER TABLE `drive`
    ADD CONSTRAINT `drive_order_id_foreign`
    FOREIGN KEY (`order_id`)
    REFERENCES `order` (`order_id`)
    ON UPDATE RESTRICT
    ON DELETE CASCADE;

ALTER TABLE `drive`
    ADD CONSTRAINT `drive_driver_id_foreign`
    FOREIGN KEY (`driver_id`)
    REFERENCES `driver` (`user_id`)
    ON UPDATE RESTRICT
    ON DELETE CASCADE;

DELIMITER ;


DELIMITER ;;

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback`
(
    `feedback_id` SERIAL PRIMARY KEY,
    `drive_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `comment` TEXT,
    `mark` INTEGER NOT NULL
);

ALTER TABLE `feedback`
    ADD CONSTRAINT `feedback_drive_id_foreign`
    FOREIGN KEY (`drive_id`)
    REFERENCES `drive` (`drive_id`)
    ON UPDATE RESTRICT
    ON DELETE CASCADE;

ALTER TABLE `feedback`
    ADD CONSTRAINT `feedback_user_id_foreign`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON UPDATE RESTRICT
    ON DELETE CASCADE;

DELIMITER ;


DELIMITER ;;

# 1)
SELECT *
FROM `user`;

# 2)
SELECT *
FROM `user`
WHERE `user`.`user_id` >= 103;

# 3)
SELECT *
FROM `user`
WHERE `user`.`user_id` >= 103 AND `user`.`user_id` < 1000;

# 4)
SELECT
    `user`.`user_id`,
    `user`.`login`,
    `user`.`moderator`
FROM `user`;

# 5)
SELECT
    `user`.`user_id` AS 'id',
    `user`.`login` AS 'user_login',
    `user`.`moderator` AS 'user_is_moderator'
FROM `user`;

# 6)
SELECT
    CONCAT(`user`.`login`, ':', `user`.`password`, '@exapmle.com') AS 'user_uri'
FROM `user`;

# 7)
SELECT
    `user`.`user_id` AS 'id',
    `user`.`login` AS 'user_login',
    CASE
        WHEN `user`.`moderator` = 1 THEN 'Moderator'
        ELSE 'User'
    END AS 'user_is_moderator'
FROM `user`;

# 8)
SELECT
    `user`.`user_id` AS 'id',
    `user`.`login` AS 'user_login',
    CASE
        WHEN `user`.`moderator` = 1 THEN 'Moderator'
        ELSE 'User'
    END AS 'user_is_moderator'
FROM `user`
LIMIT 3 OFFSET 2;

# 9)
SELECT
    `user`.`user_id` AS 'id',
    `user`.`login` AS 'user_login',
    CASE
        WHEN `user`.`moderator` = 1 THEN 'Moderator'
        ELSE 'User'
    END AS 'user_is_moderator'
FROM `user`
ORDER BY RAND() ASC
LIMIT 3;

# 10)
SELECT u.*
FROM `user` AS u
LEFT JOIN `driver` AS d
ON u.`user_id` = d.`user_id`
WHERE d.`user_id` IS NULL;

# 11)
SELECT *
FROM `user` AS u
WHERE u.`login` LIKE 'admin%';

# 12)
SELECT *
FROM `user` AS u
ORDER BY u.`login` DESC;

# 13)
SELECT *
FROM `user` AS u
ORDER BY u.status ASC, u.`login` DESC;

# 14)
SELECT *
FROM `user` AS u
ORDER BY SUBSTRING(u.`login`, 1, 1) ASC, u.`login` DESC;

# 15)
SELECT u.*, d.`user_id` AS driver_id
FROM `user` AS u
LEFT JOIN `driver` AS d
ON u.`user_id` = d.`user_id`
ORDER BY IFNULL(driver_id, 99) ASC;

# 16)
SELECT u.*
FROM `user` AS u
ORDER BY
    CASE
        WHEN u.`user_id` % 2 = 1 THEN 1
        ELSE 0
    END DESC;

# 17)
SELECT u.*
FROM `user` AS u
WHERE u.`moderator` = 1 AND u.`status` = 1
UNION
SELECT u.*
FROM `user` AS u
WHERE u.`moderator` = 0 AND u.`status` = -1;

# 18)
SELECT *
FROM `user` AS u
INNER JOIN `driver` AS d
ON u.`user_id` = d.`user_id`;

# 19)
SELECT u.*
FROM `user` AS u
WHERE u.`user_id` IN (SELECT d.`user_id` FROM `driver` AS d);

# 20)
SELECT *
FROM `user` AS u
LEFT JOIN `driver` AS d
ON u.`user_id` = d.`user_id`;

# 21)
SELECT u.*
FROM `user` AS u
WHERE u.`user_id` NOT IN (SELECT d.`user_id` FROM `driver` AS d);

# 22)
SELECT *
FROM `user` AS u
INNER JOIN `driver` AS d
ON u.`user_id` = d.`user_id`
INNER JOIN `order` o on u.`user_id` = o.`user_id`;

# 23)
SELECT u.`user_id`, SUM(IF(o.`user_id` IS NULL, 0, 1)) AS `orders_amount`
FROM `user` AS u
LEFT JOIN `order` AS o
ON o.`user_id` = u.`user_id`
GROUP BY u.`user_id`;

# 24)
SELECT u.`user_id`, SUM(IF(o.`user_id` IS NULL, 0, 1)) AS `orders_amount`
FROM `user` AS u
LEFT OUTER JOIN `order` AS o
ON o.`user_id` = u.`user_id`
GROUP BY u.`user_id`;

# 25)
SELECT u.`user_id`, o.`order_id`, o.`user_id`
FROM `user` AS u
LEFT OUTER JOIN `order` AS o
ON o.`user_id` = u.`user_id`
UNION
SELECT u.`user_id`, o.`order_id`, o.`user_id`
FROM `user` AS u
RIGHT OUTER JOIN `order` AS o
ON o.`user_id` = u.`user_id`;

# 26)
SELECT COALESCE(u.`user_id`, 0), o.`order_id`, o.`user_id`
FROM `user` AS u
RIGHT OUTER JOIN `order` AS o
ON o.`user_id` = u.`user_id`;

# 27)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 1
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 10
), `data` (`name`) AS (
    SELECT 'DIMA'
)
SELECT SUBSTRING(d.`name`, it.`value`, 1) AS `letter`
FROM
    `data` AS d,
    `seq` AS it
WHERE LENGTH(SUBSTRING(d.`name`, it.`value`, 1)) > 0;

# 28)
SELECT '''DIMA'' ''BOZHKO''';

# 29)
SELECT REPLACE('HELLO $DIMA$', '$', '');

# 30)
SELECT
    SUBSTRING_INDEX(`data`.`value`, ',', 1) AS `name`,
    SUBSTR(`data`.`value`, POSITION(',' IN `data`.`value`) + 1) AS `value_as_string`,
    CAST(SUBSTR(`data`.`value`, POSITION(',' IN `data`.`value`) + 1) AS DECIMAL) AS `value_as_number`
FROM (SELECT 'DIMA,1001' AS `value`) AS `data`;

# 31)
SELECT UPPER(CONCAT(SUBSTRING(`data`.`first_name`, 1, 1), '.', SUBSTRING(`data`.`last_name`, 1, 1), '.')) AS `full_name`
FROM (SELECT 'dima' AS `first_name`, 'bozhko' AS `last_name`) AS `data`;

# 32)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 1
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 10
), `data` (`value`) AS (
    SELECT 1
    UNION
    SELECT 18
    UNION
    SELECT 9
)
SELECT d.`value`
FROM `data` AS d
WHERE d.`value` IN (SELECT * FROM `seq`);

# 33)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 1
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 10
)
SELECT MIN(s.`value`) AS `min`, MAX(s.`value`) AS `max`
FROM `seq` AS s;

# 34)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 1
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 10
)
SELECT COUNT(1) AS `count`
FROM `seq` AS s;

# 35)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 1
    UNION ALL
    SELECT NULL
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 10
)
SELECT COUNT(1) AS `count`
FROM `seq` AS s
WHERE s.`value` IS NOT NULL;

# 36)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 1
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 10
)
SELECT SUM(s.`value`) AS `count`
FROM `seq` AS s;

# 37)
WITH `data` (d1, d2) AS (
    SELECT NOW(), DATE_SUB(NOW(), INTERVAL 4 MONTH)
)
SELECT d.*, DATEDIFF(d.d1, d.d2) AS `diff`
FROM `data` AS d;

# 38)
WITH RECURSIVE `seq` (`value`) AS (
    SELECT 0
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 366
), `days_seq` (value, day) AS (
    SELECT s.value, DATE_ADD(DATE('2021-01-01'), INTERVAL s.`value` DAY) AS day
    FROM `seq` AS s
), `yaer_week_days_count` (day_of_week, count) AS (
    SELECT DAYOFWEEK(d.`day`), COUNT(d.`day`)
    FROM `days_seq` AS d
    WHERE YEAR(d.`day`) = YEAR(DATE('2021-01-01'))
    GROUP BY DAYOFWEEK(d.`day`)
)
SELECT
    CASE
        WHEN d.`day_of_week` = 2 THEN 'Пн'
        WHEN d.`day_of_week` = 3 THEN 'Вт'
        WHEN d.`day_of_week` = 4 THEN 'Ср'
        WHEN d.`day_of_week` = 5 THEN 'Чт'
        WHEN d.`day_of_week` = 6 THEN 'Пт'
        WHEN d.`day_of_week` = 7 THEN 'Сб'
        WHEN d.`day_of_week` = 1 THEN 'Вс'
    END AS `day_of_week`,
    d.`count`
FROM `yaer_week_days_count` AS d
ORDER BY d.`count` DESC;

# 39)
WITH `mock` (day) AS (
    SELECT DATE('2021-01-01')
)
SELECT
    CASE
        WHEN MONTH(DATE_ADD(DATE(CONCAT(YEAR(d.`day`), '-02-28')), INTERVAL 1 DAY)) = 2 THEN TRUE
        ELSE FALSE
    END AS 'is_leap_year'
FROM `mock` AS d;

# 40)
WITH `mock` (day) AS (
    SELECT DATE('2021-01-11')
)
SELECT
    DATE(CONCAT(YEAR(d.`day`), '-', MONTH(d.`day`), '-01')) AS `first_day_of_month`,
    LAST_DAY(d.`day`) AS `last_day_of_month`
FROM `mock` AS d;

# 41)
# SELECT max(case day_of_week when 2 then day_of_month end) AS Mo,
#        max(case day_of_week when 3 then day_of_month end) AS Tu,
#        max(case day_of_week when 4 then day_of_month end) AS We,
#        max(case day_of_week when 5 then day_of_month end) AS Th,
#        max(case day_of_week when 6 then day_of_month end) AS Fr,
#        max(case day_of_week when 7 then day_of_month end) AS Sa,
#        max(case day_of_week when 1 then day_of_month end) AS Su
# FROM (
#      SELECT *
#      FROM (
#           SELECT CAST(date_trunc('month', current_date) AS date) + x.id,
#               to_char(
#                         CAST(date_trunc('month', current_date) AS date) + x.id, 'iw') AS week_number,
#               to_char(
#                         CAST(date_trunc('month', current_date) AS date) + x.id, 'dd') AS day_of_month,
#               CAST(
#                         to_char(
#                                 CAST(date_trunc('month', current_date) AS date) + x.id, 'd') AS INTEGER) as day_of_week,
#               to_char(
#                         CAST(date_trunc('month', current_date) AS date) + x.id, 'mm') AS current_month,
#               to_char(current_date, 'mm') as month
#                             FROM generate_series(0, 31) AS x(id)
#                         ) x
#            WHERE month = current_month
#       ) y
# GROUP BY week_number
# ORDER BY week_number;

WITH RECURSIVE `seq` (`value`) AS (
    SELECT 0
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 366
), `mock` (day) AS (
    SELECT DATE('2021-05-04')
), `days_of_year` (day) AS (
    SELECT DATE_ADD(CONCAT(YEAR(m.day), '-01-01'), INTERVAL s.`value` DAY)
    FROM `seq` AS s, `mock` AS m
    WHERE YEAR(m.day) = YEAR(DATE_ADD(CONCAT(YEAR(m.day), '-01-01'), INTERVAL s.`value` DAY))
), `days_of_month` (day) AS (
    SELECT d.day
    FROM `days_of_year` AS d, `mock` AS m
    WHERE MONTH(m.day) = MONTH(d.day)
), `week_number` (value) AS (
    SELECT WEEKOFYEAR(d.`day`)
    FROM `days_of_month` d
    GROUP BY WEEKOFYEAR(d.`day`)
), `calendar` (week_of_year, mo, tu, we, th, fr, sa, su) AS (
    SELECT w.value, d2.day, d3.day, d4.day, d5.day, d6.day, d7.day, d1.day
    FROM `week_number` AS w
    LEFT JOIN `days_of_month` AS d2 ON w.value = WEEKOFYEAR(d2.day) AND DAYOFWEEK(d2.day) = 2
    LEFT JOIN `days_of_month` AS d3 ON w.value = WEEKOFYEAR(d3.day) AND DAYOFWEEK(d3.day) = 3
    LEFT JOIN `days_of_month` AS d4 ON w.value = WEEKOFYEAR(d4.day) AND DAYOFWEEK(d4.day) = 4
    LEFT JOIN `days_of_month` AS d5 ON w.value = WEEKOFYEAR(d5.day) AND DAYOFWEEK(d5.day) = 5
    LEFT JOIN `days_of_month` AS d6 ON w.value = WEEKOFYEAR(d6.day) AND DAYOFWEEK(d6.day) = 6
    LEFT JOIN `days_of_month` AS d7 ON w.value = WEEKOFYEAR(d7.day) AND DAYOFWEEK(d7.day) = 7
    LEFT JOIN `days_of_month` AS d1 ON w.value = WEEKOFYEAR(d1.day) AND DAYOFWEEK(d1.day) = 1
)
SELECT c.*
FROM `calendar` AS c;

# WITH RECURSIVE `seq` AS (
#     SELECT 0 AS `value`
#     UNION ALL
#     SELECT `value` + 7
#     FROM `seq`
#     WHERE `value` + 7 <= 7*6
# )
# WITH `week` AS (
#     SELECT 1 AS `Su.`, 2 AS `Mo.`, 3 AS `Tu.`, 4 AS `We.`, 5 AS `Th.`, 6 AS `Fr.`, 7 AS `Sa.`
# )
# SELECT
#     *
# FROM `week` AS w,
#      (
#          SELECT
#             CONCAT(d.year, '-', d.month, '-', )
#          FROM `seq` AS s, (SELECT 2021 AS `year`, 2 AS `month`) AS d
# ) c
# ;

# 42)
WITH RECURSIVE `seq` (value) AS (
    SELECT 0
    UNION ALL
    SELECT `value` + 1 FROM `seq`
    LIMIT 31
), `mock` (day) AS (
    SELECT DATE('2021-02-14')
), `31days` (day) AS (
    SELECT DATE_ADD('2021-02-01', INTERVAL d.`value` DAY) as `day`
    FROM `seq` as d
)
SELECT * FROM `mock`
UNION
SELECT * FROM `31days` AS d WHERE MONTH(d.`day`) = 2;

# 43)
WITH `mock` (id, d1, d2) AS (
    SELECT 1, DATE('2021-02-02'), DATE('2021-02-04')
    UNION
    SELECT 2, DATE('2021-02-07'), DATE('2021-02-09')
    UNION
    SELECT 3, DATE('2021-02-08'), DATE('2021-02-10')
)
SELECT *
FROM `mock` AS m
WHERE EXISTS(
    SELECT 1
    FROM `mock` AS mm
    WHERE m.d1 BETWEEN mm.d1 AND mm.d2 AND m.id <> mm.id
)
OR EXISTS(
    SELECT 1
    FROM `mock` AS mm
    WHERE m.d2 BETWEEN mm.d1 AND mm.d2 AND m.id <> mm.id
)
OR EXISTS(
    SELECT 1
    FROM `mock` AS mm
    WHERE mm.d1 BETWEEN m.d1 AND m.d2 AND m.id <> mm.id
)
OR EXISTS(
    SELECT 1
    FROM `mock` AS mm
    WHERE mm.d2 BETWEEN m.d1 AND m.d2 AND m.id <> mm.id
);

DELIMITER ;