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
    count(case when c.status='RENTED' then 1 else null end) as borrowed_copies,
    count(case when c.status='MISPLACED' then 1 else null end) as lost_copies,
    count(case when c.status='AVAILABLE' then 1 else null end) as available_copies
FROM books b LEFT JOIN book_copies c ON b.id=c.book_id
GROUP BY b.id;

SELECT * FROM view_books;