CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40) NOT NULL,
  `password` CHAR(64) NOT NULL,
  `active` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) DEFAULT '',
  `image` MEDIUMBLOB DEFAULT NULL,
  `owner` INTEGER NOT NULL,
  `cost` DECIMAL(8,2) NOT NULL,
  `quantity` INTEGER DEFAULT 1,
  `post_date` DATETIME NOT NULL,
  `purchased_date` DATETIME DEFAULT NULL,
  `purchased_by` INTEGER DEFAULT -1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
);

CREATE TABLE `comments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user` INTEGER NOT NULL,
  `product` INTEGER NOT NULL,
  `comment` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product`) REFERENCES `products` (`id`)
);

INSERT INTO `users` (`username`, `password`, `active`) VALUES
    ('Demo', '$2b$12$52ZK8k3mkbBn6r7LnStGbe/2UN5PO5Noth32RrT/Ha3UEQK2ntgP6', 1);
    -- Password is:password