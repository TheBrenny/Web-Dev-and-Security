CREATE TABLE `users` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` char(64) NOT NULL,
  `active` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `users` (`username`, `password`, `active`) VALUES
    ('Demo', '$2b$12$52ZK8k3mkbBn6r7LnStGbe/2UN5PO5Noth32RrT/Ha3UEQK2ntgP6', 1);
    -- Password is:password