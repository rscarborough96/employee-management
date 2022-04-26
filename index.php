<?php
session_start();
require_once "router.php";

$router = new Router();
$router->add("/", "GET", function () {
	require_once "views/login.html";
});

$router->add("/employees", "GET", function () {
	require_once "views/employees.html";
});

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
?>
