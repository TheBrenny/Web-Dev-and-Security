CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `plainPassword` VARCHAR(60) NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) DEFAULT '',
  `image` VARCHAR(500) DEFAULT 'defaultImage.svg', -- This is appended to the image path
  `owner` INTEGER NOT NULL,
  `cost` DECIMAL(8,2) NOT NULL,
  `quantity` INTEGER DEFAULT 1,
  `post_date` DATETIME NOT NULL,
  `purchased_date` DATETIME,
  `purchased_by` INTEGER,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
);

CREATE TABLE `comments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user` INTEGER NOT NULL,
  `product` INTEGER NOT NULL,
  `comment` VARCHAR(500) NOT NULL,
  `comment_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product`) REFERENCES `products` (`id`)
);

-- %%%% Comes from the 'express-mysql-session' package %%%%
-- $$$$                                                $$$$
-- CREATE TABLE IF NOT EXISTS `sessions` (
--   `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
--   `expires` int(11) unsigned NOT NULL,
--   `data` mediumtext COLLATE utf8mb4_bin,
--   PRIMARY KEY (`session_id`)
-- ) ENGINE=InnoDB

-- %%%% Comes from /app/routes/rememberme.js %%%%
-- $$$$                                      $$$$
-- CREATE TABLE IF NOT EXISTS `rememberTokens` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `selector` CHAR(40) NOT NULL,
--   `validator` CHAR(60) NOT NULL,
--   `user` INTEGER NOT NULL,
--   PRIMARY KEY (`id`),
--   FOREIGN KEY (`user`) REFERENCES `users` (`id`)
-- );