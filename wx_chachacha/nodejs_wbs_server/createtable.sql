use chatdatabase;
CREATE TABLE IF NOT EXISTS `login_tb`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `psd` VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET NAMES utf8;

-- use chatdatabase;
-- CREATE TABLE IF NOT EXISTS `chat_tb`(
--    `id` INT UNSIGNED AUTO_INCREMENT,
--    `name` VARCHAR(100) NOT NULL,
--    `chatchannel` INT,
--    `text` VARCHAR(500),
--    PRIMARY KEY ( `id` )
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- SET NAMES utf8;
