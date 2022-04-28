<?php
declare(strict_types=1);

class User {
	private $username;	
	private $password;	
	
	public function __construct(String $username, String $password) {
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
	public function setPassword(Integer $password) {
		$this->password = $password;
	}
}

?>
