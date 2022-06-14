CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- usuário admin
INSERT INTO users(id, name, email, cpf, registration_number, admin, password, active)
	VALUES ('5865e978-a4a7-11ec-999b-0242ac110002', 'Karen', 'karen@ic.ufal.br', '77744411100', '12345678', true, '$2b$12$3YJTqRMOuPUcKedSSreAcuLaCpglxDWWtpJ.EjQf74YsqY6V8oOVW', true);

-- usuário não admin
INSERT INTO users(id, name, email, cpf, registration_number, admin, password, active)
	VALUES
		('b1ec8dfe-ab13-11ec-92c1-0242ac110002', 'Bruno', 'bruno@ic.ufal.br', '99988877766', '12345679', false, '$2b$12$u0UDXznyVdyYndkLCnA7puoyhtb48kVD1c96aEsGxnxLQ1PEc4.5m', true),
		('3a87d548-0048-4d25-8407-cd45d88ba12b', 'Mateus', 'mateus@ic.ufal.br', '1234567809', '13246589', false, '$2b$12$u0UDXznyVdyYndkLCnA7puoyhtb48kVD1c96aEsGxnxLQ1PEc4.5m', true),
		('86f8fe42-e5de-4dba-89a2-cd5b32fa5704', 'Carlos', 'carlos@ic.ufal.br', '1113569801', '11145511', false, '$2b$12$u0UDXznyVdyYndkLCnA7puoyhtb48kVD1c96aEsGxnxLQ1PEc4.5m', true);

-- livro disponível
INSERT INTO books (id, title, authors, publishing_house, created_by, code, status, created_at, published_in, categories)
	VALUES('72c92416-a988-11ec-bb0f-0242ac110002', 'Calculo 1', '{"James Stewart"}', 'CENGAGE Learning', '5865e978-a4a7-11ec-999b-0242ac110002', '0001-000', 'AVAILABLE', now(), '01-01-2016', '{"Matemática"}');

-- livro perdido
INSERT INTO books (id, title, authors, publishing_house, created_by, code, status, created_at, published_in, categories)
	VALUES('0b0e8e56-ab13-11ec-8c76-0242ac110002', 'Calculo 2', '{"George B. Thomas"}', 'CENGAGE Learning', '5865e978-a4a7-11ec-999b-0242ac110002', '0002-000', 'LOST',now(), '01-01-2018', '{"Matemática", "Ciências"}');

-- cópia disponivel para empréstimo
INSERT INTO book_copies(id, code, book_id, status, created_by, located_by, lease_date, devolution_date, created_at)
	VALUES ('4e661c60-ab17-11ec-b729-0242ac110002', '0001-001', '72c92416-a988-11ec-bb0f-0242ac110002', 'RENTED', '5865e978-a4a7-11ec-999b-0242ac110002', 'b1ec8dfe-ab13-11ec-92c1-0242ac110002', '2022-06-02 03:38:25.591', '2022-06-03 03:38:25.591', now());

-- cópia indisponível por já estar emprestada
INSERT INTO book_copies(id, code, book_id, status, created_by, located_by, lease_date, devolution_date, created_at)
	VALUES
		('963a15be-ab17-11ec-9e0f-0242ac110002', '0001-002', '72c92416-a988-11ec-bb0f-0242ac110002', 'AVAILABLE', '5865e978-a4a7-11ec-999b-0242ac110002', 'b1ec8dfe-ab13-11ec-92c1-0242ac110002', '2022-06-02 03:38:25.591', '2022-06-03 03:38:25.591', now()),
		('d637e774-cff2-46bb-896f-daf443c890ce', '0001-003', '72c92416-a988-11ec-bb0f-0242ac110002', 'RENTED', '5865e978-a4a7-11ec-999b-0242ac110002', '3a87d548-0048-4d25-8407-cd45d88ba12b', '2022-06-02 03:38:25.591', '2022-06-14 03:38:25.591', now()),
		('4e8161ff-12d6-4b60-a3b6-1b217c1af319', '0001-004', '72c92416-a988-11ec-bb0f-0242ac110002', 'LATE', '5865e978-a4a7-11ec-999b-0242ac110002', '3a87d548-0048-4d25-8407-cd45d88ba12b', '2022-06-02 03:38:25.591', '2022-06-03 03:38:25.591', now()),
		('855811cd-0024-47a2-9446-5e435a850c7c', '0001-005', '0b0e8e56-ab13-11ec-8c76-0242ac110002', 'MISPLACED', '5865e978-a4a7-11ec-999b-0242ac110002', '3a87d548-0048-4d25-8407-cd45d88ba12b', '2022-02-02 03:38:25.591', '2022-02-15 03:38:25.591', now());

SELECT * FROM book_copies;

SELECT * FROM books;

SELECT * FROM users;