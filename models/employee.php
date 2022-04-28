<?php
class Employee {
	private $id;	
	private $name;	
	private $title;	
	private $hiredDate;	
	
	public function __construct($id, $name, $title, $hiredDate) {
		$this->id = $id;
		$this->name = $name;
		$this->title = $title;
		$this->hiredDate = $hiredDate->format("Y-m-d");
	}

	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
	}

	public function getName() {
		return $this->name;
	}
	public function setName($name) {
		$this->name = $name;
	}

	public function getTitle() {
		return $this->title;
	}
	public function setTitle($title) {
		$this->title = $title;
	}

	public function getHiredDate() {
		return $this->hiredDate;
	}
	public function setHiredDate($id) {
		$this->hiredDate = $hiredDate->format("Y-m-d");
	}

}

?>
