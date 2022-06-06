CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- usuário admin
INSERT INTO users(id, name, email, cpf, registration_number, admin, password, active)
	VALUES ('5865e978-a4a7-11ec-999b-0242ac110002', 'Karen', 'karen@ic.ufal.br', '77744411100', '12345678', true, '$2b$12$3YJTqRMOuPUcKedSSreAcuLaCpglxDWWtpJ.EjQf74YsqY6V8oOVW', true);

-- usuário não admin
INSERT INTO users(id, name, email, cpf, registration_number, admin, password, active)
	VALUES ('b1ec8dfe-ab13-11ec-92c1-0242ac110002', 'Bruno', 'bruno@ic.ufal.br', '99988877766', '12345679', false, '$2b$12$u0UDXznyVdyYndkLCnA7puoyhtb48kVD1c96aEsGxnxLQ1PEc4.5m', true);

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
	VALUES ('963a15be-ab17-11ec-9e0f-0242ac110002', '0001-002', '72c92416-a988-11ec-bb0f-0242ac110002', 'RENTED', '5865e978-a4a7-11ec-999b-0242ac110002', 'b1ec8dfe-ab13-11ec-92c1-0242ac110002', '2022-06-02 03:38:25.591', '2022-06-03 03:38:25.591', now());


SELECT * FROM book_copies;

SELECT * FROM books;

SELECT * FROM users;