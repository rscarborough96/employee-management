<?php
require_once "router.php";
class Test_Router {
	private $router;

	function __construct() {
		$this->router = new Router();
	}

	function instantiate() {
		if ($this->router == null) {
			exit("Could not create router object\n");
		}
	}

	function add_route() {
		$this->router = new Router();

		$this->router->add("/","GET", function(){});
		if (count($this->router->routes) != 1) {
			exit("Route not add correctly\n");
		}
	}

	function run_correct_callback() {
		$this->router = new Router();

		$_ENV["num"] = 0;

		$this->router->add("/one","GET", function(){  
			$_ENV["num"] = 1;
		});
		$this->router->add("/two","GET", function(){  
			$_ENV["num"] = 2;
		});
		$this->router->add("/one","POST", function(){  
			$_ENV["num"] = 1;
		});
		$this->router->add("/two","post", function(){  
			$_ENV["num"] = 2;
		});
		$this->router->add("/th/ree","GET", function(){  
			$_ENV["num"] = 3;
		});

		$this->router->run("/one","GET", null);
		if ($_ENV["num"] != 1) {
			exit("The correct callback did not run - /one, GET\n");
		}
		$this->router->run("/two","GET", null);
		if ($_ENV["num"] != 2) {
			exit("The correct callback did not run - /two, GET\n");
		}
		$this->router->run("/one","POST", null);
		if ($_ENV["num"] != 1) {
			exit("The correct callback did not run - /one, POST\n");
		}
		$this->router->run("/two","POST", null);
		if ($_ENV["num"] != 2) {
			exit("The correct callback did not run - /two, POST\n");
		}
		$this->router->run("/th/ree","GET", null);
		if ($_ENV["num"] != 3) {
			exit("The correct callback did not run - /th/ree, GET\n");
		}
	}
}

$tester = new Test_Router();
$tester->instantiate();
$tester->add_route();
$tester->run_correct_callback();
?>
