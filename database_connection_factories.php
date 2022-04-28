<?php
require_once "models/employee.php";
require_once "models/user.php";


// Abstract Factory
interface DatabaseConnectionFactory {
	public function createDatabaseConnection();
}

// Concrete Factory
class LocalDatabaseConnectionFactory implements DatabaseConnectionFactory {
	public function createDatabaseConnection() {
		return new LocalMysqlConnection();
	}
}

// Abstract Product
interface Database {
	public function getAllEmployees();
	public function addEmployee($employee);
	public function updateEmployee($employee);
	public function deleteEmployee($id);
	public function checkUserCredentials($user);
}

// Concrete Product
class LocalMysqlConnection implements Database {
	public function getAllEmployees() {
		$data[] = new Employee(1, "z", "temp", new DateTime("2022-04-27"));
		$data[] = new Employee(2, "x", "temp", new DateTime("2022-04-27"));
		$data[] = new Employee(3, "y", "temp", new DateTime("2022-04-27"));

		return $data;
	}
	public function addEmployee($employee) {
		return 1;
	}
	public function updateEmployee($employee) {
		return true;
	}
	public function deleteEmployee($id) {
		return true;
	}
	public function checkUserCredentials($user) {
		return true;
	}
}



class CloudDatabaseConnectionFactory implements DatabaseConnectionFactory {
	public function createDatabaseConnection() {
		return new CloudMysqlConnection;
	}
}

// A remote database connection, or some other cloud data retrieval mechanism,
// can be implemented via a "concrete product" class.
// The class below is an (unfinished) example of one such class:
class CloudMysqlConnection implements Database {
	public function getAllEmployees() {

	}
	public function addEmployee($employee) {

	}
	public function updateEmployee($employee) {

	}
	public function deleteEmployee($id) {

	}
	public function checkUserCredentials($user) {

	}
}


?>
