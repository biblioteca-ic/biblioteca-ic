-- This is an empty migration.

-- This is an empty migration.

DROP TABLE IF EXISTS view_books;
CREATE OR REPLACE VIEW view_books AS SELECT
	b.id,
	b.code,
	b.title,
    b.authors,
    CAST(EXTRACT(YEAR FROM b.published_in) AS VARCHAR) AS published_in,
    b.status,
    b.publishing_house,
    b.categories,
    b.created_by,
    b.created_at,
    count(c.id) as copies,
    count(case when c.status = 'RENTED'::"public"."CopyStatus" then 1 else null end) as borrowed_copies,
    count(case when c.status = 'MISPLACED'::"public"."CopyStatus" then 1 else null end) as lost_copies,
    count(case when c.status = 'AVAILABLE'::"public"."CopyStatus" then 1 else null end) as available_copies
FROM books b LEFT JOIN book_copies c ON b.id=c.book_id
GROUP BY b.id;

SELECT * FROM view_books;

DROP TABLE IF EXISTS view_rented_copies;
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
LEFT JOIN books b ON bc.book_id=b.id WHERE (bc.status='RENTED') OR (bc.status='LATE');

SELECT * FROM view_rented_copies;