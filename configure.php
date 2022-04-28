<?php
require_once "database_connection_factories.php";

// In a real world deployment, this environment variable would be set before this script ever runs.
// In this case, I'll set it here for illustrative purposes.
$_ENV["connection"] = "localhost";



$DATABASE_FACTORY = null; // Will hold DatabaseConnectionFactory Object
switch ($_ENV["connection"]) {
	case "localhost":
		$DATABASE_FACTORY = new LocalDatabaseConnectionFactory();
		break;
	case "cloud":
		$DATABASE_FACTORY = new CloudDatabaseConnectionFactory();
		break;
}

?>
