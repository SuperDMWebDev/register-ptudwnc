drop database registerdb;
CREATE DATABASE registerdb;

USE registerdb;
CREATE TABLE users ( 
	id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY (id)
);

