CREATE OR REPLACE VIEW view_rented_copies AS
	SELECT
    u.id AS user_id,
    u.email,
    bc.id AS copy_id,
    bc.book_id
    FROM book_copies bc INNER JOIN users u ON bc.located_by=u.id WHERE bc.status='RENTED';
    
SELECT * FROM view_rented_copies;
SELECT * FROM books;