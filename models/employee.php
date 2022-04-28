<?php
declare(strict_types=1);

class Employee {
	private $id;	
	private $name;	
	private $title;	
	private $hiredDate;	
	
	public function __construct(Integer $id, String $name, String $title, DateTime $hiredDate) {
		$this->id = $id;
		$this->name = $name;
		$this->title = $title;
		$this->hiredDate = $hiredDate->format("Y-m-d");
	}

	public function getId() {
		return $this->id;
	}
	public function setId(Integer $id) {
		$this->id = $id;
	}

	public function getName() {
		return $this->name;
	}
	public function setName(String $name) {
		$this->name = $name;
	}

	public function getTitle() {
		return $this->title;
	}
	public function setTitle(Integer $title) {
		$this->title = $title;
	}

	public function getHiredDate() {
		return $this->hiredDate;
	}
	public function setHiredDate(DateTime $id) {
		$this->hiredDate = $hiredDate->format("Y-m-d");
	}

}

?>
