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
