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
	private $connection;

	public function __construct() {
		// Obviously these values would normally be hidden, but it would need to be done outside of the repository
		$this->connection = new MySQLi("localhost","my_user","P4ssword!","employee_management");
		if ($this->connection->connect_error) {
			exit("Error: ".$this->connection->connect_error);
		}
	}

	// This function will be called when the main script ends
	public function __destruct() {
		$this->connection->close();
	}

	public function getAllEmployees() {
		$query = $this->connection->prepare("SELECT * FROM employees");
		$query->execute();
		if (!$query->execute()) {
			return null;
		}
		$result = $query->get_result();

		$data = array();
		while($row = $result->fetch_assoc()){
			$data[] = new Employee($row["id"], $row["name"], $row["job_title"], new DateTime($row["date_of_hire"]));
		}

		return $data;
	}

	public function addEmployee($employee) {
		$query = $this->connection->prepare("INSERT INTO employees VALUES(null, ?, ?, ?)");

		$name = $employee->getName();
		$title = $employee->getTitle();
		$hiredDate = $employee->getHiredDate();
		$query->bind_param("sss", $name, $title, $hiredDate);
		if (!$query->execute()) {
			return false;
		}

		$query = $this->connection->prepare("SELECT LAST_INSERT_ID();");
		if (!$query->execute()) {
			return false;
		}

		$result = $query->get_result();
		return $result->fetch_row()[0];
	}

	public function updateEmployee($employee) {
		$query = $this->connection->prepare("UPDATE employees SET name = ?, job_title = ?, date_of_hire = ? WHERE id = ?");

		$id = $employee->getId();
		$name = $employee->getName();
		$title = $employee->getTitle();
		$hiredDate = $employee->getHiredDate();
		$query->bind_param("sssi", $name, $title, $hiredDate, $id);
		
		return $query->execute();
	}

	public function deleteEmployee($id) {
		$query = $this->connection->prepare("DELETE FROM employees WHERE id = ?");
		$query->bind_param("i", $id);
		
		return $query->execute();
	}

	public function checkUserCredentials($user) {
		// In a real environment, there are MUCH more secure and sophisticated ways to do this
		$query = $this->connection->prepare("SELECT * FROM users WHERE username = ? AND password = ?");

		$username = $user->getUsername();
		$password = $user->getPassword();
		$query->bind_param("ss", $username, $password);
		
		if (!$query->execute()) {
			return false;
		}

		$result = $query->get_result();
		$row = $result->fetch_assoc();
		return new User($row["username"], $row["password"]);
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
