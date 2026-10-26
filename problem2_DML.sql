USE library_db;

INSERT INTO AUTHOR (author_id, name, country) VALUES 
(1, 'J.K. Rowling', 'UK'),
(2, 'George R.R. Martin', 'USA'),
(3, 'Agatha Christie', 'UK');

INSERT INTO BOOK (book_id, title, price, author_id) VALUES 
(1, 'Harry Potter and the Sorcerer''s Stone', 15.99, 1),
(2, 'Harry Potter and the Chamber of Secrets', 18.50, 1),
(3, 'A Game of Thrones', 22.00, 2),
(4, 'A Clash of Kings', 24.99, 2),
(5, 'Murder on the Orient Express', 12.00, 3),
(6, 'And Then There Were None', 14.50, 3);