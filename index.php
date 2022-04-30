<?php
session_start();
require_once "configure.php";
require_once "models/employee.php";
require_once "models/user.php";
require_once "router.php";

$router = new Router();
$DATABASE = $DATABASE_FACTORY->createDatabaseConnection();

$router->add("/", "GET", function ($db) {
	require_once "views/login.html";
});

$router->add("/", "POST", function ($db) {
	$_POST = json_decode(file_get_contents("php://input"), true);

	$username = $_POST["username"];
	$password = $_POST["password"];
	$user = new User($username, $password);

	$user = $db->checkUserCredentials($user);
	if ($user) {
		if ($user->getUsername()) {
			$_SESSION["username"] = $user->getUsername();
			echo "true";
		} else {
			echo "not_a_user";
		}
	}
});

$router->add("/employees", "GET", function ($db) {
	if (!$_SESSION["username"]) {
		header("Location: /");
	}

	require_once "views/employees.html";
});

$router->add("/employees/data", "GET", function ($db) {
	if (!$_SESSION["username"]) {
		header("Location: /");
	}

	$employees = $db->getAllEmployees();
	if ($employees === null) {
		return;
	}
	
	$array = array();
	foreach ($employees as $employee) {
		$array[] = array("id" => $employee->getId(), "name" => $employee->getName(), "title" => $employee->getTitle(), "hired" => $employee->getHiredDate());
	}
	if (count($array) == 0) {
		echo "empty";
		return;
	}

	echo json_encode($array);
});

$router->add("/employees/add", "POST", function ($db) {
	if (!$_SESSION["username"]) {
		header("Location: /");
	}

	$_POST = json_decode(file_get_contents("php://input"), true);

	$name = $_POST["name"];
	$title = $_POST["title"];
	$hiredDate = $_POST["hired"];
	$employee = new Employee(null, $name, $title, new DateTime($hiredDate));

	$id = $db->addEmployee($employee);
	if (!$id) {
		return;
	}

	$data = array("id" => $id);
	echo json_encode($data);
});

$router->add("/employees/update", "POST", function ($db) {
	if (!$_SESSION["username"]) {
		header("Location: /");
	}

	$_POST = json_decode(file_get_contents("php://input"), true);

	$id = $_POST["id"];
	$name = $_POST["name"];
	$title = $_POST["title"];
	$hiredDate = $_POST["hired"];
	$employee = new Employee($id, $name, $title, new DateTime($hiredDate));

	if ($db->updateEmployee($employee)) {
		echo "true";
	}
});

$router->add("/employees/delete", "POST", function ($db) {
	if (!$_SESSION["username"]) {
		header("Location: /");
	}

	$_POST = json_decode(file_get_contents("php://input"), true);

	$id = $_POST["id"];
	if ($db->deleteEmployee($id)) {
		echo "true";
	}
});

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD'], $DATABASE);
?>
