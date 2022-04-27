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

function submitDelete(el){
	if(!confirm("Delete this employee?")){
		return;
	}

	el.closest(".card").id = "toBeDeleted";
	var employeeData = getEmployeeData(el);
	var id = findCardInputValue(employeeData, "employeeID");
	var data = {};
	data["id"] = id;

	makeRequest("/employees", "DELETE", checkDeleteOk, data);
}

function checkDeleteOk(response) {
	if (response == "true") {
		removeAlert();
		myAlert = createAlert("Employee Deleted","success");
		document.getElementById("alertBox").appendChild(myAlert);
		document.getElementById("toBeDeleted").remove();
		// Move cards over
	} else {
		alert(response);
	}
}

function submitAddOrEdit(e, method){
	e.preventDefault();

	var prefix = "";
	if (method == "POST") {
		prefix = "add";
	} else {
		prefix = "edit";
	}

	var data = {};
	var nameInput = document.getElementById(prefix + "Name");
	var titleInput = document.getElementById(prefix + "Title");
	var hiredInput = document.getElementById(prefix + "Hired");
	data[nameInput.name] = nameInput.value;
	data[titleInput.name] = titleInput.value;
	data[hiredInput.name] = hiredInput.value;

	makeRequest("/employees", method.toUpperCase(), checkAddOrEditOk, data);
}

function checkAddOrEditOk(response, method) {
	if (response == "true") {
		var message = "";
		if (method == "POST") {
			message = "Added";
			// Add card
		} else {
			message = "Updated";
			// Update card
		}

		removeAlert();
		myAlert = createAlert("Employee " + message,"success");
		document.getElementById("alertBox").appendChild(myAlert);
	} else {
		alert(response);
	}
	Array.from(document.getElementsByClassName("close-modal")).forEach(element => element.click());
}
