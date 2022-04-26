function getEmployeeData(el) {
	// Find the card containing the employee and get the data from hidden input fields
	return Array.from(el.closest(".card").querySelectorAll("input"));
}

function findCardInputValue(employeeData, key) {
	return employeeData.filter(function(x) { return x.name == key; })[0].value;
}

function getEditData(el) {
	var employeeData = getEmployeeData(el);

	var name = findCardInputValue(employeeData, "name");
	var title = findCardInputValue(employeeData, "title");
	var hired = findCardInputValue(employeeData, "hired");
	var id = findCardInputValue(employeeData, "employeeID");

	document.getElementById("editName").value = name;
	document.getElementById("editTitle").value = title;
	document.getElementById("editHired").value = hired;
	document.getElementById("editID").value = id;
}

function deleteEmployee(el){
	if(!confirm("Delete this employee?")){
		return;
	}

	var employeeData = getEmployeeData(el);
	var id = findCardInputValue(employeeData, "employeeID");

	// Send to PHP and wait for response
	//
	// report success/failure
}
