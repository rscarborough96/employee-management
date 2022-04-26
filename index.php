<?php
session_start();
require_once "router.php";

$router = new Router();
$router->add("/", "GET", function () {
	echo "<h1>Hello!</h1>";
});

$router->add("/world", "GET", function () {
	echo "<h1>Hello, world!</h1>";
});

$router->run($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
?>
