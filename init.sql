-- Cria o banco de dados
CREATE DATABASE meu_teste;

-- Conecta-se ao banco de dados recém-criado
\c meu_teste

-- Cria a tabela
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT
);


-- Insere dados na tabela
INSERT INTO items (name, description) VALUES ('Item 1', 'Description for item 1');
INSERT INTO items (name, description) VALUES ('Item 2', 'Description for item 2');
