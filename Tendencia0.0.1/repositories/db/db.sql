\l 

CREATE DATABASE moda;

DROP DATABASE moda; 

\c moda

\dt 

CREATE TABLE IF NOT EXISTS tendencia( 
   id SERIAL PRIMARY KEY UNIQUE,
   preco FLOAT(10), 
   peca VARCHAR(250), 
   categoria VARCHAR(250), 
   descricao VARCHAR(250),
   tamanho VARCHAR(250),	
   cor VARCHAR(250), 
   image_url VARCHAR(250)
); 

/*comprador, assinante de newsletter,
não precisa de credenciais, acesso limitado*/
CREATE TABLE IF NOT EXISTS cliente( 
   id SERIAL PRIMARY KEY,
   nome VARCHAR(250) NOT NULL,
   sobrenome VARCHAR(250) NOT NULL,
   contato VARCHAR(250) NOT NULL,  /*telefone ou email */
   cpf VARCHAR(250) NOT NULL
); 

CREATE TABLE IF NOT EXISTS endereco( 
   id SERIAL PRIMARY KEY UNIQUE ,
   cep VARCHAR(250) NOT NULL ,
   estado VARCHAR(250) NOT NULL ,
   cidade VARCHAR(250) NOT NULL,
   rua VARCHAR(250) NOT NULL
); 

CREATE TABLE IF NOT EXISTS telefone( 
   id SERIAL PRIMARY KEY UNIQUE,
   fixo VARCHAR(250),
   celular VARCHAR(250) NOT NULL
); 

CREATE TABLE IF NOT EXISTS pedido( 
   id SERIAL PRIMARY KEY UNIQUE,
   tendencia_id INT,
   FOREIGN KEY(tendencia_id) REFERENCES tendencia(id)
); 

CREATE TABLE IF NOT EXISTS status_do_pagamento(
   id SERIAL UNIQUE PRIMARY KEY,
   status VARCHAR(250),
   pedido_id INT,
   FOREIGN KEY(pedido_id) REFERENCES pedido(id)
);

CREATE TABLE IF NOT EXISTS pagamento( 
   id SERIAL PRIMARY KEY UNIQUE,
   bandeira VARCHAR(250) NOT NULL,
   titular_cartao VARCHAR(250)NOT NULL,
   numero_cartao VARCHAR(250)NOT NULL,
   csv VARCHAR(250) NOT NULL,
   validade VARCHAR(250), 
   total_a_pagar FLOAT(10) NOT NULL,
   cliente_id INT,
   FOREIGN KEY(cliente_id) REFERENCES cliente(id),
   endereco_id INT,
   FOREIGN KEY(endereco_id) REFERENCES endereco(id),
   telefone_id INT,
   FOREIGN KEY(telefone_id) REFERENCES telefone(id),
   pedido_id INT,
   FOREIGN KEY(pedido_id) REFERENCES pedido(id)
); 

/*Indivíduo logado no sistema, pode ser cliente ou não, precisa de credenciais para acesso ao sistema, acesso ilimitado se o usuario for nivel admin e limitado se nivel user.

  Faça uma tela de cadastro pedindo o telefone e endereço(pois devem ser criados primeiro para referênciar as respectivas chaves estrangeiras), depois peça os dados para criação da conta
  */
CREATE TABLE IF NOT EXISTS usuario( 
   id SERIAL PRIMARY KEY UNIQUE ,
   nickname VARCHAR(250) NOT NULL ,
   email VARCHAR(250) NOT NULL UNIQUE,
   password VARCHAR(250) NOT NULL,
   nivel VARCHAR(10) NOT NULL, /*admin, user*/
   endereco_id INT, 
   FOREIGN KEY(endereco_id) REFERENCES endereco(id),
   telefone_id INT,
   FOREIGN KEY(telefone_id) REFERENCES telefone(id)
); 

INSERT INTO tendencia VALUES(1, 1027.89, 'vestido', 'moda femnina', 'vestido de linho', 'M', 'lilás', 'https://firebasestorage.googleapis.com/v0/b/loja-de-moda-4fa2b.appspot.com/o/moda%2Fvestido_lilas.jpg?alt=media&token=062d8ecd-1590-42e8-b4e6-e4e03ad59b3d',7);

INSERT INTO tendencia VALUES(2, 2031.24, 'vestido', 'moda femnina', 'vestido de seda', 'P', 'branco', 'https://firebasestorage.googleapis.com/v0/b/loja-de-moda-4fa2b.appspot.com/o/moda%2Fvestido_seda_branco.jpg?alt=media&token=e654d86d-6f03-4b67-9866-a4e3716dbdbd', 4);

INSERT INTO tendencia VALUES(3, 1076.69, 'vestido', 'moda femnina', 'vestido casual', 'GG', 'azul', 'https://firebasestorage.googleapis.com/v0/b/loja-de-moda-4fa2b.appspot.com/o/moda%2Fvestido%20azul%20GG.jpg?alt=media&token=5f567cb9-b548-48c4-a8a5-9c2b53accb63', 2);

INSERT INTO cliente VALUES(1,'Guilherme', 'Brigs de Melo', 'mendes@gmail.com', '802.860.800-01');

UPDATE cliente SET contato='melo@gmail.com' WHERE id=1;

INSERT INTO endereco VALUES(1,'41500650','Bahia', 'Salvador', 'Aliomar baleeiro');

INSERT INTO telefone VALUES(1, '', '71996187789');

INSERT INTO pedido VALUES(1,2,1);
INSERT INTO pedido VALUES(2,3,2);
INSERT INTO pedido VALUES(3,1,1);

INSERT INTO status_do_pagamento VALUES(1,'pendente',1);
INSERT INTO status_do_pagamento VALUES(2, 'pendente',2);
INSERT INTO status_do_pagamento VALUES(3,'pendente',3);

/*
usei como base a logica de pagamento da Udemy (por item no carrinho e não o montante de itens)
*/
INSERT INTO pagamento VALUES(1, 'visa', 'Tio patinhas', '4997-7939-4655-9736', '106', '06/2026', 2031.24, 1,1,1,1);

UPDATE status_do_pagamento SET status='pago' WHERE id=1;

UPDATE tendencia SET estoque=6 WHERE id=1;

INSERT INTO usuario VALUES(1,'brigsLocucao90', 'gotaMagica@gmail.com', '12345678', 'user', 1, 1);

ALTER TABLE tendencia DROP COLUMN /*código*/;
ALTER TABLE cliente DROP COLUMN /*código*/;
ALTER TABLE endereco DROP COLUMN /*código*/;
ALTER TABLE telefone DROP COLUMN /*código*/;
ALTER TABLE pedido DROP COLUMN /*código*/;
ALTER TABLE status_do_pagamento DROP COLUMN /*código*/;
ALTER TABLE pagamento DROP COLUMN /*código*/;
ALTER TABLE usuario DROP COLUMN /*código*/;

ALTER TABLE tendencia ADD COLUMN /*código*/;
ALTER TABLE cliente ADD COLUMN /*código*/;
ALTER TABLE endereco ADD COLUMN /*código*/;
ALTER TABLE telefone ADD COLUMN /*código*/;
ALTER TABLE pedido ADD COLUMN /*código*/;
ALTER TABLE status_do_pagamento ADD COLUMN /*código*/;
ALTER TABLE pagamento ADD COLUMN /*código*/;
ALTER TABLE usuario ADD COLUMN /*código*/;

ALTER TABLE pedido ADD COLUMN quantidade INT NOT NULL;

ALTER TABLE tendencia ADD COLUMN estoque INT NOT NULL;

/*
se for excluir todos para refazer,
essa deve ser a ordem de precedência
*/
DROP TABLE usuario;
DROP TABLE pagamento;
DROP TABLE status_do_pagamento;
DROP TABLE pedido;
DROP TABLE telefone; 
DROP TABLE endereco; 
DROP TABLE cliente; 
DROP TABLE tendencia;

SELECT * FROM tendencia; 
SELECT * FROM cliente; 
SELECT * FROM endereco; 
SELECT * FROM telefone; 
SELECT * FROM pedido; 
SELECT * FROM status_do_pagamento; 
SELECT * FROM pagamento; 
SELECT * FROM usuario; 

DELETE FROM usuario;
DELETE FROM pagamento;
DELETE FROM status_do_pagamento;
DELETE FROM pedido;
DELETE FROM endereco;
DELETE FROM telefone;
DELETE FROM cliente;
DELETE FROM tendencia; 

/*
 pega dados associados entre: cliente, telefone,  endereço, pega o recurso de pagamento e os produtos no "carrinho", a partir de um id de usuario específico  
*/
SELECT c.id, c.nome, c.sobrenome, 
       c.contato, c.cpf,
       f.id, f.fixo, f.celular,
       e.id, e.cep, e.estado, 
       e.cidade, e.rua, 
       p.id, p.bandeira,
       p.titular_cartao, p.numero_cartao,
       p.csv, p.validade, 
       pd.id, pd.tendencia_id, pd.quantidade
FROM pagamento p
INNER JOIN cliente c ON p.cliente_id=c.id
INNER JOIN pedido pd ON p.pedido_id=pd.id 
INNER JOIN telefone f ON p.telefone_id=f.id INNER JOIN endereco e ON p.endereco_id=e.id
WHERE c.id=1;

/* obtém informações de um ou mais pedidos a partir de um id de usuario específico
*/
SELECT id, cliente_id, tendencia_id FROM pedido WHERE cliente_id=1;

/* obtém o valor total de um pagamento  a partir de um id de usuario específico
*/
SELECT total_a_pagar FROM pagamento WHERE cliente_id=1;

/*
 Pega os dados de: cliente, tendencia(a partir de um pedido) e pagamento.
*/
SELECT c.id, c.nome, c.sobrenome, 
       c.contato, c.cpf,
       t.id, t.preco,
       t.estoque, t.peca, 
       t.categoria, t.descricao, 
       t.tamanho, t.cor, t.image_url,
       pd.quantidade,
       p.id, p.total_a_pagar
FROM pedido pd
INNER JOIN tendencia t ON pd.tendencia_id=t.id
INNER JOIN pagamento p ON pd.id=p.pedido_id
INNER JOIN cliente c ON p.cliente_id=c.id
WHERE c.id=1;

SELECT pd.id, t.preco, pd.quantidade
FROM pedido pd
INNER JOIN tendencia t
ON pd.tendencia_id=t.id
WHERE pd.id=1

\q
