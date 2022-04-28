<?php
class Router {
	public $routes = array();

	function add($path, $method, $callback) {
		$this->routes[] = array(
			"path" => $path,
			"method" => strtoupper($method),
			"callback" => $callback
		);
	}

	function run($raw_path, $method, $db) {
		$path = parse_url($raw_path)["path"];
		$method = strtoupper($method);

		foreach ($this->routes as $index => $value) {
			if ($value["path"] == $path && $value["method"] == $method) {
				call_user_func_array($value["callback"], array($db));
				return;
			}
		}

		http_response_code(404);
		echo "<h1>404 PAGE NOT FOUND</h1>";
	}
}
?>
