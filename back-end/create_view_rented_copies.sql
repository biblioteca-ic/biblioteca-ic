DROP TABLE IF EXISTS view_rented_copies;
DROP VIEW IF EXISTS view_rented_copies;
CREATE OR REPLACE VIEW view_rented_copies AS 
SELECT
	bc.code as copy_code,
    b.title,
    b.authors,
    bc.status,
    u.email,
    bc.lease_date,
    bc.devolution_date,
    u.id AS user_id,
    bc.id AS copy_id,
    bc.book_id
FROM book_copies bc 
INNER JOIN users u ON bc.located_by=u.id 
LEFT JOIN books b ON bc.book_id=b.id WHERE bc.status='RENTED';

SELECT * FROM view_rented_copies;