create database a3_2025_02;
use a3_2025_02;

create table usuarios(
id int primary key not null auto_increment,
nome varchar(120) not null,
cpf varchar(15) not null,
email varchar(120) not null,
senha varchar(100) not null
)engine = InnoDB;

create table transacoes(
id int primary key not null auto_increment,
cpf varchar(15) not null,
valor decimal(10,2) not null,
tipo varchar(10) not null,
data_transacao date not null,
hora_transacao varchar(15) not null
)engine = InnoDB;