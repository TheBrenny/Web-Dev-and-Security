INSERT INTO `users` (`id`, `username`, `password`, `plainPassword`, `active`, `question1`, `answer1`, `question2`, `answer2`) VALUES
    (0, 'Guest', '000000000000000000000000000000000000000000000000000000000000', '', 0, 'null', '000000000000000000000000000000000000000000000000000000000000', 'null', '000000000000000000000000000000000000000000000000000000000000');

INSERT INTO `users` (`username`, `password`, `plainPassword`, `question1`, `answer1`, `question2`, `answer2`) VALUES
    ('Demo', '$2b$12$52ZK8k3mkbBn6r7LnStGbe/2UN5PO5Noth32RrT/Ha3UEQK2ntgP6', 'password', 'What is your pet''s name?', '$2b$04$UEHc.GtAPAbTCmo3eQFpxuuxezbnMtGMaSQnpMZ7aPy4rzx1bFmV.', 'What year was your best friend born in?', '$2b$04$rgSpd0DNuejZlGmjGAcux.3ohHjzrKYvdsSRRXzoqxosjnnlqvghi'), -- timmy // 1998
    ('Tom', '$2b$12$5tbqyh21TIG3f5WzjavJ8OrmIU2jM75jM8KNz1Tkh08MlzTYdI//y', 'tomsaccount', 'What is your pet''s name?', '$2b$04$UEHc.GtAPAbTCmo3eQFpxuuxezbnMtGMaSQnpMZ7aPy4rzx1bFmV.', 'What year was your best friend born in?', '$2b$04$ZwJ6Buh51ekjqlB7Dc7r1u2smcUVNdwX2cKBC8L6hD1q0yVC4V5be'), -- timmy // 1999
    ('Dan', '$2b$12$w8AGe8UYQNRgLz86Abrg/OQ4ZPnfXA/ivnX2hMUvmA9kawAW.LDZW', 'dansaccount', 'What is your pet''s name?', '$2b$04$UEHc.GtAPAbTCmo3eQFpxuuxezbnMtGMaSQnpMZ7aPy4rzx1bFmV.', 'What year was your best friend born in?', '$2b$04$.nLK7LfPVmJNb2Q6JYxAMey5TXlvFR1UByivAAyDG6aFQ9k16SWki'), -- timmy // 2000
    ('Jeff', '$2b$12$W9oUPYY/C.W8IU4Y2Lvl8e3zcz/S4vOenFvWsiVcaQmXDYYmPuM/a', 'jeffsaccount', 'What is your pet''s name?', '$2b$04$UEHc.GtAPAbTCmo3eQFpxuuxezbnMtGMaSQnpMZ7aPy4rzx1bFmV.', 'What year was your best friend born in?', '$2b$04$vELKk6b2w/cB6yz4B04im.t5hc8JgXepAeE0rQeF.kP98Qji8V8Z.'); -- timmy // 2001

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