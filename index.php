<?php
session_start();
require_once "router.php";

$router = new Router();

$router->add("/", "GET", function () {
	require_once "views/login.html";
});

$router->add("/", "POST", function () {
	echo "false";
        // Check login
        // if pass
        //      $_SESSION["id"] = $user->username;
        //      echo "true";
        // else
        //      echo "false";
});

$router->add("/employees", "GET", function () {
	// Check Credentials
	require_once "views/employees.html";
});

$router->add("/employees/data", "GET", function () {
	// Check Credentials
	// $data = $db->getAllEmployees();
	$data[] = array("id" => 1, "name" => "1", "title" => "temp", "hired" => "2022-04-27");
	$data[] = array("id" => 2, "name" => "2", "title" => "temp", "hired" => "2022-04-27");
	$data[] = array("id" => 3, "name" => "3", "title" => "temp", "hired" => "2022-04-27");

	echo json_encode($data);
});

$router->add("/employees", "POST", function () {
	$data = array(
		"success" => "true",
		"id" => "1"
	);
	echo json_encode($data);
	// Check Credentials
	// if add to db works
	//	echo "true";
	// else
	//	echo $error
});

$router->add("/employees", "PUT", function () {
	$data = array(
		"success" => "true"
	);
	echo json_encode($data);
	// Check Credentials
	// if update to db works
	//	echo "true";
	// else
	//	echo $error
});

$router->add("/employees", "DELETE", function () {
	echo "true";
	// Check Credentials
	// if delete from db works
	//	echo "true";
	// else
	//	echo $error
});

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
?>
