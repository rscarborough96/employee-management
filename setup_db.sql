CREATE DATABASE employee_management;

CREATE TABLE employee_management.users (
	username VARCHAR(10) NOT NULL,
	password VARCHAR(50) NOT NULL,

	PRIMARY KEY(username)
);
INSERT INTO employee_management.users VALUES("Alice","alice_pass");
INSERT INTO employee_management.users VALUES("Bob","bob_pass");

CREATE TABLE employee_management.employees (
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
	job_title VARCHAR(50) NOT NULL,	
	date_of_hire DATE NOT NULL,

	PRIMARY KEY(id)
);

CREATE USER 'my_user'@'%' IDENTIFIED BY 'P4ssword!';
GRANT ALL PRIVILEGES ON employee_management.* TO 'my_user'@'%';
FLUSH PRIVILEGES;
