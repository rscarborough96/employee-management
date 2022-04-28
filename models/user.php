<?php
class User {
	private $username;	
	private $password;	
	
	public function __construct($username, $password) {
		$this->username = $username;
		$this->password = $password;
	}

	public function getUsername() {
		return $this->username;
	}
	public function setUsername(String $username) {
		$this->username = $username;
	}

	public function getPassword() {
		return $this->password;
	}
	public function setPassword(String $password) {
		$this->password = $password;
	}
}

?>
