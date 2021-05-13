INSERT INTO `users` (`id`, `username`, `password`, `plainPassword`, `active`) VALUES
    (0, 'Guest', '000000000000000000000000000000000000000000000000000000000000', '', 0);

INSERT INTO `users` (`username`, `password`, `plainPassword`) VALUES
    ('Demo', '$2b$12$52ZK8k3mkbBn6r7LnStGbe/2UN5PO5Noth32RrT/Ha3UEQK2ntgP6', 'password'),
    ('Tom', '$2b$12$5tbqyh21TIG3f5WzjavJ8OrmIU2jM75jM8KNz1Tkh08MlzTYdI//y', 'tomsaccount'),
    ('Dan', '$2b$12$w8AGe8UYQNRgLz86Abrg/OQ4ZPnfXA/ivnX2hMUvmA9kawAW.LDZW', 'dansaccount'),
    ('Jeff', '$2b$12$W9oUPYY/C.W8IU4Y2Lvl8e3zcz/S4vOenFvWsiVcaQmXDYYmPuM/a', 'jeffsaccount');

INSERT INTO `products` (`name`, `description`, `owner`, `cost`, `quantity`, `post_date`) VALUES
    ('Motorbike', 'Kawasaki 3000! Wings included! 🛩', 1, 10000.00, 1, DATE('2020-06-17')),
    ('Car', 'Hyundi 2020xR! Zoom zoom! 🚕', 2, 17000.00, 1, DATE('2019-02-23')),
    ('Lawn Mower', 'Red vroom with 4 wheels!', 2, 150.00, 1, DATE('2020-09-02')),
    ('Rice Cooker', 'Steamy kernals get softer.', 3, 30.25, 1, DATE('2020-12-26')),
    ('House', 'Buy it off me. I''m moving.', 1, 3000.00, 1, DATE('2020-11-10')),
    ('Playing Cards', 'Jokers included! 🃏🤡', 4, 9.99, 1, DATE('2021-01-01')),
    ('Dice', 'Introduce some more chance in your life! 🎲', 4, 15.00, 1, DATE('2021-01-01'));

UPDATE `products` SET
    `purchased_date` = DATE('2020-10-12'),
    `purchased_by` = 4
WHERE `id` = 3;
UPDATE `products` SET
    `purchased_date` = DATE('2020-03-21'),
    `purchased_by` = 4
WHERE `id` = 2;
UPDATE `products` SET
    `purchased_date` = DATE('2020-06-15'),
    `purchased_by` = 2
WHERE `id` = 1;