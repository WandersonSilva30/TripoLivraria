CREATE DATABASE IF NOT EXISTS login;
USE login;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

create table Livros (
 id int auto_increment primary key,
    Titulo Varchar(99),
    Autor varchar(87),
    Genero Varchar(20),
    AnoPublicacao date,
    Descricao Varchar(250)
);

DROP TABLE IF EXISTS avaliacoes;

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    livro_id INT NOT NULL,
    user_id INT NOT NULL,
    nota INT NOT NULL,
    comentario TEXT,
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE emprestimos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  livro_id INT NOT NULL,
  data_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (livro_id) REFERENCES livros(id)
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO livros (Titulo, Autor, Genero, AnoPublicacao, Descricao) VALUES
('Dom Casmurro', 'Machado de Assis', 'Romance', 1899, 'Clássico sobre ciúmes e traição.'),
('1984', 'George Orwell', 'Distopia', 1949, 'Governo totalitário e vigilância extrema.'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Fábula', 1943, 'Uma história sobre amor e amizade.'),
('A Revolução dos Bichos', 'George Orwell', 'Satírica', 1945, 'Metáfora sobre a revolução russa.'),
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 1954, 'Jornada épica para destruir um anel maligno.'),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Fantasia', 1997, 'Início da aventura mágica de Harry.'),
('O Hobbit', 'J.R.R. Tolkien', 'Fantasia', 1937, 'Viagem inesperada de Bilbo Bolseiro.'),
('O Código Da Vinci', 'Dan Brown', 'Thriller', 2003, 'Mistério religioso e simbologia secreta.'),
('Orgulho e Preconceito', 'Jane Austen', 'Romance', 1813, 'Amor e classes sociais na Inglaterra.'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Realismo Mágico', 1967, 'Saga da família Buendía em Macondo.');


INSERT INTO users (name, login, email, password) 
VALUES ('Admin', 'admin', 'admin@example.com', '123');

INSERT INTO admins (user_id) 
VALUES (1);

SELECT * FROM admins WHERE user_id = 1;