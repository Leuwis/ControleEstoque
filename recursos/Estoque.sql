CREATE TABLE `pessoa` (
  `n_pessoa_pessoa` INT PRIMARY KEY AUTO_INCREMENT,
  `s_nome_pessoa` VARCHAR(255),
  `n_tipopessoa_tipopessoa` INT,
  `n_fornecedor_fornecedor` INT,
  `c_status_pessoa` CHAR,
  `s_foto_pessoa` TEXT
);

CREATE TABLE `telefone` (
  `n_telefone_telefone` INT PRIMARY KEY AUTO_INCREMENT,
  `n_pessoa_pessoa` INT,
  `s_ddd_telefone` VARCHAR(255),
  `s_numero_telefone` VARCHAR(255)
);

CREATE TABLE `tipopessoa` (
  `n_tipopessoa_tipopessoa` INT PRIMARY KEY AUTO_INCREMENT,
  `s_descricao_tipopessoa` VARCHAR(255),
  `n_nivel_tipopessoa` INT
);

CREATE TABLE `fornecedor` (
  `n_fornecedor_fornecedor` INT PRIMARY KEY AUTO_INCREMENT,
  `s_desc_fornecedor` VARCHAR(255),
  `c_status_fornecedor` CHAR
);

ALTER TABLE `pessoa` ADD FOREIGN KEY (`n_tipopessoa_tipopessoa`) REFERENCES `tipopessoa` (`n_tipopessoa_tipopessoa`);

ALTER TABLE `pessoa` ADD FOREIGN KEY (`n_fornecedor_fornecedor`) REFERENCES `fornecedor` (`n_fornecedor_fornecedor`);

ALTER TABLE `telefone` ADD FOREIGN KEY (`n_pessoa_pessoa`) REFERENCES `pessoa` (`n_pessoa_pessoa`);
