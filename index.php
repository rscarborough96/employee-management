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
	require_once "views/employees.html";
});

$router->add("/employees", "POST", function () {
	echo "true";
	// Check Credentials
	// if add to db works
	//	echo "true";
	// else
	//	echo $error
});

$router->add("/employees", "PUT", function () {
	echo "true";
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
